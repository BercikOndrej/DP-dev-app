import { ContactInfoService } from '../services';
import { ContactInfo } from '../models';
export declare class ContactInfoController {
    private contactInfoService;
    constructor(contactInfoService: ContactInfoService);
    createContactInfo(contactInfo: Omit<ContactInfo, 'id'>): Promise<ContactInfo>;
    deleteContactInfo(id: number): Promise<void>;
    updateContactInfo(id: number, contactInfo: ContactInfo): Promise<void>;
    getAllContactInfo(): Promise<ContactInfo[]>;
    getOneContactInfo(id: number): Promise<ContactInfo>;
}
