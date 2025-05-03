"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralInfo = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const PageType_1 = require("../enums/PageType");
let GeneralInfo = class GeneralInfo extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.GeneralInfo = GeneralInfo;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", Number)
], GeneralInfo.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], GeneralInfo.prototype, "title", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        mysql: {
            dataType: 'LONGTEXT',
        },
    }),
    tslib_1.__metadata("design:type", String)
], GeneralInfo.prototype, "content", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        default: '',
        jsonSchema: {
            enum: Object.values(PageType_1.PageType),
        },
    }),
    tslib_1.__metadata("design:type", String)
], GeneralInfo.prototype, "page", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], GeneralInfo.prototype, "position", void 0);
exports.GeneralInfo = GeneralInfo = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], GeneralInfo);
//# sourceMappingURL=general-info.model.js.map