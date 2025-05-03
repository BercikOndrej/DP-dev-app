import {Entity, model, property} from '@loopback/repository';

@model()
export class DayActivity extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    mysql: {
      dataType: 'time',
    },
  })
  startTime: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      dataType: 'time',
    },
  })
  endTime: string;

  @property({
    type: 'string',
  })
  description: string;

  constructor(data?: Partial<DayActivity>) {
    super(data);
  }
}

export interface DayActivityRelations {
  // describe navigational properties here
}

export type DayActivityWithRelations = DayActivity & DayActivityRelations;
