import { DefaultCrudRepository } from '@loopback/repository';
import { MysqlDevDbDataSource } from '../datasources';
import { Attendance, AttendanceRelations } from '../models';
export declare class AttendanceRepository extends DefaultCrudRepository<Attendance, typeof Attendance.prototype.id, AttendanceRelations> {
    constructor(dataSource: MysqlDevDbDataSource);
}
