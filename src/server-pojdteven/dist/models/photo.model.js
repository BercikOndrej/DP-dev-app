"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Photo = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const PhotoTag_1 = require("../enums/PhotoTag");
let Photo = class Photo extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.Photo = Photo;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        id: true,
        generated: false,
        defaultFn: 'uuidv4',
    }),
    tslib_1.__metadata("design:type", String)
], Photo.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        default: Date.now(),
    }),
    tslib_1.__metadata("design:type", Date)
], Photo.prototype, "existsFrom", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Photo.prototype, "imagePath", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        jsonSchema: {
            enum: Object.values(PhotoTag_1.PhotoTag),
        },
    }),
    tslib_1.__metadata("design:type", String)
], Photo.prototype, "tag", void 0);
exports.Photo = Photo = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Photo);
//# sourceMappingURL=photo.model.js.map