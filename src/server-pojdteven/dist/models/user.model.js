"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const enums_1 = require("../enums");
const address_model_1 = require("./address.model");
const attendance_model_1 = require("./attendance.model");
const child_model_1 = require("./child.model");
const parenthood_model_1 = require("./parenthood.model");
const user_credentials_model_1 = require("./user-credentials.model");
let User = class User extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.User = User;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        id: true,
        generated: false,
        defaultFn: 'uuidv4',
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        index: {
            unique: true,
        },
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        jsonSchema: {
            enum: Object.values(enums_1.Role),
        },
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "role", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "fullName", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: false,
        mysql: {
            dataTaype: 'date',
        },
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "dateOfBirth", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "imagePath", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        mysql: {
            dataType: 'LONGTEXT',
        },
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "description", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "academicTitle", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", Object)
], User.prototype, "resetPasswordToken", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", Object)
], User.prototype, "dateOfLastResetPasswordRequest", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "note", void 0);
tslib_1.__decorate([
    (0, repository_1.hasOne)(() => user_credentials_model_1.UserCredentials),
    tslib_1.__metadata("design:type", user_credentials_model_1.UserCredentials)
], User.prototype, "userCredentials", void 0);
tslib_1.__decorate([
    (0, repository_1.hasOne)(() => address_model_1.Address),
    tslib_1.__metadata("design:type", address_model_1.Address)
], User.prototype, "address", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => child_model_1.Child, { through: { model: () => parenthood_model_1.Parenthood } }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "children", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => attendance_model_1.Attendance),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "attendanceItems", void 0);
exports.User = User = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], User);
//# sourceMappingURL=user.model.js.map