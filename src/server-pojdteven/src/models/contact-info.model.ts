import {Entity, model, property} from '@loopback/repository';

@model()
export class ContactInfo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  fullName: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  phoneNumber: string;

  constructor(data?: Partial<ContactInfo>) {
    super(data);
  }
}

export interface ContactInfoRelations {
  // describe navigational properties here
}

export type ContactInfoWithRelations = ContactInfo & ContactInfoRelations;
