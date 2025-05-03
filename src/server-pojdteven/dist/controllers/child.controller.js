"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChildController = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const authentication_jwt_1 = require("@loopback/authentication-jwt");
const authorization_1 = require("@loopback/authorization");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const enums_1 = require("../enums");
const models_1 = require("../models");
const services_1 = require("../services");
const ENDPOINT = '/children';
const ADMIN_ENDPOINT = '/admin/children';
let ChildController = class ChildController {
    constructor(childService) {
        this.childService = childService;
    }
    // Create child
    async createChild(child) {
        return this.childService.createChild(child);
    }
    // Delete child
    async deleteChild(id) {
        await this.childService.deleteChild(id);
    }
    // Update child
    async updateChild(id, child) {
        await this.childService.updateChild(id, child);
    }
    // Get all children
    async getChildren() {
        return this.childService.getChildren();
    }
    // Get a child
    async getChild(id) {
        return this.childService.getChild(id);
    }
    // Get parents of the child
    async getChildParents(id) {
        return this.childService.getChildParents(id);
    }
    // Get all children who has attendance on gicen date
    async getChildrenWithAttendanceOnDate(date) {
        return this.childService.getChildrenWithAttendanceOnDate(date);
    }
};
exports.ChildController = ChildController;
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [enums_1.Role.ADMIN],
    }),
    (0, rest_1.post)(ADMIN_ENDPOINT),
    (0, rest_1.response)(200, {
        description: 'Child model instance',
        content: {
            'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Child) },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Child, {
                    title: 'NewChild',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ChildController.prototype, "createChild", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [enums_1.Role.ADMIN],
    }),
    (0, rest_1.del)(`${ADMIN_ENDPOINT}/{id}`),
    (0, rest_1.response)(204, {
        description: 'Delete Child instance success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ChildController.prototype, "deleteChild", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [enums_1.Role.ADMIN, enums_1.Role.USER],
    }),
    (0, rest_1.put)(`${ENDPOINT}/{id}`),
    (0, rest_1.response)(204, {
        description: 'update Child success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Child]),
    tslib_1.__metadata("design:returntype", Promise)
], ChildController.prototype, "updateChild", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [enums_1.Role.ADMIN, enums_1.Role.TEACHER],
    }),
    (0, rest_1.get)(ENDPOINT),
    (0, rest_1.response)(200, {
        description: 'Array of child model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Child, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ChildController.prototype, "getChildren", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: Object.values(enums_1.Role),
    }),
    (0, rest_1.get)(`${ENDPOINT}/{id}`),
    (0, rest_1.response)(200, {
        description: 'Child model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Child),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ChildController.prototype, "getChild", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: Object.values(enums_1.Role),
    }),
    (0, rest_1.get)(`${ENDPOINT}/{id}/parents`),
    (0, rest_1.response)(200, {
        description: 'Array User model instance',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(authentication_jwt_1.User, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ChildController.prototype, "getChildParents", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [enums_1.Role.TEACHER, enums_1.Role.ADMIN],
    }),
    (0, rest_1.get)(`${ENDPOINT}/attendanceOnDate`),
    (0, rest_1.response)(200, {
        description: 'Array of Child model instances that has attendance on given date.',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Child),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.query.string('date')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ChildController.prototype, "getChildrenWithAttendanceOnDate", null);
exports.ChildController = ChildController = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.service)(services_1.ChildService)),
    tslib_1.__metadata("design:paramtypes", [services_1.ChildService])
], ChildController);
//# sourceMappingURL=child.controller.js.map