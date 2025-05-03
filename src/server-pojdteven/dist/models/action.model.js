"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Action = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Action = class Action extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.Action = Action;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        id: true,
        generated: false,
        defaultFn: 'uuidv4',
    }),
    tslib_1.__metadata("design:type", String)
], Action.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        default: '',
    }),
    tslib_1.__metadata("design:type", String)
], Action.prototype, "imagePath", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        default: Date.now(),
    }),
    tslib_1.__metadata("design:type", Date)
], Action.prototype, "existsFrom", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Action.prototype, "note", void 0);
exports.Action = Action = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Action);
//# sourceMappingURL=action.model.js.map