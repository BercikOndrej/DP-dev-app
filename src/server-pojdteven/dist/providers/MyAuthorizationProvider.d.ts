import { AuthorizationContext, AuthorizationDecision, AuthorizationMetadata, Authorizer } from '@loopback/authorization';
import { Provider } from '@loopback/core';
export declare class MyAuthorizationProvider implements Provider<Authorizer> {
    /**
     * @returns an authorizer function
     *
     */
    value(): Authorizer;
    authorize(context: AuthorizationContext, metadata: AuthorizationMetadata): Promise<AuthorizationDecision.ALLOW | AuthorizationDecision.DENY>;
}
