"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parenthood = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Parenthood = class Parenthood extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.Parenthood = Parenthood;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        id: true,
        generated: false,
        defaultFn: 'uuidv4',
    }),
    tslib_1.__metadata("design:type", String)
], Parenthood.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Parenthood.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Parenthood.prototype, "childId", void 0);
exports.Parenthood = Parenthood = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Parenthood);
//# sourceMappingURL=parenthood.model.js.map