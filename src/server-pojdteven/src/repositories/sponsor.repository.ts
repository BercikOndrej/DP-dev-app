import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDevDbDataSource} from '../datasources';
import {Sponsor, SponsorRelations} from '../models';

export class SponsorRepository extends DefaultCrudRepository<
  Sponsor,
  typeof Sponsor.prototype.id,
  SponsorRelations
> {
  constructor(
    @inject('datasources.MysqlDevDB') dataSource: MysqlDevDbDataSource,
  ) {
    super(Sponsor, dataSource);
  }
}
