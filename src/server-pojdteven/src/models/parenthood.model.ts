import {Entity, model, property} from '@loopback/repository';

@model()
export class Parenthood extends Entity {
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
  userId: string;

  @property({
    type: 'string',
    required: true,
  })
  childId: string;

  constructor(data?: Partial<Parenthood>) {
    super(data);
  }
}

export interface ParenthoodRelations {
  // describe navigational properties here
}

export type ParenthoodWithRelations = Parenthood & ParenthoodRelations;
