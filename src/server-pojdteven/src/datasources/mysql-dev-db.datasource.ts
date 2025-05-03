import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import config from 'config';

const datasourceConfig = {
  name: 'MysqlDevDB',
  connector: 'mysql',
  url: '',
  host: config.get('db.host') as string,
  port: config.get('db.port') as number,
  user: config.get('db.user') as string,
  password: config.get('db.password') as string,
  database: config.get('db.database') as string,
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MysqlDevDbDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'MysqlDevDB';
  static readonly defaultConfig = datasourceConfig;

  constructor(
    @inject('datasources.config.MysqlDevDB', {optional: true})
    dsConfig: object = datasourceConfig,
  ) {
    super(dsConfig);
  }
}
