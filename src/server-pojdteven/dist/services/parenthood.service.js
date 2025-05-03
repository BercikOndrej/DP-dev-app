"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParenthoodService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const repositories_1 = require("../repositories");
let ParenthoodService = class ParenthoodService {
    constructor(childRepo, parenthoodRepo, userRepo) {
        this.childRepo = childRepo;
        this.parenthoodRepo = parenthoodRepo;
        this.userRepo = userRepo;
    }
    // Create parenthood relationship
    async createParenthood(parenthood) {
        if (!(await this.childRepo.exists(parenthood.childId))) {
            throw rest_1.HttpErrors.NotFound('Dítě nebylo nalezeno.');
        }
        if (!(await this.userRepo.exists(parenthood.userId))) {
            throw rest_1.HttpErrors.NotFound('Uživatel nebyl nalezen.');
        }
        return this.parenthoodRepo.create(parenthood);
    }
    // Delete all relations of child
    async deleteAllChildRelations(id) {
        if (!(await this.childRepo.exists(id))) {
            throw rest_1.HttpErrors.NotFound('Dítě nebylo nalezeno.');
        }
        await this.parenthoodRepo.deleteAll({
            childId: id,
        });
    }
    // Delete all user relations
    async deleteAllUserRelations(id) {
        if (!(await this.userRepo.exists(id))) {
            throw rest_1.HttpErrors.NotFound('Uživatel nenalezen.');
        }
        await this.parenthoodRepo.deleteAll({ userId: id });
    }
    // Delete parenthood relation
    async deleteParenthood(id) {
        if (!(await this.parenthoodRepo.exists(id))) {
            throw rest_1.HttpErrors.NotFound('Vztah rodičovství nebyl nalezen.');
        }
        await this.parenthoodRepo.deleteById(id);
    }
    // Get all parenthood items
    async getAllParenthoodItems() {
        return this.parenthoodRepo.find();
    }
    // Get user parenthood items
    async getUserParenthoodItems(userId) {
        return this.parenthoodRepo.find({
            where: {
                userId: userId,
            },
        });
    }
};
exports.ParenthoodService = ParenthoodService;
exports.ParenthoodService = ParenthoodService = tslib_1.__decorate([
    (0, core_1.injectable)({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.ChildRepository)),
    tslib_1.__param(1, (0, repository_1.repository)(repositories_1.ParenthoodRepository)),
    tslib_1.__param(2, (0, repository_1.repository)(repositories_1.UserRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ChildRepository,
        repositories_1.ParenthoodRepository,
        repositories_1.UserRepository])
], ParenthoodService);
//# sourceMappingURL=parenthood.service.js.map