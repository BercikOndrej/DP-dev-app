import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {service} from '@loopback/core';
import {CountSchema} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {Role} from '../enums';
import {Attendance} from '../models';
import {AttendanceService} from '../services';

const GENERAL_ENDPOINT = '/attendance';
const ADMIN_GENERAL_ENDPOINT = '/admin/attendance';
const CHILD_ATTENDANCE_ENDPOINT = '/attendance/child';
const ADMIN_CHILD_ATTENDANCE_ENDPOINT = '/admin/attendance/child';
const TEACHER_ATTENDANCE_ENDPOINT = '/attendance/teacher';
const ADMIN_TEACHER_ATTENDANCE_ENDPOINT = '/admin/attendance/teacher';

export class AttendanceController {
  constructor(
    @service(AttendanceService) private attendanceService: AttendanceService,
  ) {}

  // General methods
  // ----------------------------------------------------------------------
  // Create attendance
  @authenticate('jwt')
  @authorize({
    allowedRoles: [Role.ADMIN],
  })
  @post(ADMIN_GENERAL_ENDPOINT)
  @response(200, {
    description: 'Attendance model instance',
    content: {
      'application/json': {schema: getModelSchemaRef(Attendance)},
    },
  })
  async createAttendance(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Attendance, {
            title: 'NewAttendance',
            exclude: ['id'],
          }),
        },
      },
    })
    att: Omit<Attendance, 'id'>,
  ): Promise<Attendance> {
    return this.attendanceService.createAttendance(att);
  }

  // Delete attendence
  @authenticate('jwt')
  @authorize({
    allowedRoles: [Role.ADMIN],
  })
  @del(`${ADMIN_GENERAL_ENDPOINT}/{id}`)
  @response(204, {
    description: 'Delete Attendance instance success',
  })
  async deleteAttendance(@param.path.string('id') id: string): Promise<void> {
    await this.attendanceService.deleteAttendance(id);
  }

  @del(`${GENERAL_ENDPOINT}/delete/olderThanYear`)
  @response(200, {
    description: 'Delete Attendance instance items older than one year',
  })
  async deleteAllAttendanceItemsOlderThanYear(): Promise<void> {
    await this.attendanceService.deleteAllAttendanceItemsOlderThanYear();
  }

  // Get attendance
  @authenticate('jwt')
  @authorize({
    allowedRoles: Object.values(Role),
  })
  @get(`${GENERAL_ENDPOINT}/{id}`)
  @response(200, {
    description: 'Attendance model instance',
    content: {
      'application/json': {schema: getModelSchemaRef(Attendance)},
    },
  })
  async getAttendance(
    @param.path.string('id') id: string,
  ): Promise<Attendance> {
    return this.attendanceService.getAttendance(id);
  }

  // Find attendance
  @authenticate('jwt')
  @authorize({
    allowedRoles: [Role.ADMIN],
  })
  @get(`${ADMIN_GENERAL_ENDPOINT}/find`)
  @response(200, {
    description:
      "Attendance model instance or null if attendance doesn't exist.",
    content: {
      'application/json': {schema: getModelSchemaRef(Attendance)},
    },
  })
  async findAttendance(
    @param.query.string('userId') userId: string,
    @param.query.string('dateStr') dateStr: string,
  ): Promise<Attendance | null> {
    return this.attendanceService.findAttendance(userId, dateStr);
  }

  // Get many attendance items
  @authenticate('jwt')
  @authorize({
    allowedRoles: Object.values(Role),
  })
  @get(GENERAL_ENDPOINT)
  @response(200, {
    description: 'Array Attendance model instance',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Attendance),
        },
      },
    },
  })
  async getAllAttendanceItems(): Promise<Attendance[]> {
    return this.attendanceService.getAllAttendanceItems();
  }

  // Get all attendance items that exist on given date
  @authenticate('jwt')
  @authorize({
    allowedRoles: [Role.ADMIN, Role.TEACHER],
  })
  @get(`${GENERAL_ENDPOINT}/onDate`)
  @response(200, {
    description: 'Array Attendance model instance that exists on given date',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Attendance),
        },
      },
    },
  })
  async getAllAttendanceItemsOnDate(
    @param.query.string('date') date: string,
  ): Promise<Attendance[]> {
    return this.attendanceService.getAllAttendanceItemsOnDate(date);
  }

  // Methods for child attendance
  // ----------------------------------------------------------------------

  // Create many attendance items for a child from given date to given date. Dates are dependet on child school days
  @authenticate('jwt')
  @authorize({
    allowedRoles: [Role.ADMIN],
  })
  @post(`${ADMIN_CHILD_ATTENDANCE_ENDPOINT}`)
  @response(200, {
    description:
      'Array Attendance model instances created based on school days of the child',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Attendance),
        },
      },
    },
  })
  async createManyChildAttendanceItemsBySchoolDays(
    @requestBody({
      description:
        'Dates for creating Attendance model instances and id of the child for relation',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              childId: {
                type: 'string',
              },
              from: {
                type: 'string',
                format: 'date',
              },
              to: {
                type: 'string',
                format: 'date',
              },
            },
          },
        },
      },
    })
    data: {
      childId: string;
      from: string;
      to: string;
    },
  ): Promise<Attendance[]> {
    return this.attendanceService.createManyChildAttendanceItemsBySchoolDays(
      data.childId,
      data.from,
      data.to,
    );
  }

  @authenticate('jwt')
  @authorize({
    allowedRoles: [Role.ADMIN],
  })
  // Delete all attendance items of the child
  // This method is used in deleting child
  @del(`${ADMIN_CHILD_ATTENDANCE_ENDPOINT}/{childId}/items`)
  @response(204, {
    description: 'Delete all Attendance instance of the child success',
  })
  async deleteAllAttendanceItemsOfChild(
    @param.path.string('childId') childId: string,
  ): Promise<void> {
    await this.attendanceService.deleteAllAttendanceItemsOfChild(childId);
  }

  @authenticate('jwt')
  @authorize({
    allowedRoles: [Role.ADMIN],
  })
  // Delete all attendance items of the child from today date
  // This method is used in changing school days of the child
  @del(`${CHILD_ATTENDANCE_ENDPOINT}/{childId}/items/fromToday`)
  @response(204, {
    description:
      'Delete all Attendance instance of the child from today date success',
  })
  async deleteAllAttendanceItemsOfChildFromToday(
    @param.path.string('childId') childId: string,
  ): Promise<void> {
    await this.attendanceService.deleteAllAttendanceItemsOfChildFromToday(
      childId,
    );
  }

  // Get all normal attendance items of the child in given month (zero indexed)
  // This method is used to show all attendance items in calendar on FE
  @authenticate('jwt')
  @authorize({
    allowedRoles: Object.values(Role),
  })
  @get(`${CHILD_ATTENDANCE_ENDPOINT}/{childId}/normal/items`)
  @response(200, {
    description: 'Array Attendace model instance of the child',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Attendance),
        },
      },
    },
  })
  async getAllNormalAttendanceItemsOfChildInMonth(
    @param.path.string('childId') childId: string,
    @param.query.number('month') month: number,
  ): Promise<Attendance[]> {
    return this.attendanceService.getAllNormalAttendanceItemsOfChildInMonth(
      childId,
      month,
    );
  }

  // Get count of all alternative attendance items of the child
  // Thanks to this function we know how much attendance may write down
  @authenticate('jwt')
  @authorize({
    allowedRoles: Object.values(Role),
  })
  @get(`${CHILD_ATTENDANCE_ENDPOINT}/{childId}/alternative/count`)
  @response(200, {
    description: 'Count of the alternative attendance items of the child',
    content: {
      'application/json': {
        schema: CountSchema,
      },
    },
  })
  async getCountOfAllAlternativeAttendanceItemsOfChild(
    @param.path.string('childId') childId: string,
  ): Promise<number> {
    return this.attendanceService.getCountOfAllAlternativeAttendanceOfChild(
      childId,
    );
  }

  // Enroll new normal attendace for a child
  // It can happend only if child have some alternative attendace
  @authenticate('jwt')
  @authorize({
    allowedRoles: [Role.USER, Role.ADMIN],
  })
  @post(`${CHILD_ATTENDANCE_ENDPOINT}/enroll`)
  @response(200, {
    description: 'Attendance model instance',
    content: {
      'application/json': {schema: getModelSchemaRef(Attendance)},
    },
  })
  async enrollNewNormalAttendanceOfChild(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Attendance, {
            title: 'NewAttendance',
            exclude: ['id'],
          }),
        },
      },
    })
    att: Omit<Attendance, 'id'>,
  ): Promise<Attendance> {
    return this.attendanceService.enrollNewNormalAttendanceOfChild(att);
  }

  // Unroll normal attendace of the child
  // When child unroll attendance he get alternative attendance and thanks to that it can enroll new normal attendance
  @authenticate('jwt')
  @authorize({
    allowedRoles: [Role.USER, Role.ADMIN],
  })
  @patch(`${CHILD_ATTENDANCE_ENDPOINT}/{id}/unroll`)
  @response(204, {
    description: 'Instance of Attendance model PATCH success',
  })
  async unrollAttendanceOfChild(
    @param.path.string('id') id: string,
  ): Promise<void> {
    await this.attendanceService.unrollAttendanceOfChild(id);
  }

  // Methods for user/teacher attendance
  // ----------------------------------------------------------------------

  // Create many user attendance items for teacher based on given dates
  @authenticate('jwt')
  @authorize({
    allowedRoles: [Role.ADMIN],
  })
  @post(`${ADMIN_TEACHER_ATTENDANCE_ENDPOINT}`)
  @response(200, {
    description: 'Array Attendandce model instances of user,',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Attendance),
        },
      },
    },
  })
  async createAttendanceItemsOfUser(
    @requestBody({
      description:
        'Date for creating attendance items and id representing a user',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              userId: {
                type: 'string',
              },
              dates: {
                type: 'array',
                items: {
                  type: 'string',
                  format: 'date',
                },
              },
            },
          },
        },
      },
    })
    data: {
      userId: string;
      dates: string[];
    },
  ): Promise<Attendance[]> {
    return this.attendanceService.createAttendanceItemsOfUser(
      data.userId,
      data.dates,
    );
  }

  // Delete all user attendance items
  @authenticate('jwt')
  @authorize({
    allowedRoles: [Role.ADMIN],
  })
  @del(`${ADMIN_TEACHER_ATTENDANCE_ENDPOINT}/{userId}`)
  @response(204, {
    description: 'Instances of Attendance model of given user DELETE success',
  })
  async deleteAllAttendanceItemsOfUser(
    @param.path.string('userId') userId: string,
  ): Promise<void> {
    await this.attendanceService.deleteAllAttendanceItemsOfUser(userId);
  }

  // Get all attendance items of all teachers in given month
  @authenticate('jwt')
  @authorize({
    allowedRoles: [Role.TEACHER, Role.ADMIN],
  })
  @get(`${TEACHER_ATTENDANCE_ENDPOINT}/{userId}`)
  @response(200, {
    description: 'Array Attendandce model instances of user,',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Attendance),
        },
      },
    },
  })
  async getAllAttendanceItemsOfTeachersInMonth(
    @param.query.number('month') month: number,
  ): Promise<Attendance[]> {
    return this.attendanceService.getAllAttendanceItemsOfAllTeachersInMonth(
      month,
    );
  }

  // Change teacher attendance
  @authenticate('jwt')
  @authorize({
    allowedRoles: [Role.ADMIN],
  })
  @post(`${ADMIN_TEACHER_ATTENDANCE_ENDPOINT}/change`)
  @response(200, {
    description: 'Instance of Attendance model',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Attendance),
      },
    },
  })
  async changeTeacherAttendance(
    @requestBody({
      description: 'Needed date for attendance switch',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              originTeacherId: {
                type: 'string',
              },
              nextTeacherId: {
                type: 'string',
              },
              dateStr: {
                type: 'string',
              },
              isPickUp: {
                type: 'boolean',
              },
            },
          },
        },
      },
    })
    data: {
      originTeacherId: string;
      nextTeacherId: string;
      isPickUp: boolean;
      dateStr: string;
    },
  ): Promise<Attendance> {
    return this.attendanceService.changeTeacherAttendance(data);
  }
}
