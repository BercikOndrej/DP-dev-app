import { DefaultCrudRepository } from '@loopback/repository';
import { MysqlDevDbDataSource } from '../datasources';
import { Sponsor, SponsorRelations } from '../models';
export declare class SponsorRepository extends DefaultCrudRepository<Sponsor, typeof Sponsor.prototype.id, SponsorRelations> {
    constructor(dataSource: MysqlDevDbDataSource);
}
