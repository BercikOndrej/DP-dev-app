import {BindingScope, injectable, service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import dayjs from 'dayjs';
import locale from 'dayjs/locale/cs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isTodayPlugin from 'dayjs/plugin/isToday';
import weekdayPlugin from 'dayjs/plugin/weekday';
import {z} from 'zod';
import {AttendanceTag, Role} from '../enums';
import {Attendance, User} from '../models';
import {
  AttendanceRepository,
  ChildRepository,
  UserRepository,
} from '../repositories';
import {EmailService} from './email.service';

dayjs.extend(weekdayPlugin);
dayjs.extend(isTodayPlugin);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const DATE_FORMAT = 'YYYY-MM-DD';

@injectable({scope: BindingScope.TRANSIENT})
export class AttendanceService {
  constructor(
    @repository(AttendanceRepository)
    private attendanceRepo: AttendanceRepository,
    @repository(ChildRepository) private childRepo: ChildRepository,
    @repository(UserRepository) private userRepo: UserRepository,
    @service(EmailService) private emailService: EmailService,
  ) {}

  // General methods
  // ----------------------------------------------------------------------
  // Create attendance - return null if attendance already exists
  async createAttendance(
    attendance: Omit<Attendance, 'id'>,
  ): Promise<Attendance> {
    await this.validateAttendance(attendance);

    if (await this.attendanceAlreadyExisted(attendance)) {
      throw HttpErrors.BadRequest('Docházka již existuje.');
    }
    return this.attendanceRepo.create(attendance);
  }

  // Delete attendence
  async deleteAttendance(id: string): Promise<void> {
    await this.attendanceRepo.deleteById(id);
  }

  // Delete all attendance that are older than that 1 year
  async deleteAllAttendanceItemsOlderThanYear(): Promise<void> {
    const attendanceItems = await this.attendanceRepo.find();
    const beforeYear = dayjs()
      .locale({ ...locale })
      .startOf('day')
      .subtract(1, 'year')
    const olderAttendanceItems = attendanceItems
      .filter(item => dayjs(item.date).isBefore(beforeYear))
    await Promise.all(olderAttendanceItems.map(item => this.attendanceRepo.deleteById(item.id)));
  }

  // Get attendance
  async getAttendance(id: string): Promise<Attendance> {
    return this.attendanceRepo.findById(id);
  }

  // Find attendance
  async findAttendance(
    userId: string,
    dateStr: string,
  ): Promise<Attendance | null> {
    this.validateDateString(dateStr);

    return this.attendanceRepo.findOne({
      where: {
        userId: userId,
        date: dateStr,
      },
    });
  }

  // Get many attendance items
  async getAllAttendanceItems(): Promise<Attendance[]> {
    return this.attendanceRepo.find();
  }

  // Get all attendance items that exist on given date
  async getAllAttendanceItemsOnDate(date: string): Promise<Attendance[]> {
    this.validateDateString(date);
    return this.attendanceRepo.find({
      where: {
        date: date,
        tag: AttendanceTag.NORMAL,
      },
    });
  }

  // Validating attendance
  async validateAttendance(attendance: Omit<Attendance, 'id'>) {
    const pickUpErrorMsg = 'Svoz může provádět pouze průvodce/učitel školky.';
    if (attendance.pickUp) {
      if (!attendance.userId) {
        throw HttpErrors.UnprocessableEntity(pickUpErrorMsg);
      }
      if (attendance.userId) {
        const user = await this.userRepo.findById(attendance.userId);
        if (user.role === Role.USER) {
          throw HttpErrors.UnprocessableEntity(pickUpErrorMsg);
        }
      }
    }

    const now = dayjs()
      .locale({
        ...locale,
      })
      .startOf('day');

    const attendanceSchema = z.object({
      date: z
        .string()
        .date(`Neplatné datum. Datum musí být ve formátu '${DATE_FORMAT}'.`)
        .refine(
          date =>
            dayjs(date)
              .locale({
                ...locale,
              })
              .startOf('day')
              .isSameOrAfter(now, 'day'),
          'Neplatné datum.',
        )
        .refine(
          date =>
            dayjs(date)
              .locale({
                ...locale,
              })
              .startOf('day')
              .month() !== 7,
          'Nelze zapsat datum o prázdninách.',
        ),
      tag: z.nativeEnum(AttendanceTag, {
        message: `Vlastnost 'tag' musí být jednou z těchto hodnot: ${Object.values(AttendanceTag)}.`,
      }),
      childId: z.string().optional(),
      userId: z.string().optional(),
      pickUp: z.boolean().optional(),
    });

    const {error} = attendanceSchema.safeParse(attendance);

    if (error) {
      throw HttpErrors.UnprocessableEntity(error.errors[0].message);
    }
  }

  // Check if attendance already exists
  async attendanceAlreadyExisted(
    attendance: Omit<Attendance, 'id'>,
  ): Promise<boolean> {
    const attendanceItems = await this.attendanceRepo.find({
      where: {
        childId: attendance.childId,
        userId: attendance.userId,
        tag: AttendanceTag.NORMAL,
      },
    });

    const searchResult = attendanceItems.find(att => {
      const attDate = dayjs(att.date).startOf('day');

      const attendanceDate = dayjs(attendance.date).startOf('day');

      return attDate.isSame(attendanceDate, 'day');
    });

    return searchResult !== undefined;
  }

  // Validate date string
  validateDateString(date: string) {
    const schema = z
      .string()
      .date(`Neplatné datum. Datum musí být ve formátu '${DATE_FORMAT}'.`);

    const {error} = schema.safeParse(date);
    if (error) {
      throw HttpErrors.BadRequest(error.errors[0].message);
    }
  }

  // Methods for child attendance
  // ----------------------------------------------------------------------
  // Create many attendance items for a child from given date to given date. Dates are dependet on child school days
  async createManyChildAttendanceItemsBySchoolDays(
    childId: string,
    from: string,
    to: string,
  ): Promise<Attendance[]> {
    // Check child existation
    const child = await this.childRepo.findById(childId);
    if (!child) {
      throw HttpErrors.BadRequest('Dítě nebylo nalezeno.');
    }
    // Get school days array
    const schoolDays: number[] = child.schoolDays
      .split('')
      .map(char => Number(char));

    // Validate dates
    this.validateDateString(from);
    this.validateDateString(to);
    const fromDate = dayjs(from)
      .locale({...locale})
      .startOf('day');
    const toDate = dayjs(to)
      .locale({...locale})
      .startOf('day');

    if (fromDate.isAfter(toDate, 'day')) {
      throw HttpErrors.BadRequest(
        "Neplatné zadání dat - Datum 'od' musí být dřívější než datum 'do'.",
      );
    }
    // Dates cannot be on August (říjen)
    if (fromDate.month() <= 8 && toDate.month() >= 8) {
      throw HttpErrors.BadRequest(
        'Nelze vytvořit záznamy docházky přes prázdniny.',
      );
    }

    const attendanceItems: Attendance[] = [];

    // Get all attendance items
    let day = fromDate;
    while (day.isBefore(toDate, 'day') || day.isSame(toDate, 'day')) {
      if (schoolDays.includes(day.weekday())) {
        const att = await this.createAttendance({
          date: day.format(DATE_FORMAT),
          tag: AttendanceTag.NORMAL,
          childId,
        } as Attendance);
        if (att) {
          attendanceItems.push(att);
        }
      }
      day = day.add(1, 'day');
    }

    return attendanceItems;
  }

  // Delete all attendance items of the child
  // This method is used in deleting child
  async deleteAllAttendanceItemsOfChild(childId: string): Promise<void> {
    if (!(await this.childRepo.exists(childId))) {
      throw HttpErrors.NotFound('Dítě nebylo nalezeno.');
    }
    await this.attendanceRepo.deleteAll({childId: childId});
  }

  // Delete all attendance items of the child from today date
  // This method is used in changing school days of the child
  async deleteAllAttendanceItemsOfChildFromToday(
    childId: string,
  ): Promise<void> {
    if (!(await this.childRepo.exists(childId))) {
      throw HttpErrors.NotFound('Dítě nebylo nalezeno.');
    }
    const today = dayjs()
      .locale({
        ...locale,
      })
      .startOf('day');
    const childAttendance =
      await this.getAllNormalAttendanceItemsOfChild(childId);
    for (const att of childAttendance) {
      const attDate = dayjs(att.date)
        .locale({
          ...locale,
        })
        .startOf('day');
      if (attDate.isSameOrAfter(today)) {
        await this.attendanceRepo.deleteById(att.id);
      }
    }
  }

  // Get all normal attendance items of the child in given month (zero indexed)
  // This method is used to show all attendance items in calendar on FE
  async getAllNormalAttendanceItemsOfChildInMonth(
    childId: string,
    month: number,
  ): Promise<Attendance[]> {
    const attendanceItems =
      await this.getAllNormalAttendanceItemsOfChild(childId);
    return attendanceItems.filter(
      att =>
        dayjs(att.date)
          .locale({
            ...locale,
          })
          .month() === month,
    );
  }

  // Get count of all alternative attendance items of the child
  // Thanks to this function we know how much attendance may write down
  async getCountOfAllAlternativeAttendanceOfChild(
    childId: string,
  ): Promise<number> {
    if (!(await this.childRepo.exists(childId))) {
      throw HttpErrors.NotFound('Dítě nebylo nalezeno.');
    }
    // Always during the getting a count of alternative attendance, I must delete the old one
    return (await this.getAllAlternativeAttendanceItemsOfChild(childId)).length;
  }

  // Enroll new normal attendace for a child
  // It can happend only if child have some alternative attendace
  async enrollNewNormalAttendanceOfChild(
    att: Omit<Attendance, 'id'>,
  ): Promise<Attendance> {
    att.tag = AttendanceTag.NORMAL;
    await this.validateAttendance(att);

    if (!att.childId) {
      throw HttpErrors.BadRequest(
        'K vytvoření nového záznamu docházky nebylo specifikováno pro které dítě má být záznam vytvořen.',
      );
    }

    const alternativeAttendanceItems =
      await this.getAllAlternativeAttendanceItemsOfChild(att.childId);

    if (alternativeAttendanceItems.length === 0) {
      throw HttpErrors.BadRequest(
        'Dítě nemá žádné náhrady za docházku. Nový záznam docházky tedy nelze zapsat.',
      );
    }
    const oldestAtt = alternativeAttendanceItems.pop()!;
    await this.attendanceRepo.deleteById(oldestAtt.id);
    return this.attendanceRepo.create(att);
  }

  // Unroll normal attendace of the child
  // When child unroll attendance he get alternative attendance and thanks to that it can later enroll new normal attendance
  async unrollAttendanceOfChild(id: string): Promise<void> {
    const att = await this.attendanceRepo.findById(id);
    if (!att) {
      throw HttpErrors.NotFound('Záznam docházky nebyl nalezen.');
    }
    att.tag = AttendanceTag.ALTERNATIVE;
    att.date = dayjs(att.date)
      .locale({
        ...locale,
      })
      .startOf('day')
      .format(DATE_FORMAT);

    await this.attendanceRepo.updateById(id, att);
  }

  // Helper methods for child attendnace itemns management
  // ------------------------------------------------------------------

  // Get all alternative attendance items ordered from the oldest to the newest
  // Attendance older than 2 months are not included
  async getAllAlternativeAttendanceItemsOfChild(
    childId: string,
  ): Promise<Attendance[]> {
    const attendanceItems = await this.attendanceRepo.find({
      where: {
        childId: childId,
        tag: AttendanceTag.ALTERNATIVE,
      },
      order: ['date DESC'],
    });

    // Deleting attendance older than 2 months and return the right ones
    return this.deleteAttendanceItemsOlderThanTwoMonths(attendanceItems);
  }

  // Get all normalaAttendance items of the child
  async getAllNormalAttendanceItemsOfChild(
    childId: string,
  ): Promise<Attendance[]> {
    return this.attendanceRepo.find({
      where: {
        childId: childId,
        tag: AttendanceTag.NORMAL,
      },
    });
  }

  // Delete attendance older than 2 months and return the rest of attendance items
  async deleteAttendanceItemsOlderThanTwoMonths(
    attendanceItems: Attendance[],
  ): Promise<Attendance[]> {
    const resultAttendanceItems = [];
    const beforeTwoMonths = dayjs()
      .locale({
        ...locale,
      })
      .subtract(2, 'month')
      .startOf('day');
    for (const att of attendanceItems) {
      const attDate = dayjs(att.date)
        .locale({
          ...locale,
        })
        .startOf('day');
      if (attDate.isBefore(beforeTwoMonths)) {
        await this.attendanceRepo.deleteById(att.id);
      } else {
        resultAttendanceItems.push(att);
      }
    }
    return resultAttendanceItems;
  }

  // Methods for user/teacher attendance
  // ----------------------------------------------------------------------

  // Create many user attendance items for teacher based on given dates
  async createAttendanceItemsOfUser(
    userId: string,
    dates: string[],
  ): Promise<Attendance[]> {
    await this.validateTeacher(userId);

    // Validate all dates
    for (const date of dates) {
      this.validateDateString(date);
      if (
        dayjs(date)
          .locale({
            ...locale,
          })
          .startOf('day')
          .month() === 7
      ) {
        throw HttpErrors.BadRequest(
          'Nelze vytvořit záznamy docházky přes prázdniny.',
        );
      }
    }

    const attendanceItems: Attendance[] = [];
    for (const date of dates) {
      const att = await this.createAttendance({
        date: date,
        tag: AttendanceTag.NORMAL,
        userId: userId,
      } as Attendance);
      if (att) {
        attendanceItems.push(att);
      }
    }

    return attendanceItems;
  }

  // Delete all user attendance items
  async deleteAllAttendanceItemsOfUser(userId: string): Promise<void> {
    await this.validateTeacher(userId);
    await this.attendanceRepo.deleteAll({userId: userId});
  }

  // Get all attendance items of all users in given month (zero indexed)
  async getAllAttendanceItemsOfAllTeachersInMonth(
    month: number,
  ): Promise<Attendance[]> {
    const attendanceItems = await this.attendanceRepo.find({
      where: {
        childId: undefined,
      },
    });
    return attendanceItems.filter(
      att =>
        dayjs(att.date)
          .locale({
            ...locale,
          })
          .month() === month,
    );
  }

  // Change attendance between users
  // We must send emails to all users signed that day
  async changeTeacherAttendance(data: {
    originTeacherId: string;
    nextTeacherId: string;
    isPickUp: boolean;
    dateStr: string;
  }): Promise<Attendance> {
    this.validateDateString(data.dateStr);
    const attendaceObj = {
      userId: data.nextTeacherId,
      tag: AttendanceTag.NORMAL,
      date: data.dateStr,
      pickUp: data.isPickUp,
    } as Attendance;

    if (await this.attendanceAlreadyExisted(attendaceObj)) {
      throw HttpErrors.BadRequest('Docházka již existuje.');
    }

    // Send emails
    const users = await this.getSignedUserOnDate(data.dateStr);
    const emails = users.map(user => user.email);
    const originTeacher = await this.userRepo.findById(data.originTeacherId);
    const nextTeacher = await this.userRepo.findById(data.nextTeacherId);
    await this.emailService.sendEmailOfAttendanceChangeToUsers(
      emails,
      originTeacher.fullName,
      nextTeacher.fullName,
      dayjs(data.dateStr).startOf('day'),
    );

    const oldAttendance = await this.findAttendance(
      data.originTeacherId,
      data.dateStr,
    );
    await this.deleteAttendance(oldAttendance?.id ?? '');
    return this.createAttendance(attendaceObj);
  }

  // Get all users that signed on given date
  async getSignedUserOnDate(date: string): Promise<User[]> {
    const attendanceItemsOnDate = await this.getAllAttendanceItemsOnDate(date);
    const childsParentsPromises = attendanceItemsOnDate
      .map(att => att.childId)
      .filter(id => id !== undefined && id !== null)
      .map(async id => {
        return this.childRepo.users(id!).find();
      });

    const result = await Promise.all(childsParentsPromises);
    return result.flat(1);
  }

  // Check if a user is teacher
  async validateTeacher(userId: string) {
    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw HttpErrors.NotFound('Uživatel nebyl nalezen.');
    }
    if (user.role !== Role.TEACHER) {
      throw HttpErrors.BadRequest('Uživatel nemá patřičná oprávnění.');
    }
  }
}
