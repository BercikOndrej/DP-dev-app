"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SponsorController = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const authorization_1 = require("@loopback/authorization");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const enums_1 = require("../enums");
const models_1 = require("../models");
const services_1 = require("../services");
const ENDPOINT = '/sponsors';
const ADMIN_ENDPOINT = '/admin/sponsors';
let SponsorController = class SponsorController {
    constructor(sponsorService) {
        this.sponsorService = sponsorService;
    }
    // Create sponsor
    async createSponsor(sponsor) {
        return this.sponsorService.createSponsor(sponsor);
    }
    // Update sponsor
    async updateSponsor(id, sponsor) {
        await this.sponsorService.updateSponsor(id, sponsor);
    }
    // Upload sponsor image
    async uploadSponsorImage(id, request) {
        await this.sponsorService.uploadSponsorImage(id, request);
    }
    // Delete sponsor
    async deleteSponsor(id) {
        await this.sponsorService.deleteSponsor(id);
    }
    // Get sponsor
    async getSponsor(id) {
        return this.sponsorService.getSponsor(id);
    }
    // Get all sponsors
    async getSponsors() {
        return this.sponsorService.getSponsors();
    }
};
exports.SponsorController = SponsorController;
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [enums_1.Role.ADMIN],
    }),
    (0, rest_1.post)(ADMIN_ENDPOINT),
    (0, rest_1.response)(200, {
        description: 'Sponsor model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Sponsor) } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Sponsor, {
                    title: 'NewSponsor',
                    exclude: ['id', 'imagePath'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SponsorController.prototype, "createSponsor", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [enums_1.Role.ADMIN],
    }),
    (0, rest_1.put)(`${ADMIN_ENDPOINT}/{id}`),
    (0, rest_1.response)(204, {
        description: 'Sponsor PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Sponsor]),
    tslib_1.__metadata("design:returntype", Promise)
], SponsorController.prototype, "updateSponsor", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [enums_1.Role.ADMIN],
    }),
    (0, rest_1.post)(`${ADMIN_ENDPOINT}/{id}/imageUpload`),
    (0, rest_1.response)(204, {
        description: 'Upload sponsor image success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody.file()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SponsorController.prototype, "uploadSponsorImage", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [enums_1.Role.ADMIN],
    }),
    (0, rest_1.del)(`${ADMIN_ENDPOINT}/{id}`),
    (0, rest_1.response)(204, {
        description: 'Sponsor DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], SponsorController.prototype, "deleteSponsor", null);
tslib_1.__decorate([
    (0, rest_1.get)(`${ENDPOINT}/{id}`),
    (0, rest_1.response)(200, {
        description: 'Sponsor model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Sponsor, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], SponsorController.prototype, "getSponsor", null);
tslib_1.__decorate([
    (0, rest_1.get)(ENDPOINT),
    (0, rest_1.response)(200, {
        description: 'Array of Sponsor model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Sponsor, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], SponsorController.prototype, "getSponsors", null);
exports.SponsorController = SponsorController = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.service)(services_1.SponsorService)),
    tslib_1.__metadata("design:paramtypes", [services_1.SponsorService])
], SponsorController);
//# sourceMappingURL=sponsor.controller.js.map