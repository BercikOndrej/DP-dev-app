import { Entity } from '@loopback/repository';
import { Role } from '../enums';
import { Address } from './address.model';
import { Attendance } from './attendance.model';
import { Child } from './child.model';
import { UserCredentials } from './user-credentials.model';
export declare class User extends Entity {
    id: string;
    email: string;
    role?: Role;
    fullName: string;
    dateOfBirth?: string;
    imagePath?: string;
    description?: string;
    academicTitle?: string;
    phoneNumber: string;
    resetPasswordToken?: string | null;
    dateOfLastResetPasswordRequest?: Date | null;
    note?: string;
    userCredentials: UserCredentials;
    address: Address;
    children: Child[];
    attendanceItems: Attendance[];
    constructor(data?: Partial<User>);
}
export interface UserRelations {
}
export type UserWithRelations = User & UserRelations;
