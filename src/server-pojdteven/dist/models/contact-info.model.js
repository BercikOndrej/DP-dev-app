"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactInfo = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let ContactInfo = class ContactInfo extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.ContactInfo = ContactInfo;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", Number)
], ContactInfo.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], ContactInfo.prototype, "fullName", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], ContactInfo.prototype, "email", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], ContactInfo.prototype, "phoneNumber", void 0);
exports.ContactInfo = ContactInfo = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], ContactInfo);
//# sourceMappingURL=contact-info.model.js.map