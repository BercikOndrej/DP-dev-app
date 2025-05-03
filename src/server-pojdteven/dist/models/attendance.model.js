"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attendance = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const enums_1 = require("../enums");
let Attendance = class Attendance extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.Attendance = Attendance;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        id: true,
        generated: false,
        defaultFn: 'uuidv4',
    }),
    tslib_1.__metadata("design:type", String)
], Attendance.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        mysql: {
            dataType: 'date',
        },
    }),
    tslib_1.__metadata("design:type", String)
], Attendance.prototype, "date", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        jsonSchema: {
            enum: Object.values(enums_1.AttendanceTag),
        },
    }),
    tslib_1.__metadata("design:type", String)
], Attendance.prototype, "tag", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        mysql: {
            dataType: 'tinyint',
        },
    }),
    tslib_1.__metadata("design:type", Boolean)
], Attendance.prototype, "pickUp", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Attendance.prototype, "childId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Attendance.prototype, "userId", void 0);
exports.Attendance = Attendance = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Attendance);
//# sourceMappingURL=attendance.model.js.map