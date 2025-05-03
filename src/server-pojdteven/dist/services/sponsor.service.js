"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SponsorService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const repositories_1 = require("../repositories");
const file_upload_service_1 = require("./file-upload.service");
const STATIC_FILES_SPONSORS_PATH = 'static/sponsors/';
let SponsorService = class SponsorService {
    constructor(sponsorRepo, fileUploadService) {
        this.sponsorRepo = sponsorRepo;
        this.fileUploadService = fileUploadService;
    }
    // Create sponsor
    async createSponsor(sponsor) {
        sponsor.imagePath = '';
        return this.sponsorRepo.create(sponsor);
    }
    // Upload sponsor image
    async uploadSponsorImage(id, request) {
        const sponsor = await this.sponsorRepo.findById(id);
        if (!sponsor) {
            throw rest_1.HttpErrors.NotFound('Sponzor nebyl nalezen.');
        }
        const filename = `sponsor-${sponsor.id}`;
        try {
            const files = await this.fileUploadService.processFileUpload(request, STATIC_FILES_SPONSORS_PATH, filename, true);
            sponsor.imagePath = STATIC_FILES_SPONSORS_PATH + files[0].filename;
            this.updateSponsor(sponsor.id, sponsor);
        }
        catch (error) {
            throw rest_1.HttpErrors.BadRequest(`Chyba při načítání obrázku: ${error}.`);
        }
    }
    // Delete sponsor
    async deleteSponsor(id) {
        if (!(await this.sponsorRepo.exists(id))) {
            throw rest_1.HttpErrors.NotFound('Sponzor nebyl nalezen.');
        }
        const regex = new RegExp(`^sponsor-${id}\\.[a-zA-Z]+$`);
        await this.fileUploadService.deleteFile(regex, STATIC_FILES_SPONSORS_PATH);
        this.sponsorRepo.deleteById(id);
    }
    // Update Sponsor
    async updateSponsor(id, sponsor) {
        return this.sponsorRepo.updateById(id, sponsor);
    }
    // Get sponsor
    async getSponsor(id) {
        return this.sponsorRepo.findById(id);
    }
    // Get all sponsors
    async getSponsors() {
        return this.sponsorRepo.find();
    }
};
exports.SponsorService = SponsorService;
exports.SponsorService = SponsorService = tslib_1.__decorate([
    (0, core_1.injectable)({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.SponsorRepository)),
    tslib_1.__param(1, (0, core_1.service)(file_upload_service_1.FileUploadService)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.SponsorRepository,
        file_upload_service_1.FileUploadService])
], SponsorService);
//# sourceMappingURL=sponsor.service.js.map