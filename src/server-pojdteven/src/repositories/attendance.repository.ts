import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDevDbDataSource} from '../datasources';
import {Attendance, AttendanceRelations} from '../models';

export class AttendanceRepository extends DefaultCrudRepository<
  Attendance,
  typeof Attendance.prototype.id,
  AttendanceRelations
> {
  constructor(
    @inject('datasources.MysqlDevDB') dataSource: MysqlDevDbDataSource,
  ) {
    super(Attendance, dataSource);
  }
}
