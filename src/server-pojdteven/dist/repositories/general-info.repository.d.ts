import { DefaultCrudRepository } from '@loopback/repository';
import { MysqlDevDbDataSource } from '../datasources';
import { GeneralInfo, GeneralInfoRelations } from '../models';
export declare class GeneralInfoRepository extends DefaultCrudRepository<GeneralInfo, typeof GeneralInfo.prototype.id, GeneralInfoRelations> {
    constructor(dataSource: MysqlDevDbDataSource);
}
