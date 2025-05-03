"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralInfoController = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const authorization_1 = require("@loopback/authorization");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const enums_1 = require("../enums");
const models_1 = require("../models");
const services_1 = require("../services");
const ENDPOINT = '/generalInfo';
const ADMIN_ENDPOINT = '/admin/generalInfo';
let GeneralInfoController = class GeneralInfoController {
    constructor(generaInfoService) {
        this.generaInfoService = generaInfoService;
    }
    async createInfo(generalInfo) {
        return this.generaInfoService.createInfo(generalInfo);
    }
    async getInfo(page) {
        return this.generaInfoService.getWholeInfo(page);
    }
    async getInfoById(id) {
        return this.generaInfoService.getInfoById(id);
    }
    async getNextPositionOfInfoOnPage(page) {
        return this.generaInfoService.getNextPositionOfInfoOnPage(page);
    }
    async updateInfo(id, generalInfo) {
        await this.generaInfoService.updateInfo(id, generalInfo);
    }
    async deleteInfo(id) {
        await this.generaInfoService.deleteInfo(id);
    }
};
exports.GeneralInfoController = GeneralInfoController;
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [enums_1.Role.ADMIN],
    }),
    (0, rest_1.post)(ADMIN_ENDPOINT),
    (0, rest_1.response)(200, {
        description: 'GeneralInfo model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.GeneralInfo) } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.GeneralInfo, {
                    title: 'NewGeneralInfo',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], GeneralInfoController.prototype, "createInfo", null);
tslib_1.__decorate([
    (0, rest_1.get)(ENDPOINT),
    (0, rest_1.response)(200, {
        description: 'Array of GeneralInfo model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.GeneralInfo, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.query.string('page')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], GeneralInfoController.prototype, "getInfo", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [enums_1.Role.ADMIN],
    }),
    (0, rest_1.get)(`${ADMIN_ENDPOINT}/{id}`),
    (0, rest_1.response)(200, {
        description: 'GeneralInfo model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.GeneralInfo, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], GeneralInfoController.prototype, "getInfoById", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [enums_1.Role.ADMIN],
    }),
    (0, rest_1.get)(`${ADMIN_ENDPOINT}/nextPosition`),
    (0, rest_1.response)(200, {
        description: 'number represents next position of info items',
        content: {
            'application/json': {
                schema: {
                    type: 'number',
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.query.string('page')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], GeneralInfoController.prototype, "getNextPositionOfInfoOnPage", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [enums_1.Role.ADMIN],
    }),
    (0, rest_1.put)(`${ADMIN_ENDPOINT}/{id}`),
    (0, rest_1.response)(204, {
        description: 'GeneralInfo PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.GeneralInfo]),
    tslib_1.__metadata("design:returntype", Promise)
], GeneralInfoController.prototype, "updateInfo", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [enums_1.Role.ADMIN],
    }),
    (0, rest_1.del)(`${ADMIN_ENDPOINT}/{id}`),
    (0, rest_1.response)(204, {
        description: 'GeneralInfo DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], GeneralInfoController.prototype, "deleteInfo", null);
exports.GeneralInfoController = GeneralInfoController = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.service)(services_1.GeneralInfoService)),
    tslib_1.__metadata("design:paramtypes", [services_1.GeneralInfoService])
], GeneralInfoController);
//# sourceMappingURL=general-info.controller.js.map