import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDevDbDataSource} from '../datasources';
import {Parenthood, ParenthoodRelations} from '../models';

export class ParenthoodRepository extends DefaultCrudRepository<
  Parenthood,
  typeof Parenthood.prototype.id,
  ParenthoodRelations
> {
  constructor(
    @inject('datasources.MysqlDevDB') dataSource: MysqlDevDbDataSource,
  ) {
    super(Parenthood, dataSource);
  }
}
