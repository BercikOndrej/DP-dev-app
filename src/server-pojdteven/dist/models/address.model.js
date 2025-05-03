"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Address = class Address extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.Address = Address;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Address.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Address.prototype, "street", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Address.prototype, "houseNumber", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Address.prototype, "city", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Address.prototype, "zipCode", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Address.prototype, "note", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Address.prototype, "userId", void 0);
exports.Address = Address = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Address);
//# sourceMappingURL=address.model.js.map