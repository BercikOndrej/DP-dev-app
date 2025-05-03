import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDevDbDataSource} from '../datasources';
import {DayActivity, DayActivityRelations} from '../models';

export class DayActivityRepository extends DefaultCrudRepository<
  DayActivity,
  typeof DayActivity.prototype.id,
  DayActivityRelations
> {
  constructor(
    @inject('datasources.MysqlDevDB') dataSource: MysqlDevDbDataSource,
  ) {
    super(DayActivity, dataSource);
  }
}
