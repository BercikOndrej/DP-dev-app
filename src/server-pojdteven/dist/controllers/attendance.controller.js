"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceController = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const authorization_1 = require("@loopback/authorization");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const enums_1 = require("../enums");
const models_1 = require("../models");
const services_1 = require("../services");
const GENERAL_ENDPOINT = '/attendance';
const ADMIN_GENERAL_ENDPOINT = '/admin/attendance';
const CHILD_ATTENDANCE_ENDPOINT = '/attendance/child';
const ADMIN_CHILD_ATTENDANCE_ENDPOINT = '/admin/attendance/child';
const TEACHER_ATTENDANCE_ENDPOINT = '/attendance/teacher';
const ADMIN_TEACHER_ATTENDANCE_ENDPOINT = '/admin/attendance/teacher';
let AttendanceController = class AttendanceController {
    constructor(attendanceService) {
        this.attendanceService = attendanceService;
    }
    // General methods
    // ----------------------------------------------------------------------
    // Create attendance
    async createAttendance(att) {
        return this.attendanceService.createAttendance(att);
    }
    // Delete attendence
    async deleteAttendance(id) {
        await this.attendanceService.deleteAttendance(id);
    }
    async deleteAllAttendanceItemsOlderThanYear() {
        await this.attendanceService.deleteAllAttendanceItemsOlderThanYear();
    }
    // Get attendance
    async getAttendance(id) {
        return this.attendanceService.getAttendance(id);
    }
    // Find attendance
    async findAttendance(userId, dateStr) {
        return this.attendanceService.findAttendance(userId, dateStr);
    }
    // Get many attendance items
    async getAllAttendanceItems() {
        return this.attendanceService.getAllAttendanceItems();
    }
    // Get all attendance items that exist on given date
    async getAllAttendanceItemsOnDate(date) {
        return this.attendanceService.getAllAttendanceItemsOnDate(date);
    }
    // Methods for child attendance
    // ----------------------------------------------------------------------
    // Create many attendance items for a child from given date to given date. Dates are dependet on child school days
    async createManyChildAttendanceItemsBySchoolDays(data) {
        return this.attendanceService.createManyChildAttendanceItemsBySchoolDays(data.childId, data.from, data.to);
    }
    async deleteAllAttendanceItemsOfChild(childId) {
        await this.attendanceService.deleteAllAttendanceItemsOfChild(childId);
    }
    async deleteAllAttendanceItemsOfChildFromToday(childId) {
        await this.attendanceService.deleteAllAttendanceItemsOfChildFromToday(childId);
    }
    // Get all normal attendance items of the child in given month (zero indexed)
    // This method is used to show all attendance items in calendar on FE
    async getAllNormalAttendanceItemsOfChildInMonth(childId, month) {
        return this.attendanceService.getAllNormalAttendanceItemsOfChildInMonth(childId, month);
    }
    // Get count of all alternative attendance items of the child
    // Thanks to this function we know how much attendance may write down
    async getCountOfAllAlternativeAttendanceItemsOfChild(childId) {
        return this.attendanceService.getCountOfAllAlternativeAttendanceOfChild(childId);
    }
    // Enroll new normal attendace for a child
    // It can happend only if child have some alternative attendace
    async enrollNewNormalAttendanceOfChild(att) {
        return this.attendanceService.enrollNewNormalAttendanceOfChild(att);
    }
    // Unroll normal attendace of the child
    // When child unroll attendance he get alternative attendance and thanks to that it can enroll new normal attendance
    async unrollAttendanceOfChild(id) {
        await this.attendanceService.unrollAttendanceOfChild(id);
    }
    // Methods for user/teacher attendance
    // ----------------------------------------------------------------------
    // Create many user attendance items for teacher based on given dates
    async createAttendanceItemsOfUser(data) {
        return this.attendanceService.createAttendanceItemsOfUser(data.userId, data.dates);
    }
    // Delete all user attendance items
    async deleteAllAttendanceItemsOfUser(userId) {
        await this.attendanceService.deleteAllAttendanceItemsOfUser(userId);
    }
    // Get all attendance items of all teachers in given month
    async getAllAttendanceItemsOfTeachersInMonth(month) {
        return this.attendanceService.getAllAttendanceItemsOfAllTeachersInMonth(month);
    }
    // Change teacher attendance
    async changeTeacherAttendance(data) {
        return this.attendanceService.changeTeacherAttendance(data);
    }
};
exports.AttendanceController = AttendanceController;
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [enums_1.Role.ADMIN],
    }),
    (0, rest_1.post)(ADMIN_GENERAL_ENDPOINT),
    (0, rest_1.response)(200, {
        description: 'Attendance model instance',
        content: {
            'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Attendance) },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Attendance, {
                    title: 'NewAttendance',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AttendanceController.prototype, "createAttendance", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [enums_1.Role.ADMIN],
    }),
    (0, rest_1.del)(`${ADMIN_GENERAL_ENDPOINT}/{id}`),
    (0, rest_1.response)(204, {
        description: 'Delete Attendance instance success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], AttendanceController.prototype, "deleteAttendance", null);
tslib_1.__decorate([
    (0, rest_1.del)(`${GENERAL_ENDPOINT}/delete/olderThanYear`),
    (0, rest_1.response)(200, {
        description: 'Delete Attendance instance items older than one year',
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], AttendanceController.prototype, "deleteAllAttendanceItemsOlderThanYear", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: Object.values(enums_1.Role),
    }),
    (0, rest_1.get)(`${GENERAL_ENDPOINT}/{id}`),
    (0, rest_1.response)(200, {
        description: 'Attendance model instance',
        content: {
            'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Attendance) },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], AttendanceController.prototype, "getAttendance", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [enums_1.Role.ADMIN],
    }),
    (0, rest_1.get)(`${ADMIN_GENERAL_ENDPOINT}/find`),
    (0, rest_1.response)(200, {
        description: "Attendance model instance or null if attendance doesn't exist.",
        content: {
            'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Attendance) },
        },
    }),
    tslib_1.__param(0, rest_1.param.query.string('userId')),
    tslib_1.__param(1, rest_1.param.query.string('dateStr')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], AttendanceController.prototype, "findAttendance", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: Object.values(enums_1.Role),
    }),
    (0, rest_1.get)(GENERAL_ENDPOINT),
    (0, rest_1.response)(200, {
        description: 'Array Attendance model instance',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Attendance),
                },
            },
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], AttendanceController.prototype, "getAllAttendanceItems", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [enums_1.Role.ADMIN, enums_1.Role.TEACHER],
    }),
    (0, rest_1.get)(`${GENERAL_ENDPOINT}/onDate`),
    (0, rest_1.response)(200, {
        description: 'Array Attendance model instance that exists on given date',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Attendance),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.query.string('date')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], AttendanceController.prototype, "getAllAttendanceItemsOnDate", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [enums_1.Role.ADMIN],
    }),
    (0, rest_1.post)(`${ADMIN_CHILD_ATTENDANCE_ENDPOINT}`),
    (0, rest_1.response)(200, {
        description: 'Array Attendance model instances created based on school days of the child',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Attendance),
                },
            },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        description: 'Dates for creating Attendance model instances and id of the child for relation',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        childId: {
                            type: 'string',
                        },
                        from: {
                            type: 'string',
                            format: 'date',
                        },
                        to: {
                            type: 'string',
                            format: 'date',
                        },
                    },
                },
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AttendanceController.prototype, "createManyChildAttendanceItemsBySchoolDays", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [enums_1.Role.ADMIN],
    })
    // Delete all attendance items of the child
    // This method is used in deleting child
    ,
    (0, rest_1.del)(`${ADMIN_CHILD_ATTENDANCE_ENDPOINT}/{childId}/items`),
    (0, rest_1.response)(204, {
        description: 'Delete all Attendance instance of the child success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('childId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], AttendanceController.prototype, "deleteAllAttendanceItemsOfChild", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [enums_1.Role.ADMIN],
    })
    // Delete all attendance items of the child from today date
    // This method is used in changing school days of the child
    ,
    (0, rest_1.del)(`${CHILD_ATTENDANCE_ENDPOINT}/{childId}/items/fromToday`),
    (0, rest_1.response)(204, {
        description: 'Delete all Attendance instance of the child from today date success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('childId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], AttendanceController.prototype, "deleteAllAttendanceItemsOfChildFromToday", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: Object.values(enums_1.Role),
    }),
    (0, rest_1.get)(`${CHILD_ATTENDANCE_ENDPOINT}/{childId}/normal/items`),
    (0, rest_1.response)(200, {
        description: 'Array Attendace model instance of the child',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Attendance),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('childId')),
    tslib_1.__param(1, rest_1.param.query.number('month')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], AttendanceController.prototype, "getAllNormalAttendanceItemsOfChildInMonth", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: Object.values(enums_1.Role),
    }),
    (0, rest_1.get)(`${CHILD_ATTENDANCE_ENDPOINT}/{childId}/alternative/count`),
    (0, rest_1.response)(200, {
        description: 'Count of the alternative attendance items of the child',
        content: {
            'application/json': {
                schema: repository_1.CountSchema,
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('childId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], AttendanceController.prototype, "getCountOfAllAlternativeAttendanceItemsOfChild", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [enums_1.Role.USER, enums_1.Role.ADMIN],
    }),
    (0, rest_1.post)(`${CHILD_ATTENDANCE_ENDPOINT}/enroll`),
    (0, rest_1.response)(200, {
        description: 'Attendance model instance',
        content: {
            'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Attendance) },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Attendance, {
                    title: 'NewAttendance',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AttendanceController.prototype, "enrollNewNormalAttendanceOfChild", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [enums_1.Role.USER, enums_1.Role.ADMIN],
    }),
    (0, rest_1.patch)(`${CHILD_ATTENDANCE_ENDPOINT}/{id}/unroll`),
    (0, rest_1.response)(204, {
        description: 'Instance of Attendance model PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], AttendanceController.prototype, "unrollAttendanceOfChild", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [enums_1.Role.ADMIN],
    }),
    (0, rest_1.post)(`${ADMIN_TEACHER_ATTENDANCE_ENDPOINT}`),
    (0, rest_1.response)(200, {
        description: 'Array Attendandce model instances of user,',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Attendance),
                },
            },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        description: 'Date for creating attendance items and id representing a user',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        userId: {
                            type: 'string',
                        },
                        dates: {
                            type: 'array',
                            items: {
                                type: 'string',
                                format: 'date',
                            },
                        },
                    },
                },
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AttendanceController.prototype, "createAttendanceItemsOfUser", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [enums_1.Role.ADMIN],
    }),
    (0, rest_1.del)(`${ADMIN_TEACHER_ATTENDANCE_ENDPOINT}/{userId}`),
    (0, rest_1.response)(204, {
        description: 'Instances of Attendance model of given user DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('userId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], AttendanceController.prototype, "deleteAllAttendanceItemsOfUser", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [enums_1.Role.TEACHER, enums_1.Role.ADMIN],
    }),
    (0, rest_1.get)(`${TEACHER_ATTENDANCE_ENDPOINT}/{userId}`),
    (0, rest_1.response)(200, {
        description: 'Array Attendandce model instances of user,',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Attendance),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.query.number('month')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], AttendanceController.prototype, "getAllAttendanceItemsOfTeachersInMonth", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [enums_1.Role.ADMIN],
    }),
    (0, rest_1.post)(`${ADMIN_TEACHER_ATTENDANCE_ENDPOINT}/change`),
    (0, rest_1.response)(200, {
        description: 'Instance of Attendance model',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Attendance),
            },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        description: 'Needed date for attendance switch',
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        originTeacherId: {
                            type: 'string',
                        },
                        nextTeacherId: {
                            type: 'string',
                        },
                        dateStr: {
                            type: 'string',
                        },
                        isPickUp: {
                            type: 'boolean',
                        },
                    },
                },
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AttendanceController.prototype, "changeTeacherAttendance", null);
exports.AttendanceController = AttendanceController = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.service)(services_1.AttendanceService)),
    tslib_1.__metadata("design:paramtypes", [services_1.AttendanceService])
], AttendanceController);
//# sourceMappingURL=attendance.controller.js.map