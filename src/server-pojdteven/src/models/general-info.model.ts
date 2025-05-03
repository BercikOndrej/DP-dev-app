import {Entity, model, property} from '@loopback/repository';
import {PageType} from '../enums/PageType';

@model()
export class GeneralInfo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  title?: string;

  @property({
    type: 'string',
    mysql: {
      dataType: 'LONGTEXT',
    },
  })
  content?: string;

  @property({
    type: 'string',
    default: '',
    jsonSchema: {
      enum: Object.values(PageType),
    },
  })
  page: PageType;

  @property({
    type: 'number',
  })
  position?: number;

  constructor(data?: Partial<GeneralInfo>) {
    super(data);
  }
}

export interface GeneralInfoRelations {
  // describe navigational properties here
}

export type GeneralInfoWithRelations = GeneralInfo & GeneralInfoRelations;
