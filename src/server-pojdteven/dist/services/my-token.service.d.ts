import { TokenService } from '@loopback/authentication';
import { UserProfile } from '@loopback/security';
export interface MyUserProfile extends UserProfile {
    id: string;
    email: string;
    role: string;
    fullName: string;
}
export declare class MyTokenService implements TokenService {
    private secret;
    private expiresIn;
    constructor(secret: string, expiresIn: string);
    verifyToken(token: string): Promise<MyUserProfile>;
    generateToken(userProfile: MyUserProfile): Promise<string>;
    revokeToken?(token: string): Promise<boolean>;
}
