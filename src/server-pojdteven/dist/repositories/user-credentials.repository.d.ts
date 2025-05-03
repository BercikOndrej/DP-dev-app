import { DefaultCrudRepository } from '@loopback/repository';
import { MysqlDevDbDataSource } from '../datasources';
import { UserCredentials, UserCredentialsRelations } from '../models';
export declare class UserCredentialsRepository extends DefaultCrudRepository<UserCredentials, typeof UserCredentials.prototype.id, UserCredentialsRelations> {
    constructor(dataSource: MysqlDevDbDataSource);
}
