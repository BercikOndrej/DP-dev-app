"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotoController = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const authorization_1 = require("@loopback/authorization");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const enums_1 = require("../enums");
const models_1 = require("../models");
const services_1 = require("../services");
const ENDPOINT = '/photos';
const ADMIN_ENDPOINT = '/admin/photos';
let PhotoController = class PhotoController {
    constructor(photoService) {
        this.photoService = photoService;
    }
    // Create photo
    async createPhoto(request, tag) {
        return this.photoService.createPhoto(request, tag);
    }
    // Delete photo
    async deletePhoto(id) {
        await this.photoService.deletePhoto(id);
    }
    // Get photo
    async getPhoto(id) {
        return this.photoService.getPhoto(id);
    }
    // Get all photos
    async getPhotos(tag) {
        return this.photoService.getPhotos(tag);
    }
};
exports.PhotoController = PhotoController;
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [enums_1.Role.ADMIN],
    }),
    (0, rest_1.post)(ADMIN_ENDPOINT),
    (0, rest_1.response)(200, {
        description: 'Photo model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Photo) } },
    }),
    tslib_1.__param(0, rest_1.requestBody.file()),
    tslib_1.__param(1, rest_1.param.query.string('tag')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String]),
    tslib_1.__metadata("design:returntype", Promise)
], PhotoController.prototype, "createPhoto", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [enums_1.Role.ADMIN],
    }),
    (0, rest_1.del)(`${ADMIN_ENDPOINT}/{id}`),
    (0, rest_1.response)(204, {
        description: 'Photo DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], PhotoController.prototype, "deletePhoto", null);
tslib_1.__decorate([
    (0, rest_1.get)(`${ENDPOINT}/{id}`),
    (0, rest_1.response)(200, {
        description: 'Photo model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Photo, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], PhotoController.prototype, "getPhoto", null);
tslib_1.__decorate([
    (0, rest_1.get)(ENDPOINT),
    (0, rest_1.response)(200, {
        description: 'Array of Photo model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Photo, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.query.string('tag')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], PhotoController.prototype, "getPhotos", null);
exports.PhotoController = PhotoController = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.service)(services_1.PhotoService)),
    tslib_1.__metadata("design:paramtypes", [services_1.PhotoService])
], PhotoController);
//# sourceMappingURL=photo.controller.js.map