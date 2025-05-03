"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactInfoController = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const services_1 = require("../services");
const authentication_1 = require("@loopback/authentication");
const authorization_1 = require("@loopback/authorization");
const rest_1 = require("@loopback/rest");
const enums_1 = require("../enums");
const models_1 = require("../models");
const ENDPOINT = '/contactInfo';
const ADMIN_ENDPOINT = '/admin/contactInfo';
let ContactInfoController = class ContactInfoController {
    constructor(contactInfoService) {
        this.contactInfoService = contactInfoService;
    }
    // Create contactInfo
    async createContactInfo(contactInfo) {
        return this.contactInfoService.createContactInfo(contactInfo);
    }
    // Delete
    async deleteContactInfo(id) {
        await this.contactInfoService.deleteContactInfo(id);
    }
    // Update contactInfo
    async updateContactInfo(id, contactInfo) {
        await this.contactInfoService.updateContactInfo(id, contactInfo);
    }
    // Get all contactInfo
    async getAllContactInfo() {
        return this.contactInfoService.getAllContactInfo();
    }
    // Get contactInfo by id
    async getOneContactInfo(id) {
        return this.contactInfoService.getOneContactInfo(id);
    }
};
exports.ContactInfoController = ContactInfoController;
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [enums_1.Role.ADMIN],
    }),
    (0, rest_1.post)(ADMIN_ENDPOINT),
    (0, rest_1.response)(200, {
        description: 'DayActivity model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.ContactInfo) } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.ContactInfo, {
                    title: 'newContactInfo',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ContactInfoController.prototype, "createContactInfo", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [enums_1.Role.ADMIN],
    }),
    (0, rest_1.del)(`${ADMIN_ENDPOINT}/{id}`),
    (0, rest_1.response)(204, {
        description: 'ContactInfo DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], ContactInfoController.prototype, "deleteContactInfo", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [enums_1.Role.ADMIN],
    }),
    (0, rest_1.put)(`${ADMIN_ENDPOINT}/{id}`),
    (0, rest_1.response)(204, {
        description: 'ContactInfo PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.ContactInfo]),
    tslib_1.__metadata("design:returntype", Promise)
], ContactInfoController.prototype, "updateContactInfo", null);
tslib_1.__decorate([
    (0, rest_1.get)(ENDPOINT),
    (0, rest_1.response)(200, {
        description: 'Array of ContactInfo model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.ContactInfo, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ContactInfoController.prototype, "getAllContactInfo", null);
tslib_1.__decorate([
    (0, rest_1.get)(`${ENDPOINT}/{id}`),
    (0, rest_1.response)(200, {
        description: 'ContactInfo model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.ContactInfo, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], ContactInfoController.prototype, "getOneContactInfo", null);
exports.ContactInfoController = ContactInfoController = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.service)(services_1.ContactInfoService)),
    tslib_1.__metadata("design:paramtypes", [services_1.ContactInfoService])
], ContactInfoController);
//# sourceMappingURL=contact-info.controller.js.map