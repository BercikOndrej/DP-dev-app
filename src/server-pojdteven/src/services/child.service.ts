import {/* inject, */ BindingScope, injectable, service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import dayjs from 'dayjs';
import locale from 'dayjs/locale/cs';
import isTodayPlugin from 'dayjs/plugin/isToday';
import objectPlugin from 'dayjs/plugin/toObject';
import weekdayPlugin from 'dayjs/plugin/weekday';
import {z} from 'zod';
import {Child, User} from '../models';
import {ChildRepository} from '../repositories';
import {AttendanceService} from './attendance.service';
import {ParenthoodService} from './parenthood.service';

dayjs.extend(weekdayPlugin);
dayjs.extend(objectPlugin);
dayjs.extend(isTodayPlugin);

@injectable({scope: BindingScope.TRANSIENT})
export class ChildService {
  constructor(
    @repository(ChildRepository) private childRepo: ChildRepository,
    @service(AttendanceService)
    private attendanceService: AttendanceService,
    @service(ParenthoodService) private parenthoodService: ParenthoodService,
  ) {}

  // Create child
  async createChild(child: Omit<Child, 'id'>): Promise<Child> {
    this.validateChild(child);
    return this.childRepo.create(child);
  }

  // Delete child
  async deleteChild(id: string): Promise<void> {
    await this.parenthoodService.deleteAllChildRelations(id);
    await this.attendanceService.deleteAllAttendanceItemsOfChild(id);
    await this.childRepo.deleteById(id);
  }

  // Update child
  async updateChild(id: string, child: Child): Promise<void> {
    this.validateChild(child);
    const originalChild = await this.childRepo.findById(id);
    if (originalChild.schoolDays !== child.schoolDays) {
      await this.attendanceService.deleteAllAttendanceItemsOfChildFromToday(id);
    }
    await this.childRepo.updateById(id, child);
  }

  // Get all children
  async getChildren(): Promise<Child[]> {
    return this.childRepo.find({
      include: ['users'],
    });
  }

  // Get a child
  async getChild(id: string): Promise<Child> {
    return this.childRepo.findById(id);
  }

  // Get parents o child
  async getChildParents(id: string): Promise<User[]> {
    if (!(await this.childRepo.exists(id))) {
      throw HttpErrors.NotFound('Dítě nebylo nalezeno.');
    }
    return this.childRepo.users(id).find();
  }

  // Get all children who has attendance on given date
  async getChildrenWithAttendanceOnDate(date: string): Promise<Child[]> {
    const attendanceItems =
      await this.attendanceService.getAllAttendanceItemsOnDate(date);
    const childPromises = attendanceItems
      .filter(att => !att.userId && att.childId)
      .map(att => this.childRepo.findById(att.childId!));
    return Promise.all(childPromises);
  }

  // Validate new child
  validateChild(child: Omit<Child, 'id'>) {
    const CZECH_BIG_LETTERS = 'ÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ';
    const CZECH_SMALL_LETTERS = 'áčďéěíňóřšťúůýž';
    const nameRegex = new RegExp(
      `^[A-Z${CZECH_BIG_LETTERS}][a-z${CZECH_SMALL_LETTERS}]+(?: [A-Z${CZECH_BIG_LETTERS}][a-z${CZECH_SMALL_LETTERS}]+)? [A-Z${CZECH_BIG_LETTERS}][a-z${CZECH_SMALL_LETTERS}]+$`,
      'g',
    );
    const schoolDaysRegex = new RegExp('^0?1?2?3?4?$', 'g');

    const childSchema = z.object({
      fullName: z.string().regex(nameRegex, {
        message: 'Neplatné jméno',
      }),
      dateOfBirth: z
        .string()
        .date()
        .refine(this.isFromPast, {message: 'Neplatné datum narození.'}),
      description: z.string().optional(),
      monthlyFee: z.number().positive(),
      schoolDays: z.string().regex(schoolDaysRegex, {
        message:
          'Dny musí být reprezentovýny pouze znaky 0-4 a musí být seřazeny. Dále musí obsahovat alespoň jeden znak a maximálně 5 znaků.',
      }),
      note: z.string().max(1000).optional(),
    });

    const {error} = childSchema.safeParse(child);
    if (error) {
      throw HttpErrors.UnprocessableEntity(error.errors[0].message);
    }
  }

  // Test for date lower than today
  private isFromPast(dateStr: string): boolean {
    const date = dayjs(dateStr)
      .locale({
        ...locale,
      })
      .startOf('day');
    const today = dayjs()
      .locale({
        ...locale,
      })
      .startOf('day');
    return date.isBefore(today);
  }
}
