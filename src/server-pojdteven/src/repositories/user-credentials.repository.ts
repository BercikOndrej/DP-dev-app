import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDevDbDataSource} from '../datasources';
import {UserCredentials, UserCredentialsRelations} from '../models';

export class UserCredentialsRepository extends DefaultCrudRepository<
  UserCredentials,
  typeof UserCredentials.prototype.id,
  UserCredentialsRelations
> {
  constructor(
    @inject('datasources.MysqlDevDB') dataSource: MysqlDevDbDataSource,
  ) {
    super(UserCredentials, dataSource);
  }
}
