import { DefaultCrudRepository } from '@loopback/repository';
import { MysqlDevDbDataSource } from '../datasources';
import { Address, AddressRelations } from '../models';
export declare class AddressRepository extends DefaultCrudRepository<Address, typeof Address.prototype.id, AddressRelations> {
    constructor(dataSource: MysqlDevDbDataSource);
}
