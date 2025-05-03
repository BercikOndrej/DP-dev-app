import { DefaultCrudRepository } from '@loopback/repository';
import { MysqlDevDbDataSource } from '../datasources';
import { Action, ActionRelations } from '../models';
export declare class ActionRepository extends DefaultCrudRepository<Action, typeof Action.prototype.id, ActionRelations> {
    constructor(dataSource: MysqlDevDbDataSource);
}
