import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {z} from 'zod';
import {ContactInfo} from '../models';
import {ContactInfoRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class ContactInfoService {
  constructor(
    @repository(ContactInfoRepository)
    private contactInfoRepo: ContactInfoRepository,
  ) {}

  // Create contactInfo
  async createContactInfo(
    contactInfo: Omit<ContactInfo, 'id'>,
  ): Promise<ContactInfo> {
    this.validateContactInfo(contactInfo);
    return this.contactInfoRepo.create(contactInfo);
  }

  // Delete contactInfo
  async deleteContactInfo(id: number): Promise<void> {
    await this.contactInfoRepo.deleteById(id);
  }

  // Update contactInfo
  async updateContactInfo(id: number, contactInfo: ContactInfo): Promise<void> {
    this.validateContactInfo(contactInfo);
    await this.contactInfoRepo.updateById(id, contactInfo);
  }

  // Get all contactInfo
  async getAllContactInfo(): Promise<ContactInfo[]> {
    return this.contactInfoRepo.find();
  }

  // Get one contactInfo
  async getOneContactInfo(id: number): Promise<ContactInfo> {
    return this.contactInfoRepo.findById(id);
  }

  // Validate contactInfo object
  validateContactInfo(info: Omit<ContactInfo, 'id'>) {
    const CZECH_BIG_LETTERS = 'ÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ';
    const CZECH_SMALL_LETTERS = 'áčďéěíňóřšťúůýž';
    const nameRegex = new RegExp(
      `^[A-Z${CZECH_BIG_LETTERS}][a-z${CZECH_SMALL_LETTERS}]+(?: [A-Z${CZECH_BIG_LETTERS}][a-z${CZECH_SMALL_LETTERS}]+)? [A-Z${CZECH_BIG_LETTERS}][a-z${CZECH_SMALL_LETTERS}]+$`,
      'g',
    );
    const phoneRegex = /^\+?[0-9]{3}(?: [0-9]{3}){2,3}$/;

    const infoSchema = z.object({
      fullName: z.string().regex(nameRegex, {
        message: 'Neplatné jméno.',
      }),
      email: z.string().email({message: 'Neplatná emailová adresa.'}),
      phoneNumber: z
        .string()
        .regex(phoneRegex, {message: 'Neplatné telefoní číslo'}),
    });

    const {error} = infoSchema.safeParse(info);
    if (error) {
      console.log(error);
      throw HttpErrors.UnprocessableEntity(error.errors[0].message);
    }
  }
}
