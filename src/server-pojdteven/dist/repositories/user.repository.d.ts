import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory, HasOneRepositoryFactory } from '@loopback/repository';
import { MysqlDevDbDataSource } from '../datasources';
import { Address, Attendance, Child, Parenthood, User, UserCredentials, UserRelations } from '../models';
import { AddressRepository } from './address.repository';
import { AttendanceRepository } from './attendance.repository';
import { ChildRepository } from './child.repository';
import { ParenthoodRepository } from './parenthood.repository';
import { UserCredentialsRepository } from './user-credentials.repository';
export declare class UserRepository extends DefaultCrudRepository<User, typeof User.prototype.id, UserRelations> {
    protected userCredentialsRepositoryGetter: Getter<UserCredentialsRepository>;
    protected addressRepositoryGetter: Getter<AddressRepository>;
    protected childRepositoryGetter: Getter<ChildRepository>;
    protected parenthoodRepositoryGetter: Getter<ParenthoodRepository>;
    protected attendanceRepositoryGetter: Getter<AttendanceRepository>;
    readonly userCredentials: HasOneRepositoryFactory<UserCredentials, typeof User.prototype.id>;
    readonly address: HasOneRepositoryFactory<Address, typeof User.prototype.id>;
    readonly children: HasManyThroughRepositoryFactory<Child, typeof Child.prototype.id, Parenthood, typeof User.prototype.id>;
    readonly attendanceItems: HasManyRepositoryFactory<Attendance, typeof User.prototype.id>;
    constructor(dataSource: MysqlDevDbDataSource, userCredentialsRepositoryGetter: Getter<UserCredentialsRepository>, addressRepositoryGetter: Getter<AddressRepository>, childRepositoryGetter: Getter<ChildRepository>, parenthoodRepositoryGetter: Getter<ParenthoodRepository>, attendanceRepositoryGetter: Getter<AttendanceRepository>);
    findCredentials(userId: typeof User.prototype.id): Promise<UserCredentials | undefined>;
}
