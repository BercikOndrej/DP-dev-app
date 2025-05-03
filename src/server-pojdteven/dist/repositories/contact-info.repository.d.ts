import { DefaultCrudRepository } from '@loopback/repository';
import { MysqlDevDbDataSource } from '../datasources';
import { ContactInfo, ContactInfoRelations } from '../models';
export declare class ContactInfoRepository extends DefaultCrudRepository<ContactInfo, typeof ContactInfo.prototype.id, ContactInfoRelations> {
    constructor(dataSource: MysqlDevDbDataSource);
}
