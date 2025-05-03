"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionService = exports.STATIC_FILES_ACTIONS_PATH = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const file_upload_service_1 = require("./file-upload.service");
exports.STATIC_FILES_ACTIONS_PATH = 'static/actions/';
let ActionService = class ActionService {
    constructor(actionRepo, fileUploadService) {
        this.actionRepo = actionRepo;
        this.fileUploadService = fileUploadService;
    }
    // Get one action
    async getAction(id) {
        return this.actionRepo.findById(id);
    }
    // Get all actions
    async getActions() {
        return this.actionRepo.find();
    }
    // Update action
    async updateAction(id, action) {
        await this.actionRepo.updateById(id, action);
    }
    // Create action
    async createAction(request) {
        let action = new models_1.Action();
        action = await this.actionRepo.create(action);
        const filename = `action-${action.id}`;
        try {
            const files = await this.fileUploadService.processFileUpload(request, exports.STATIC_FILES_ACTIONS_PATH, filename, true);
            action.imagePath = exports.STATIC_FILES_ACTIONS_PATH + files[0].filename;
            await this.updateAction(action.id, action);
        }
        catch (error) {
            await this.actionRepo.deleteById(action.id);
            throw rest_1.HttpErrors.BadRequest(`Chyba při uploadu obrázku: ${error}.`);
        }
        return action;
    }
    // Delete action Image
    async deleteAction(id) {
        if (!(await this.actionRepo.exists(id))) {
            throw rest_1.HttpErrors.NotFound('Akce nenalezena.');
        }
        const regex = new RegExp(`^action-${id}\\.[a-zA-Z]+$`);
        await this.fileUploadService.deleteFile(regex, exports.STATIC_FILES_ACTIONS_PATH);
        await this.actionRepo.deleteById(id);
    }
};
exports.ActionService = ActionService;
exports.ActionService = ActionService = tslib_1.__decorate([
    (0, core_1.injectable)({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.ActionRepository)),
    tslib_1.__param(1, (0, core_1.service)(file_upload_service_1.FileUploadService)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ActionRepository,
        file_upload_service_1.FileUploadService])
], ActionService);
//# sourceMappingURL=action.service.js.map