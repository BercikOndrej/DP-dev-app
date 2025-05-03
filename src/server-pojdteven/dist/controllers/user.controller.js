"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = exports.CredentialsRequestBody = exports.NewUserRequestBody = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const authentication_jwt_1 = require("@loopback/authentication-jwt");
const authorization_1 = require("@loopback/authorization");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const security_1 = require("@loopback/security");
const enums_1 = require("../enums");
const models_1 = require("../models");
const services_1 = require("../services");
const ENDPOINT = '/users';
const ADMIN_ENDPOINT = '/admin/users';
// Must be here because loopback has wrong reference for User and include relations
const UserWithAddressSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
        },
        email: {
            type: 'string',
            format: 'email',
        },
        role: {
            type: 'string',
        },
        fullName: {
            type: 'string',
        },
        dateOfBirth: {
            type: 'string',
        },
        description: {
            type: 'string',
        },
        academicTitle: {
            type: 'string',
        },
        phoneNumber: {
            type: 'string',
        },
        address: {
            type: 'object',
            required: ['houseNumber', 'city', 'zip'],
            properties: {
                id: {
                    type: 'string',
                },
                street: {
                    type: 'string',
                },
                houseNumber: {
                    type: 'string',
                },
                city: {
                    type: 'string',
                },
                zipCode: {
                    type: 'string',
                },
                note: {
                    type: 'string',
                },
            },
        },
        note: {
            type: 'string',
        },
        password: {
            type: 'string',
        },
    },
};
const NewUserSchema = {
    type: 'object',
    required: ['email', 'role', 'fullName', 'phoneNumber', 'address', 'password'],
    properties: {
        email: {
            type: 'string',
            format: 'email',
        },
        role: {
            type: 'string',
        },
        fullName: {
            type: 'string',
        },
        dateOfBirth: {
            type: 'string',
        },
        description: {
            type: 'string',
        },
        academicTitle: {
            type: 'string',
        },
        phoneNumber: {
            type: 'string',
        },
        address: {
            type: 'object',
            required: ['houseNumber', 'city', 'zip'],
            properties: {
                street: {
                    type: 'string',
                },
                houseNumber: {
                    type: 'string',
                },
                city: {
                    type: 'string',
                },
                zipCode: {
                    type: 'string',
                },
                note: {
                    type: 'string',
                },
            },
        },
        note: {
            type: 'string',
        },
        password: {
            type: 'string',
        },
    },
};
exports.NewUserRequestBody = {
    description: 'Data for signup user',
    required: true,
    content: {
        'application/json': { schema: NewUserSchema },
    },
};
const CredentialsSchema = {
    type: 'object',
    required: ['email', 'password'],
    properties: {
        email: {
            type: 'string',
            format: 'email',
        },
        password: {
            type: 'string',
        },
    },
};
exports.CredentialsRequestBody = {
    description: 'The input of login function',
    required: true,
    content: {
        'application/json': { schema: CredentialsSchema },
    },
};
let UserController = class UserController {
    constructor(userService, user) {
        this.userService = userService;
        this.user = user;
    }
    // Testing -> populate DB
    // @authenticate('jwt')
    // @authorize({
    //   allowedRoles: [Role.ADMIN],
    // })
    // @post(`${ADMIN_ENDPOINT}/dev/testData`)
    // async populateDb() {
    //   for (const teacher of teachers) {
    //     await this.userService.signup(teacher);
    //   }
    // }
    // Clasic CRUD operation
    // ---------------------------------------------------------------------
    // Delete user
    async deleteUser(id) {
        await this.userService.deleteUser(id);
    }
    // Upload image for user
    async uploadUserImage(request, id) {
        await this.userService.uploadUserImage(request, id);
    }
    // Update user
    async updateUser(id, user) {
        await this.userService.updateUser(id, user);
    }
    // Update user address
    async updateUserAddress(id, address) {
        await this.userService.updateUserAddress(id, address);
    }
    // Change user password
    async changeUserPassword(id, passwords) {
        await this.userService.changeUserPassword(id, passwords.actualPassword, passwords.newPassword);
    }
    // Get user
    async getUser(id) {
        return this.userService.getUser(id);
    }
    // Get all users
    async getUsers() {
        return this.userService.getUsers();
    }
    // Get only teachers
    async getTeachers() {
        return this.userService.getTeachers();
    }
    // Get user children
    async getChidren(id) {
        return this.userService.getChildren(id);
    }
    // Get teachers with attendance on given date
    async getWorkingTeachersOnDate(date) {
        return this.userService.getWorkingTeachersOnDate(date);
    }
    // User functions
    // ------------------------------------------------------------------------
    // Login function
    async login(credentials) {
        return this.userService.login(credentials);
    }
    // Function for geting information about current user
    async whoAmI(currentUserProfile) {
        // Now I just returned only id of user, but you can return all user profile
        return this.userService.whoAmI(currentUserProfile);
    }
    // Function for sign up a user
    async signup(newUserRequest) {
        return this.userService.signup(newUserRequest);
    }
};
exports.UserController = UserController;
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [enums_1.Role.ADMIN],
    }),
    (0, rest_1.del)(`${ADMIN_ENDPOINT}/{id}`),
    (0, rest_1.response)(204, {
        description: 'User DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [enums_1.Role.ADMIN, enums_1.Role.TEACHER],
    }),
    (0, rest_1.post)(`${ENDPOINT}/{id}/imageUpload`),
    (0, rest_1.response)(204, {
        description: 'Upload user image success',
    }),
    tslib_1.__param(0, rest_1.requestBody.file()),
    tslib_1.__param(1, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "uploadUserImage", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: Object.values(enums_1.Role),
    }),
    (0, rest_1.put)(`${ENDPOINT}/{id}`),
    (0, rest_1.response)(204, {
        description: 'User PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.User]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: Object.values(enums_1.Role),
    }),
    (0, rest_1.put)(`${ENDPOINT}/{id}/address`),
    (0, rest_1.response)(204, {
        description: 'User PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Address]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "updateUserAddress", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: Object.values(enums_1.Role),
    }),
    (0, rest_1.patch)(`${ENDPOINT}/{id}/changePassword`),
    (0, rest_1.response)(204, {
        description: 'Change and save user password SUCCESS.',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "changeUserPassword", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: Object.values(enums_1.Role),
    }),
    (0, rest_1.get)(`${ENDPOINT}/{id}`),
    (0, rest_1.response)(200, {
        description: 'User model instance',
        content: {
            'application/json': {
                schema: UserWithAddressSchema,
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [enums_1.Role.ADMIN],
    }),
    (0, rest_1.get)(ADMIN_ENDPOINT),
    (0, rest_1.response)(200, {
        description: 'Array of User model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: UserWithAddressSchema,
                },
            },
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
tslib_1.__decorate([
    (0, rest_1.get)(`${ENDPOINT}/teachers`),
    (0, rest_1.response)(200, {
        description: 'Array of User model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.User),
                },
            },
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "getTeachers", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: Object.values(enums_1.Role),
    }),
    (0, rest_1.get)(`${ENDPOINT}/{id}/children`),
    (0, rest_1.response)(200, {
        description: 'Array of Child model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Child),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "getChidren", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: Object.values(enums_1.Role),
    }),
    (0, rest_1.get)(`${ENDPOINT}/teachers/onDate`),
    (0, rest_1.response)(200, {
        description: 'Array of User model instances that works on given date.',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.User),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.query.string('date')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "getWorkingTeachersOnDate", null);
tslib_1.__decorate([
    (0, rest_1.post)(`${ENDPOINT}/login`, {
        responses: {
            '200': {
                description: 'Token',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                token: {
                                    type: 'string',
                                },
                            },
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)(exports.CredentialsRequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: Object.values(enums_1.Role),
    }),
    (0, rest_1.get)(`${ENDPOINT}/whoAmI`, {
        responses: {
            '200': {
                description: 'Return current user',
                content: {
                    'application/json': {
                        schema: {
                            type: 'string',
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, (0, core_1.inject)(security_1.SecurityBindings.USER)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "whoAmI", null);
tslib_1.__decorate([
    (0, rest_1.post)(`${ENDPOINT}/signup`, {
        responses: {
            '200': {
                description: 'User',
                content: {
                    'application/json': {
                        schema: {
                            'x-ts-type': models_1.User,
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)(exports.NewUserRequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "signup", null);
exports.UserController = UserController = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)(authentication_jwt_1.UserServiceBindings.USER_SERVICE)),
    tslib_1.__param(1, (0, core_1.inject)(security_1.SecurityBindings.USER, { optional: true })),
    tslib_1.__metadata("design:paramtypes", [services_1.MyUserService, Object])
], UserController);
//# sourceMappingURL=user.controller.js.map