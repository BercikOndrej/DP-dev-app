"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionController = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const authorization_1 = require("@loopback/authorization");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const enums_1 = require("../enums");
const models_1 = require("../models");
const services_1 = require("../services");
const ENDPOINT = '/actions';
const ADMIN_ENDPOINT = '/admin/actions';
let ActionController = class ActionController {
    constructor(actionService) {
        this.actionService = actionService;
    }
    // Create Action
    async createAction(request) {
        return this.actionService.createAction(request);
    }
    async getActions() {
        return this.actionService.getActions();
    }
    async getAction(id) {
        return this.actionService.getAction(id);
    }
    async deleteAction(id) {
        await this.actionService.deleteAction(id);
    }
};
exports.ActionController = ActionController;
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [enums_1.Role.ADMIN],
    }),
    (0, rest_1.post)(ADMIN_ENDPOINT),
    (0, rest_1.response)(200, {
        description: 'Action model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Action) } },
    }),
    tslib_1.__param(0, rest_1.requestBody.file()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ActionController.prototype, "createAction", null);
tslib_1.__decorate([
    (0, rest_1.get)(ENDPOINT),
    (0, rest_1.response)(200, {
        description: 'Array of Action model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Action, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ActionController.prototype, "getActions", null);
tslib_1.__decorate([
    (0, rest_1.get)(`${ENDPOINT}/{id}`),
    (0, rest_1.response)(200, {
        description: 'Action model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Action, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ActionController.prototype, "getAction", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [enums_1.Role.ADMIN],
    }),
    (0, rest_1.del)(`${ADMIN_ENDPOINT}/{id}`),
    (0, rest_1.response)(204, {
        description: 'Action DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ActionController.prototype, "deleteAction", null);
exports.ActionController = ActionController = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.service)(services_1.ActionService)),
    tslib_1.__metadata("design:paramtypes", [services_1.ActionService])
], ActionController);
//# sourceMappingURL=action.controller.js.map