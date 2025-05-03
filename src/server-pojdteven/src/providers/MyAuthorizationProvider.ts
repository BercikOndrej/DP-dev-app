import {
  AuthorizationContext,
  AuthorizationDecision,
  AuthorizationMetadata,
  Authorizer,
} from '@loopback/authorization';
import {Provider} from '@loopback/core';

export class MyAuthorizationProvider implements Provider<Authorizer> {
  /**
   * @returns an authorizer function
   *
   */
  value(): Authorizer {
    return this.authorize.bind(this);
  }

  async authorize(
    context: AuthorizationContext,
    metadata: AuthorizationMetadata,
  ) {
    const principalRole = context.principals[0].role;
    if (metadata.allowedRoles?.some(role => role === principalRole)) {
      return AuthorizationDecision.ALLOW;
    }
    return AuthorizationDecision.DENY;
  }
}
