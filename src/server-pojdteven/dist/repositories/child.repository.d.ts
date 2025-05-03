import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory } from '@loopback/repository';
import { MysqlDevDbDataSource } from '../datasources';
import { Attendance, Child, ChildRelations, Parenthood, User } from '../models';
import { AttendanceRepository } from './attendance.repository';
import { ParenthoodRepository } from './parenthood.repository';
import { UserRepository } from './user.repository';
export declare class ChildRepository extends DefaultCrudRepository<Child, typeof Child.prototype.id, ChildRelations> {
    protected parenthoodRepositoryGetter: Getter<ParenthoodRepository>;
    protected userRepositoryGetter: Getter<UserRepository>;
    protected attendanceRepositoryGetter: Getter<AttendanceRepository>;
    readonly users: HasManyThroughRepositoryFactory<User, typeof User.prototype.id, Parenthood, typeof Child.prototype.id>;
    readonly attendanceItems: HasManyRepositoryFactory<Attendance, typeof Child.prototype.id>;
    constructor(dataSource: MysqlDevDbDataSource, parenthoodRepositoryGetter: Getter<ParenthoodRepository>, userRepositoryGetter: Getter<UserRepository>, attendanceRepositoryGetter: Getter<AttendanceRepository>);
}
