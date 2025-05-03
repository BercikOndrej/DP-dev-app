"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactInfoService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const zod_1 = require("zod");
const repositories_1 = require("../repositories");
let ContactInfoService = class ContactInfoService {
    constructor(contactInfoRepo) {
        this.contactInfoRepo = contactInfoRepo;
    }
    // Create contactInfo
    async createContactInfo(contactInfo) {
        this.validateContactInfo(contactInfo);
        return this.contactInfoRepo.create(contactInfo);
    }
    // Delete contactInfo
    async deleteContactInfo(id) {
        await this.contactInfoRepo.deleteById(id);
    }
    // Update contactInfo
    async updateContactInfo(id, contactInfo) {
        this.validateContactInfo(contactInfo);
        await this.contactInfoRepo.updateById(id, contactInfo);
    }
    // Get all contactInfo
    async getAllContactInfo() {
        return this.contactInfoRepo.find();
    }
    // Get one contactInfo
    async getOneContactInfo(id) {
        return this.contactInfoRepo.findById(id);
    }
    // Validate contactInfo object
    validateContactInfo(info) {
        const CZECH_BIG_LETTERS = 'ÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ';
        const CZECH_SMALL_LETTERS = 'áčďéěíňóřšťúůýž';
        const nameRegex = new RegExp(`^[A-Z${CZECH_BIG_LETTERS}][a-z${CZECH_SMALL_LETTERS}]+(?: [A-Z${CZECH_BIG_LETTERS}][a-z${CZECH_SMALL_LETTERS}]+)? [A-Z${CZECH_BIG_LETTERS}][a-z${CZECH_SMALL_LETTERS}]+$`, 'g');
        const phoneRegex = /^\+?[0-9]{3}(?: [0-9]{3}){2,3}$/;
        const infoSchema = zod_1.z.object({
            fullName: zod_1.z.string().regex(nameRegex, {
                message: 'Neplatné jméno.',
            }),
            email: zod_1.z.string().email({ message: 'Neplatná emailová adresa.' }),
            phoneNumber: zod_1.z
                .string()
                .regex(phoneRegex, { message: 'Neplatné telefoní číslo' }),
        });
        const { error } = infoSchema.safeParse(info);
        if (error) {
            console.log(error);
            throw rest_1.HttpErrors.UnprocessableEntity(error.errors[0].message);
        }
    }
};
exports.ContactInfoService = ContactInfoService;
exports.ContactInfoService = ContactInfoService = tslib_1.__decorate([
    (0, core_1.injectable)({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.ContactInfoRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ContactInfoRepository])
], ContactInfoService);
//# sourceMappingURL=contact-info.service.js.map