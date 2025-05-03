"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlDevDbDataSource = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const config_1 = tslib_1.__importDefault(require("config"));
const datasourceConfig = {
    name: 'MysqlDevDB',
    connector: 'mysql',
    url: '',
    host: config_1.default.get('db.host'),
    port: config_1.default.get('db.port'),
    user: config_1.default.get('db.user'),
    password: config_1.default.get('db.password'),
    database: config_1.default.get('db.database'),
};
// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
let MysqlDevDbDataSource = class MysqlDevDbDataSource extends repository_1.juggler.DataSource {
    constructor(dsConfig = datasourceConfig) {
        super(dsConfig);
    }
};
exports.MysqlDevDbDataSource = MysqlDevDbDataSource;
MysqlDevDbDataSource.dataSourceName = 'MysqlDevDB';
MysqlDevDbDataSource.defaultConfig = datasourceConfig;
exports.MysqlDevDbDataSource = MysqlDevDbDataSource = tslib_1.__decorate([
    (0, core_1.lifeCycleObserver)('datasource'),
    tslib_1.__param(0, (0, core_1.inject)('datasources.config.MysqlDevDB', { optional: true })),
    tslib_1.__metadata("design:paramtypes", [Object])
], MysqlDevDbDataSource);
//# sourceMappingURL=mysql-dev-db.datasource.js.map