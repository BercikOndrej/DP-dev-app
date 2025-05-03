"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralInfoService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const zod_1 = tslib_1.__importDefault(require("zod"));
const enums_1 = require("../enums");
const repositories_1 = require("../repositories");
let GeneralInfoService = class GeneralInfoService {
    constructor(generalInfoRepo) {
        this.generalInfoRepo = generalInfoRepo;
    }
    // Create info
    async createInfo(info) {
        if (info.page) {
            this.validatePageType(info.page);
        }
        return this.generalInfoRepo.create(info);
    }
    // Update info
    async updateInfo(id, info) {
        if (info.page) {
            this.validatePageType(info.page);
        }
        await this.generalInfoRepo.updateById(id, info);
    }
    // Delete info
    async deleteInfo(id) {
        await this.generalInfoRepo.deleteById(id);
    }
    // Get info by Id
    async getInfoById(id) {
        return this.generalInfoRepo.findById(id);
    }
    async getNextPositionOfInfoOnPage(page) {
        const infoItems = await this.getWholeInfo(page);
        return (Math.max(...infoItems
            .map((info) => info.position)
            .filter((position) => position !== undefined)) + 1);
    }
    // Get whole info
    async getWholeInfo(page) {
        if (page) {
            this.validatePageType(page);
            // Return all info with given page type and pageType equals undefined
            const index = Object.values(enums_1.PageType).findIndex((value) => value !== page);
            const otherPage = Object.values(enums_1.PageType)[index];
            return this.generalInfoRepo.find({
                where: {
                    page: {
                        neq: otherPage,
                    },
                },
                order: ['position ASC'],
            });
        }
        else {
            return this.generalInfoRepo.find({
                order: ['position ASC'],
            });
        }
    }
    // Validate page tag
    validatePageType(page) {
        const PageTypeEnum = zod_1.default.nativeEnum(enums_1.PageType);
        const { error } = PageTypeEnum.safeParse(page);
        if (error) {
            throw new rest_1.HttpErrors.BadRequest(`Vlastnost Page musí být jedna z těchto hodnot: ${Object.values(enums_1.PageType)}`);
        }
    }
};
exports.GeneralInfoService = GeneralInfoService;
exports.GeneralInfoService = GeneralInfoService = tslib_1.__decorate([
    (0, core_1.injectable)({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.GeneralInfoRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.GeneralInfoRepository])
], GeneralInfoService);
//# sourceMappingURL=general-info.service.js.map