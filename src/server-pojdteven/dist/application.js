"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerPojdtevenApplication = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const authentication_jwt_1 = require("@loopback/authentication-jwt");
const authorization_1 = require("@loopback/authorization");
const boot_1 = require("@loopback/boot");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const rest_explorer_1 = require("@loopback/rest-explorer");
const service_proxy_1 = require("@loopback/service-proxy");
const config_1 = tslib_1.__importDefault(require("config"));
const path_1 = tslib_1.__importDefault(require("path"));
const datasources_1 = require("./datasources");
const providers_1 = require("./providers");
const repositories_1 = require("./repositories");
const sequence_1 = require("./sequence");
const services_1 = require("./services");
const checkConfig_1 = require("./utils/checkConfig");
const SECRET = config_1.default.get('jwt.secret');
const ONE_MONTH_EXPIRES_IN = config_1.default.get('jwt.expiresIn');
const authorizationOptions = {
    precedence: authorization_1.AuthorizationDecision.DENY,
    defaultDecision: authorization_1.AuthorizationDecision.DENY,
};
class ServerPojdtevenApplication extends (0, boot_1.BootMixin)((0, service_proxy_1.ServiceMixin)((0, repository_1.RepositoryMixin)(rest_1.RestApplication))) {
    constructor(options = {}) {
        super(options);
        // Check all config environments
        (0, checkConfig_1.checkConfig)();
        // Set up the custom sequence
        this.sequence(sequence_1.MySequence);
        // Set up default home page
        this.static('/', path_1.default.join(__dirname, '../public'));
        //-------------------------------------------------------------------------
        // Static files
        // Set static files serving for whole static folder
        this.static('/static', path_1.default.join(__dirname, '../static'));
        // Bindings for Authorization and Authentication
        // Binding componnents for Authentication and Authorization
        this.component(authentication_1.AuthenticationComponent);
        this.component(authentication_jwt_1.JWTAuthenticationComponent);
        // Binding for JWT authentication
        this.dataSource(datasources_1.MysqlDevDbDataSource, authentication_jwt_1.UserServiceBindings.DATASOURCE_NAME);
        // Bind user service
        this.bind(authentication_jwt_1.UserServiceBindings.USER_SERVICE).toClass(services_1.MyUserService);
        // Bind user and credentials repository
        this.bind(authentication_jwt_1.UserServiceBindings.USER_REPOSITORY).toClass(repositories_1.UserRepository);
        this.bind(authentication_jwt_1.UserServiceBindings.USER_CREDENTIALS_REPOSITORY).toClass(repositories_1.UserCredentialsRepository);
        // Bind out custom token service
        this.bind(authentication_jwt_1.TokenServiceBindings.TOKEN_SERVICE).toClass(services_1.MyTokenService);
        // Bind token secret for token service
        this.bind(authentication_jwt_1.TokenServiceBindings.TOKEN_SECRET).to(SECRET);
        // Bind expiresIn value for token service
        this.bind(authentication_jwt_1.TokenServiceBindings.TOKEN_EXPIRES_IN).to(ONE_MONTH_EXPIRES_IN);
        // Registration of authorization component
        this.configure(authorization_1.AuthorizationBindings.COMPONENT).to(options);
        this.component(authorization_1.AuthorizationComponent);
        // Bind authorization provider
        this.bind('authorizationProviders.my-authorizer-provider')
            .toProvider(providers_1.MyAuthorizationProvider)
            .tag(authorization_1.AuthorizationTags.AUTHORIZER);
        // Customize @loopback/rest-explorer configuration here
        this.configure(rest_explorer_1.RestExplorerBindings.COMPONENT).to({
            path: '/explorer',
        });
        this.component(rest_explorer_1.RestExplorerComponent);
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
exports.ServerPojdtevenApplication = ServerPojdtevenApplication;
//# sourceMappingURL=application.js.map