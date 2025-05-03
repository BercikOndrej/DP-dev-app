import { DefaultCrudRepository } from '@loopback/repository';
import { MysqlDevDbDataSource } from '../datasources';
import { Parenthood, ParenthoodRelations } from '../models';
export declare class ParenthoodRepository extends DefaultCrudRepository<Parenthood, typeof Parenthood.prototype.id, ParenthoodRelations> {
    constructor(dataSource: MysqlDevDbDataSource);
}
