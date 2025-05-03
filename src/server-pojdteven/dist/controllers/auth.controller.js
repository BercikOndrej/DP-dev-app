"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const services_1 = require("../services");
const ENDPOINT = '/auth';
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    // Forgot password request
    async forgotPassword(request) {
        await this.authService.fotgotPassword(request.email);
    }
    // Reset password request
    async resetPassword(token, request) {
        await this.authService.resetPassword(token, request.password);
    }
};
exports.AuthController = AuthController;
tslib_1.__decorate([
    (0, rest_1.post)(`${ENDPOINT}/forgotPassword`),
    (0, rest_1.response)(204, {
        description: 'Request of forgotten password success',
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        description: 'email of user who forgot password',
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        email: {
                            type: 'string',
                            format: 'email',
                        },
                    },
                },
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
tslib_1.__decorate([
    (0, rest_1.put)(`${ENDPOINT}/resetPassword/{token}`),
    (0, rest_1.response)(204, {
        description: 'Reset password success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('token')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        description: 'new password',
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        password: {
                            type: 'string',
                        },
                    },
                },
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
exports.AuthController = AuthController = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.service)(services_1.AuthService)),
    tslib_1.__metadata("design:paramtypes", [services_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map