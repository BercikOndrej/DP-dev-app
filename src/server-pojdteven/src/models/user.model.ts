import {Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {Role} from '../enums';
import {Address} from './address.model';
import {Attendance} from './attendance.model';
import {Child} from './child.model';
import {Parenthood} from './parenthood.model';
import {UserCredentials} from './user-credentials.model';

@model()
export class User extends Entity {
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
    index: {
      unique: true,
    },
  })
  email: string;

  @property({
    type: 'string',
    jsonSchema: {
      enum: Object.values(Role),
    },
  })
  role?: Role;

  @property({
    type: 'string',
  })
  fullName: string;

  @property({
    type: 'string',
    required: false,
    mysql: {
      dataTaype: 'date',
    },
  })
  dateOfBirth?: string;

  @property({
    type: 'string',
  })
  imagePath?: string;

  @property({
    type: 'string',
    mysql: {
      dataType: 'LONGTEXT',
    },
  })
  description?: string;

  @property({
    type: 'string',
  })
  academicTitle?: string;

  @property({
    type: 'string',
  })
  phoneNumber: string;

  @property({
    type: 'string',
  })
  resetPasswordToken?: string | null;

  @property({
    type: 'string',
  })
  dateOfLastResetPasswordRequest?: Date | null;

  @property({
    type: 'string',
  })
  note?: string;

  @hasOne(() => UserCredentials)
  userCredentials: UserCredentials;

  @hasOne(() => Address)
  address: Address;

  @hasMany(() => Child, {through: {model: () => Parenthood}})
  children: Child[];

  @hasMany(() => Attendance)
  attendanceItems: Attendance[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
