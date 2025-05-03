"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotoService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const zod_1 = tslib_1.__importDefault(require("zod"));
const enums_1 = require("../enums");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const file_upload_service_1 = require("./file-upload.service");
const thumbnail_1 = require("../utils/thumbnail");
const STATIC_FILES_PHOTOGALLERY_PATH = 'static/photogallery/';
const STATIC_FILES_THUMBNAILS_PATH = 'static/thumbnails/';
let PhotoService = class PhotoService {
    constructor(photoRepo, fileUploadService) {
        this.photoRepo = photoRepo;
        this.fileUploadService = fileUploadService;
    }
    // Create photo object
    async createPhoto(request, tag) {
        this.validatePhotoTag(tag);
        let photo = new models_1.Photo();
        photo.tag = tag;
        photo = await this.photoRepo.create(photo);
        const fileName = `photo-${photo.id}`;
        try {
            const files = await this.fileUploadService.processFileUpload(request, STATIC_FILES_PHOTOGALLERY_PATH, fileName, true);
            photo.imagePath = STATIC_FILES_PHOTOGALLERY_PATH + files[0].filename;
            // Create a thumbnail for a photo
            await this.photoRepo.updateById(photo.id, photo);
            (0, thumbnail_1.createThumbnail)(files[0].filename);
        }
        catch (error) {
            await this.deletePhoto(photo.id);
            throw rest_1.HttpErrors.BadRequest(`Chyba při načítání obrázků: ${error}.`);
        }
        return photo;
    }
    // Update photo
    async updatePhoto(id, photo) {
        await this.photoRepo.updateById(id, photo);
    }
    // Delete photo
    async deletePhoto(id) {
        if (!(await this.photoRepo.exists(id))) {
            throw rest_1.HttpErrors.NotFound('Foto nebylo nalezeno.');
        }
        const photoRegex = new RegExp(`^photo-${id}\\.[a-zA-Z]+$`);
        const thumbnailRegex = new RegExp(`^thumbnail-${id}\\.[a-zA-Z]+$`);
        // Delete photo
        await this.fileUploadService.deleteFile(photoRegex, STATIC_FILES_PHOTOGALLERY_PATH);
        // Delete thumbnail
        await this.fileUploadService.deleteFile(thumbnailRegex, STATIC_FILES_THUMBNAILS_PATH);
        await this.photoRepo.deleteById(id);
    }
    // Get one photo
    async getPhoto(id) {
        return this.photoRepo.findById(id);
    }
    // Get all photos
    async getPhotos(tag) {
        if (!tag) {
            return this.photoRepo.find();
        }
        this.validatePhotoTag(tag);
        return this.photoRepo.find({
            where: {
                tag: tag,
            },
        });
    }
    // Validate photo tag
    validatePhotoTag(tag) {
        const PhotoTagEnum = zod_1.default.nativeEnum(enums_1.PhotoTag);
        const { error } = PhotoTagEnum.safeParse(tag);
        if (error) {
            throw rest_1.HttpErrors.BadRequest(`Vlastnost PhotoTag musí být jedna z těchto hodnot: ${Object.values(enums_1.PhotoTag)}.`);
        }
    }
};
exports.PhotoService = PhotoService;
exports.PhotoService = PhotoService = tslib_1.__decorate([
    (0, core_1.injectable)({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.PhotoRepository)),
    tslib_1.__param(1, (0, core_1.service)(file_upload_service_1.FileUploadService)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.PhotoRepository,
        file_upload_service_1.FileUploadService])
], PhotoService);
//# sourceMappingURL=photo.service.js.map