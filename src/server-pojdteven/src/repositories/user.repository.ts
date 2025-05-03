import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  HasManyThroughRepositoryFactory,
  HasOneRepositoryFactory,
  repository,
} from '@loopback/repository';
import {MysqlDevDbDataSource} from '../datasources';
import {
  Address,
  Attendance,
  Child,
  Parenthood,
  User,
  UserCredentials,
  UserRelations,
} from '../models';
import {AddressRepository} from './address.repository';
import {AttendanceRepository} from './attendance.repository';
import {ChildRepository} from './child.repository';
import {ParenthoodRepository} from './parenthood.repository';
import {UserCredentialsRepository} from './user-credentials.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  public readonly userCredentials: HasOneRepositoryFactory<
    UserCredentials,
    typeof User.prototype.id
  >;

  public readonly address: HasOneRepositoryFactory<
    Address,
    typeof User.prototype.id
  >;

  public readonly children: HasManyThroughRepositoryFactory<
    Child,
    typeof Child.prototype.id,
    Parenthood,
    typeof User.prototype.id
  >;

  public readonly attendanceItems: HasManyRepositoryFactory<
    Attendance,
    typeof User.prototype.id
  >;

  constructor(
    @inject('datasources.MysqlDevDB') dataSource: MysqlDevDbDataSource,
    @repository.getter('UserCredentialsRepository')
    protected userCredentialsRepositoryGetter: Getter<UserCredentialsRepository>,
    @repository.getter('AddressRepository')
    protected addressRepositoryGetter: Getter<AddressRepository>,
    @repository.getter('ChildRepository')
    protected childRepositoryGetter: Getter<ChildRepository>,
    @repository.getter('ParenthoodRepository')
    protected parenthoodRepositoryGetter: Getter<ParenthoodRepository>,
    @repository.getter('AttendanceRepository')
    protected attendanceRepositoryGetter: Getter<AttendanceRepository>,
  ) {
    super(User, dataSource);
    this.attendanceItems = this.createHasManyRepositoryFactoryFor(
      'attendanceItems',
      attendanceRepositoryGetter,
    );
    this.registerInclusionResolver(
      'attendanceItems',
      this.attendanceItems.inclusionResolver,
    );
    this.children = this.createHasManyThroughRepositoryFactoryFor(
      'children',
      childRepositoryGetter,
      parenthoodRepositoryGetter,
    );
    this.registerInclusionResolver('children', this.children.inclusionResolver);
    this.address = this.createHasOneRepositoryFactoryFor(
      'address',
      addressRepositoryGetter,
    );
    this.registerInclusionResolver('address', this.address.inclusionResolver);
    this.userCredentials = this.createHasOneRepositoryFactoryFor(
      'userCredentials',
      userCredentialsRepositoryGetter,
    );
    this.registerInclusionResolver(
      'userCredentials',
      this.userCredentials.inclusionResolver,
    );
  }

  async findCredentials(
    userId: typeof User.prototype.id,
  ): Promise<UserCredentials | undefined> {
    try {
      return await this.userCredentials(userId).get();
    } catch (err) {
      if (err.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  }
}
