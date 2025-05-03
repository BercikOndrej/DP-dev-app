"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralInfoRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let GeneralInfoRepository = class GeneralInfoRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource) {
        super(models_1.GeneralInfo, dataSource);
    }
};
exports.GeneralInfoRepository = GeneralInfoRepository;
exports.GeneralInfoRepository = GeneralInfoRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.MysqlDevDB')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MysqlDevDbDataSource])
], GeneralInfoRepository);
//# sourceMappingURL=general-info.repository.js.map