import { AuthService } from '../services';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    forgotPassword(request: {
        email: string;
    }): Promise<void>;
    resetPassword(token: string, request: {
        password: string;
    }): Promise<void>;
}
