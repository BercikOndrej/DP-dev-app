import {Entity, model, property} from '@loopback/repository';

@model()
export class Action extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    defaultFn: 'uuidv4',
  })
  id?: string;

  @property({
    type: 'string',
    default: '',
  })
  imagePath?: string;

  @property({
    type: 'date',
    default: Date.now(),
  })
  existsFrom: Date;

  @property({
    type: 'string',
  })
  note?: string;

  constructor(data?: Partial<Action>) {
    super(data);
  }
}

export interface ActionRelations {
  // describe navigational properties here
}

export type ActionWithRelations = Action & ActionRelations;
