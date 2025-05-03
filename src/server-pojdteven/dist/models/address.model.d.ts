import { Entity } from '@loopback/repository';
export declare class Address extends Entity {
    id?: number;
    street?: string;
    houseNumber: string;
    city: string;
    zipCode: string;
    note?: string;
    userId?: string;
    constructor(data?: Partial<Address>);
}
export interface AddressRelations {
}
export type AddressWithRelations = Address & AddressRelations;
