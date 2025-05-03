import {Entity, model, property} from '@loopback/repository';
import {PhotoTag} from '../enums/PhotoTag';

@model()
export class Photo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    defaultFn: 'uuidv4',
  })
  id?: string;

  @property({
    type: 'date',
    default: Date.now(),
  })
  existsFrom: Date;

  @property({
    type: 'string',
  })
  imagePath?: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: Object.values(PhotoTag),
    },
  })
  tag: PhotoTag;

  constructor(data?: Partial<Photo>) {
    super(data);
  }
}

export interface PhotoRelations {
  // describe navigational properties here
}

export type PhotoWithRelations = Photo & PhotoRelations;
