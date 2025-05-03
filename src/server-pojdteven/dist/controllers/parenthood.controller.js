"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParenthoodController = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const authorization_1 = require("@loopback/authorization");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const enums_1 = require("../enums");
const models_1 = require("../models");
const services_1 = require("../services");
const ADMIN_ENDPOINT = '/admin/parenthood';
let ParenthoodController = class ParenthoodController {
    constructor(parenthoodService) {
        this.parenthoodService = parenthoodService;
    }
    // Create realtionship
    async createParenthood(parenthood) {
        return this.parenthoodService.createParenthood(parenthood);
    }
    // Delete parenthood
    async deleteParenthood(id) {
        await this.parenthoodService.deleteParenthood(id);
    }
    async getAllParenthoodItems() {
        return this.parenthoodService.getAllParenthoodItems();
    }
    async getUserParenthoodItems(userId) {
        return this.parenthoodService.getUserParenthoodItems(userId);
    }
};
exports.ParenthoodController = ParenthoodController;
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [enums_1.Role.ADMIN],
    }),
    (0, rest_1.post)(ADMIN_ENDPOINT),
    (0, rest_1.response)(200, {
        description: 'Parenthood model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Parenthood) } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Parenthood, {
                    title: 'NewParenthood',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ParenthoodController.prototype, "createParenthood", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [enums_1.Role.ADMIN],
    }),
    (0, rest_1.del)(`${ADMIN_ENDPOINT}/{id}`),
    (0, rest_1.response)(204, {
        description: 'Parenthood DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ParenthoodController.prototype, "deleteParenthood", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [enums_1.Role.ADMIN],
    }),
    (0, rest_1.get)(ADMIN_ENDPOINT),
    (0, rest_1.response)(200, {
        description: 'Array of Parenthood model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Parenthood),
                },
            },
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ParenthoodController.prototype, "getAllParenthoodItems", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [enums_1.Role.ADMIN],
    }),
    (0, rest_1.get)(ADMIN_ENDPOINT),
    (0, rest_1.response)(200, {
        description: 'Array of Parenthood model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Parenthood),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.query.string('userId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ParenthoodController.prototype, "getUserParenthoodItems", null);
exports.ParenthoodController = ParenthoodController = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.service)(services_1.ParenthoodService)),
    tslib_1.__metadata("design:paramtypes", [services_1.ParenthoodService])
], ParenthoodController);
//# sourceMappingURL=parenthood.controller.js.map