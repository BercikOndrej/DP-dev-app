"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChildRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let ChildRepository = class ChildRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, parenthoodRepositoryGetter, userRepositoryGetter, attendanceRepositoryGetter) {
        super(models_1.Child, dataSource);
        this.parenthoodRepositoryGetter = parenthoodRepositoryGetter;
        this.userRepositoryGetter = userRepositoryGetter;
        this.attendanceRepositoryGetter = attendanceRepositoryGetter;
        this.attendanceItems = this.createHasManyRepositoryFactoryFor('attendanceItems', attendanceRepositoryGetter);
        this.registerInclusionResolver('attendanceItems', this.attendanceItems.inclusionResolver);
        this.users = this.createHasManyThroughRepositoryFactoryFor('users', userRepositoryGetter, parenthoodRepositoryGetter);
        this.registerInclusionResolver('users', this.users.inclusionResolver);
    }
};
exports.ChildRepository = ChildRepository;
exports.ChildRepository = ChildRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.MysqlDevDB')),
    tslib_1.__param(1, repository_1.repository.getter('ParenthoodRepository')),
    tslib_1.__param(2, repository_1.repository.getter('UserRepository')),
    tslib_1.__param(3, repository_1.repository.getter('AttendanceRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MysqlDevDbDataSource, Function, Function, Function])
], ChildRepository);
//# sourceMappingURL=child.repository.js.map