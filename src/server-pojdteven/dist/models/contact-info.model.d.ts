import { Entity } from '@loopback/repository';
export declare class ContactInfo extends Entity {
    id?: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    constructor(data?: Partial<ContactInfo>);
}
export interface ContactInfoRelations {
}
export type ContactInfoWithRelations = ContactInfo & ContactInfoRelations;
