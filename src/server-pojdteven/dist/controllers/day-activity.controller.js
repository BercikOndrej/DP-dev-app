"use strict";
// Uncomment these imports to begin using these cool features!
Object.defineProperty(exports, "__esModule", { value: true });
exports.DayActivityController = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const authorization_1 = require("@loopback/authorization");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const enums_1 = require("../enums");
const models_1 = require("../models");
const services_1 = require("../services");
const ENDPOINT = '/dayActivities';
const ADMIN_ENDPOINT = '/admin/dayActivities';
let DayActivityController = class DayActivityController {
    constructor(dayActivityService) {
        this.dayActivityService = dayActivityService;
    }
    // Create dayActivity
    async createDayActivity(dayActivity) {
        return this.dayActivityService.createDayActivity(dayActivity);
    }
    // Delete dayActivity
    async deleteDayActivity(id) {
        await this.dayActivityService.deleteDayActivity(id);
    }
    // Update dayActivity
    async updateDayActivity(id, dayActivity) {
        await this.dayActivityService.updateDayActivity(id, dayActivity);
    }
    // Get all day activities
    async getAllDayActivities() {
        return this.dayActivityService.getDayActivities();
    }
    // Get dayActivity by id
    async getDayActivity(id) {
        return this.dayActivityService.getDayActivity(id);
    }
};
exports.DayActivityController = DayActivityController;
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [enums_1.Role.ADMIN],
    }),
    (0, rest_1.post)(ADMIN_ENDPOINT),
    (0, rest_1.response)(200, {
        description: 'DayActivity model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.DayActivity) } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.DayActivity, {
                    title: 'newDayActivity',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DayActivityController.prototype, "createDayActivity", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [enums_1.Role.ADMIN],
    }),
    (0, rest_1.del)(`${ADMIN_ENDPOINT}/{id}`),
    (0, rest_1.response)(204, {
        description: 'DayActivity DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], DayActivityController.prototype, "deleteDayActivity", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [enums_1.Role.ADMIN],
    }),
    (0, rest_1.put)(`${ADMIN_ENDPOINT}/{id}`),
    (0, rest_1.response)(204, {
        description: 'DayActivity PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.DayActivity]),
    tslib_1.__metadata("design:returntype", Promise)
], DayActivityController.prototype, "updateDayActivity", null);
tslib_1.__decorate([
    (0, rest_1.get)(ENDPOINT),
    (0, rest_1.response)(200, {
        description: 'Array of DayActivity model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.DayActivity, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], DayActivityController.prototype, "getAllDayActivities", null);
tslib_1.__decorate([
    (0, rest_1.get)(`${ENDPOINT}/{id}`),
    (0, rest_1.response)(200, {
        description: 'DayActivity model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.DayActivity, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], DayActivityController.prototype, "getDayActivity", null);
exports.DayActivityController = DayActivityController = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.service)(services_1.DayActivityService)),
    tslib_1.__metadata("design:paramtypes", [services_1.DayActivityService])
], DayActivityController);
//# sourceMappingURL=day-activity.controller.js.map