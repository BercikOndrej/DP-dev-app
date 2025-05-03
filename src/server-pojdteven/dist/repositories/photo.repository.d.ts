import { DefaultCrudRepository } from '@loopback/repository';
import { MysqlDevDbDataSource } from '../datasources';
import { Photo, PhotoRelations } from '../models';
export declare class PhotoRepository extends DefaultCrudRepository<Photo, typeof Photo.prototype.id, PhotoRelations> {
    constructor(dataSource: MysqlDevDbDataSource);
}
