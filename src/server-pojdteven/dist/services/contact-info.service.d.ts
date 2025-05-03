import { ContactInfo } from '../models';
import { ContactInfoRepository } from '../repositories';
export declare class ContactInfoService {
    private contactInfoRepo;
    constructor(contactInfoRepo: ContactInfoRepository);
    createContactInfo(contactInfo: Omit<ContactInfo, 'id'>): Promise<ContactInfo>;
    deleteContactInfo(id: number): Promise<void>;
    updateContactInfo(id: number, contactInfo: ContactInfo): Promise<void>;
    getAllContactInfo(): Promise<ContactInfo[]>;
    getOneContactInfo(id: number): Promise<ContactInfo>;
    validateContactInfo(info: Omit<ContactInfo, 'id'>): void;
}
