import {Entity, model, property} from '@loopback/repository';
import {AttendanceTag} from '../enums';

@model()
export class Attendance extends Entity {
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
    mysql: {
      dataType: 'date',
    },
  })
  date: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: Object.values(AttendanceTag),
    },
  })
  tag: AttendanceTag;

  @property({
    type: 'boolean',
    mysql: {
      dataType: 'tinyint',
    },
  })
  pickUp?: boolean;

  @property({
    type: 'string',
  })
  childId?: string;

  @property({
    type: 'string',
  })
  userId?: string;

  constructor(data?: Partial<Attendance>) {
    super(data);
  }
}

export interface AttendanceRelations {
  // describe navigational properties here
}

export type AttendanceWithRelations = Attendance & AttendanceRelations;
