import { DefaultCrudRepository } from '@loopback/repository';
import { MysqlDevDbDataSource } from '../datasources';
import { DayActivity, DayActivityRelations } from '../models';
export declare class DayActivityRepository extends DefaultCrudRepository<DayActivity, typeof DayActivity.prototype.id, DayActivityRelations> {
    constructor(dataSource: MysqlDevDbDataSource);
}
