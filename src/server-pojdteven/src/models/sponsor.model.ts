import {Entity, model, property} from '@loopback/repository';

@model()
export class Sponsor extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    defaultFn: 'uuidv4',
  })
  id?: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  imagePath?: string;

  constructor(data?: Partial<Sponsor>) {
    super(data);
  }
}

export interface SponsorRelations {
  // describe navigational properties here
}

export type SponsorWithRelations = Sponsor & SponsorRelations;
