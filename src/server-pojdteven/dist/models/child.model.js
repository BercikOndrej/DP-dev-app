"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Child = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const attendance_model_1 = require("./attendance.model");
const parenthood_model_1 = require("./parenthood.model");
const user_model_1 = require("./user.model");
let Child = class Child extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.Child = Child;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        id: true,
        generated: false,
        defaultFn: 'uuidv4',
    }),
    tslib_1.__metadata("design:type", String)
], Child.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Child.prototype, "fullName", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        mysql: {
            dataType: 'date',
        },
    }),
    tslib_1.__metadata("design:type", String)
], Child.prototype, "dateOfBirth", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Child.prototype, "description", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Child.prototype, "monthlyFee", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Child.prototype, "schoolDays", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Child.prototype, "note", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => user_model_1.User, { through: { model: () => parenthood_model_1.Parenthood } }),
    tslib_1.__metadata("design:type", Array)
], Child.prototype, "users", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => attendance_model_1.Attendance),
    tslib_1.__metadata("design:type", Array)
], Child.prototype, "attendanceItems", void 0);
exports.Child = Child = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Child);
//# sourceMappingURL=child.model.js.map