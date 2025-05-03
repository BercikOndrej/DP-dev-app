import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  HasManyThroughRepositoryFactory,
  repository,
} from '@loopback/repository';
import {MysqlDevDbDataSource} from '../datasources';
import {Attendance, Child, ChildRelations, Parenthood, User} from '../models';
import {AttendanceRepository} from './attendance.repository';
import {ParenthoodRepository} from './parenthood.repository';
import {UserRepository} from './user.repository';

export class ChildRepository extends DefaultCrudRepository<
  Child,
  typeof Child.prototype.id,
  ChildRelations
> {
  public readonly users: HasManyThroughRepositoryFactory<
    User,
    typeof User.prototype.id,
    Parenthood,
    typeof Child.prototype.id
  >;

  public readonly attendanceItems: HasManyRepositoryFactory<
    Attendance,
    typeof Child.prototype.id
  >;

  constructor(
    @inject('datasources.MysqlDevDB') dataSource: MysqlDevDbDataSource,
    @repository.getter('ParenthoodRepository')
    protected parenthoodRepositoryGetter: Getter<ParenthoodRepository>,
    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>,
    @repository.getter('AttendanceRepository')
    protected attendanceRepositoryGetter: Getter<AttendanceRepository>,
  ) {
    super(Child, dataSource);
    this.attendanceItems = this.createHasManyRepositoryFactoryFor(
      'attendanceItems',
      attendanceRepositoryGetter,
    );
    this.registerInclusionResolver(
      'attendanceItems',
      this.attendanceItems.inclusionResolver,
    );
    this.users = this.createHasManyThroughRepositoryFactoryFor(
      'users',
      userRepositoryGetter,
      parenthoodRepositoryGetter,
    );
    this.registerInclusionResolver('users', this.users.inclusionResolver);
  }
}
