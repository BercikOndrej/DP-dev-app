import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDevDbDataSource} from '../datasources';
import {GeneralInfo, GeneralInfoRelations} from '../models';

export class GeneralInfoRepository extends DefaultCrudRepository<
  GeneralInfo,
  typeof GeneralInfo.prototype.id,
  GeneralInfoRelations
> {
  constructor(
    @inject('datasources.MysqlDevDB') dataSource: MysqlDevDbDataSource,
  ) {
    super(GeneralInfo, dataSource);
  }
}
