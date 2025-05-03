import { AuthenticationComponent } from '@loopback/authentication';
import {
  JWTAuthenticationComponent,
  TokenServiceBindings,
  UserServiceBindings
} from '@loopback/authentication-jwt';
import {
  AuthorizationBindings,
  AuthorizationComponent,
  AuthorizationDecision,
  AuthorizationOptions,
  AuthorizationTags
} from '@loopback/authorization';
import { BootMixin } from '@loopback/boot';
import { ApplicationConfig } from '@loopback/core';
import { RepositoryMixin } from '@loopback/repository';
import { RestApplication } from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent
} from '@loopback/rest-explorer';
import { ServiceMixin } from '@loopback/service-proxy';
import config from 'config';
import path from 'path';
import { MysqlDevDbDataSource } from './datasources';
import { MyAuthorizationProvider } from './providers';
import { UserCredentialsRepository, UserRepository } from './repositories';
import { MySequence } from './sequence';
import { MyTokenService, MyUserService } from './services';
import { checkConfig } from './utils/checkConfig';

export {ApplicationConfig};

const SECRET = config.get('jwt.secret') as string;
const ONE_MONTH_EXPIRES_IN = config.get('jwt.expiresIn') as string;

const authorizationOptions: AuthorizationOptions = {
  precedence: AuthorizationDecision.DENY,
  defaultDecision: AuthorizationDecision.DENY,
};

export class ServerPojdtevenApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Check all config environments
    checkConfig();

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    //-------------------------------------------------------------------------
    // Static files
    // Set static files serving for whole static folder
    this.static('/static', path.join(__dirname, '../static'));

    // Bindings for Authorization and Authentication
    // Binding componnents for Authentication and Authorization
    this.component(AuthenticationComponent);
    this.component(JWTAuthenticationComponent);

    // Binding for JWT authentication
    this.dataSource(MysqlDevDbDataSource, UserServiceBindings.DATASOURCE_NAME);

    // Bind user service
    this.bind(UserServiceBindings.USER_SERVICE).toClass(MyUserService);

    // Bind user and credentials repository
    this.bind(UserServiceBindings.USER_REPOSITORY).toClass(UserRepository);
    this.bind(UserServiceBindings.USER_CREDENTIALS_REPOSITORY).toClass(
      UserCredentialsRepository,
    );
    // Bind out custom token service
    this.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(MyTokenService);
    // Bind token secret for token service
    this.bind(TokenServiceBindings.TOKEN_SECRET).to(SECRET);
    // Bind expiresIn value for token service
    this.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to(ONE_MONTH_EXPIRES_IN);

    // Registration of authorization component
    this.configure(AuthorizationBindings.COMPONENT).to(options);
    this.component(AuthorizationComponent);

    // Bind authorization provider
    this.bind('authorizationProviders.my-authorizer-provider')
      .toProvider(MyAuthorizationProvider)
      .tag(AuthorizationTags.AUTHORIZER);

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
