"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let UserRepository = class UserRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, userCredentialsRepositoryGetter, addressRepositoryGetter, childRepositoryGetter, parenthoodRepositoryGetter, attendanceRepositoryGetter) {
        super(models_1.User, dataSource);
        this.userCredentialsRepositoryGetter = userCredentialsRepositoryGetter;
        this.addressRepositoryGetter = addressRepositoryGetter;
        this.childRepositoryGetter = childRepositoryGetter;
        this.parenthoodRepositoryGetter = parenthoodRepositoryGetter;
        this.attendanceRepositoryGetter = attendanceRepositoryGetter;
        this.attendanceItems = this.createHasManyRepositoryFactoryFor('attendanceItems', attendanceRepositoryGetter);
        this.registerInclusionResolver('attendanceItems', this.attendanceItems.inclusionResolver);
        this.children = this.createHasManyThroughRepositoryFactoryFor('children', childRepositoryGetter, parenthoodRepositoryGetter);
        this.registerInclusionResolver('children', this.children.inclusionResolver);
        this.address = this.createHasOneRepositoryFactoryFor('address', addressRepositoryGetter);
        this.registerInclusionResolver('address', this.address.inclusionResolver);
        this.userCredentials = this.createHasOneRepositoryFactoryFor('userCredentials', userCredentialsRepositoryGetter);
        this.registerInclusionResolver('userCredentials', this.userCredentials.inclusionResolver);
    }
    async findCredentials(userId) {
        try {
            return await this.userCredentials(userId).get();
        }
        catch (err) {
            if (err.code === 'ENTITY_NOT_FOUND') {
                return undefined;
            }
            throw err;
        }
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.MysqlDevDB')),
    tslib_1.__param(1, repository_1.repository.getter('UserCredentialsRepository')),
    tslib_1.__param(2, repository_1.repository.getter('AddressRepository')),
    tslib_1.__param(3, repository_1.repository.getter('ChildRepository')),
    tslib_1.__param(4, repository_1.repository.getter('ParenthoodRepository')),
    tslib_1.__param(5, repository_1.repository.getter('AttendanceRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MysqlDevDbDataSource, Function, Function, Function, Function, Function])
], UserRepository);
//# sourceMappingURL=user.repository.js.map