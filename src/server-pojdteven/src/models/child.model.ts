import {Entity, hasMany, model, property} from '@loopback/repository';
import {Attendance} from './attendance.model';
import {Parenthood} from './parenthood.model';
import {User} from './user.model';

@model()
export class Child extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    defaultFn: 'uuidv4',
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  fullName: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      dataType: 'date',
    },
  })
  dateOfBirth: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'number',
    required: true,
  })
  monthlyFee: number;

  @property({
    type: 'string',
    required: true,
  })
  schoolDays: string;

  @property({
    type: 'string',
  })
  note?: string;

  @hasMany(() => User, {through: {model: () => Parenthood}})
  users: User[];

  @hasMany(() => Attendance)
  attendanceItems: Attendance[];

  constructor(data?: Partial<Child>) {
    super(data);
  }
}

export interface ChildRelations {
  // describe navigational properties here
}

export type ChildWithRelations = Child & ChildRelations;
