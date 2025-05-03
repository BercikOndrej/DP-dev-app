import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDevDbDataSource} from '../datasources';
import {Photo, PhotoRelations} from '../models';

export class PhotoRepository extends DefaultCrudRepository<
  Photo,
  typeof Photo.prototype.id,
  PhotoRelations
> {
  constructor(
    @inject('datasources.MysqlDevDB') dataSource: MysqlDevDbDataSource,
  ) {
    super(Photo, dataSource);
  }
}
