"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sponsor = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Sponsor = class Sponsor extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.Sponsor = Sponsor;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        id: true,
        generated: false,
        defaultFn: 'uuidv4',
    }),
    tslib_1.__metadata("design:type", String)
], Sponsor.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Sponsor.prototype, "name", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Sponsor.prototype, "imagePath", void 0);
exports.Sponsor = Sponsor = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Sponsor);
//# sourceMappingURL=sponsor.model.js.map