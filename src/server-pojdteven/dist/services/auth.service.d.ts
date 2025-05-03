import { EmailService } from './email.service';
import { MyUserService } from './my-user.service';
export declare class AuthService {
    private userService;
    private emailService;
    constructor(userService: MyUserService, emailService: EmailService);
    fotgotPassword(email: string): Promise<void>;
    resetPassword(token: string, password: string): Promise<void>;
}
