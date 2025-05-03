import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDevDbDataSource} from '../datasources';
import {Action, ActionRelations} from '../models';

export class ActionRepository extends DefaultCrudRepository<
  Action,
  typeof Action.prototype.id,
  ActionRelations
> {
  constructor(
    @inject('datasources.MysqlDevDB') dataSource: MysqlDevDbDataSource,
  ) {
    super(Action, dataSource);
  }
}
