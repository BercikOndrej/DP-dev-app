import { Dayjs } from 'dayjs';
export declare class EmailService {
    constructor();
    sendEmailForPasswordReset(email: string, token: string): Promise<void>;
    sendGeneratedPasswordToNewUser(email: string, password: string): Promise<void>;
    sendEmailOfAttendanceChangeToUsers(userEmails: string[], originTeacher: string, nextTeacher: string, date: Dayjs): Promise<void>;
}
