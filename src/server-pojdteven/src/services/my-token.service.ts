import {TokenService} from '@loopback/authentication';
import {TokenServiceBindings} from '@loopback/authentication-jwt';
import {BindingScope, inject, injectable} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import jwt from 'jsonwebtoken';

// Properties which I want to have available on login user
export interface MyUserProfile extends UserProfile {
  id: string;
  email: string;
  role: string;
  fullName: string;
}

@injectable({scope: BindingScope.TRANSIENT})
export class MyTokenService implements TokenService {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SECRET) private secret: string,
    @inject(TokenServiceBindings.TOKEN_EXPIRES_IN) private expiresIn: string,
  ) {}

  // Parse request and return MyUserProfile
  async verifyToken(token: string): Promise<MyUserProfile> {
    if (!token) {
      throw HttpErrors.Unauthorized('Chyba při ověřování tokenu.');
    }

    let userProfile: MyUserProfile;

    try {
      const decodedToken = jwt.verify(token, this.secret) as MyUserProfile;

      userProfile = Object.assign(
        {[securityId]: '', fullName: ''},
        {
          [securityId]: decodedToken.id,
          id: decodedToken.id,
          email: decodedToken.email,
          role: decodedToken.role,
          fullName: decodedToken.fullName,
        },
      );
    } catch (error) {
      throw HttpErrors.Unauthorized(
        `Chyba při ověřování tokenu: ${error.message}`,
      );
    }

    return userProfile;
  }

  // Create token
  async generateToken(userProfile: MyUserProfile): Promise<string> {
    if (!userProfile) {
      throw HttpErrors.Unauthorized(
        'Chyba při generování tokenu. Uživatel má hodnotu null.',
      );
    }

    const userInfoForToken = {
      id: userProfile[securityId],
      email: userProfile.email,
      role: userProfile.role,
      fullName: userProfile.fullName,
    };

    let token: string;
    try {
      token = jwt.sign(userInfoForToken, this.secret, {
        expiresIn: this.expiresIn,
      });
    } catch (error) {
      throw HttpErrors.Unauthorized(
        `Chyba při generování tokenu: ${error.message}`,
      );
    }

    return token;
  }

  revokeToken?(token: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
