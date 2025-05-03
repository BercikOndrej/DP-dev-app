/// <reference types="express" />
import { Request, SchemaObject } from '@loopback/rest';
import { Role } from '../enums';
import { Address, Child, User } from '../models';
import { Credentials, MyUserProfile, MyUserService } from '../services';
export type NewUserObject = {
    email: string;
    role: Role;
    fullName: string;
    dateOfBirth?: string;
    description?: string;
    academicTitle?: string;
    phoneNumber: string;
    address: Address;
    note?: string;
    password: string;
};
export declare const NewUserRequestBody: {
    description: string;
    required: boolean;
    content: {
        'application/json': {
            schema: SchemaObject;
        };
    };
};
export declare const CredentialsRequestBody: {
    description: string;
    required: boolean;
    content: {
        'application/json': {
            schema: SchemaObject;
        };
    };
};
export declare class UserController {
    userService: MyUserService;
    user: MyUserProfile;
    constructor(userService: MyUserService, user: MyUserProfile);
    deleteUser(id: string): Promise<void>;
    uploadUserImage(request: Request, id: string): Promise<void>;
    updateUser(id: string, user: User): Promise<void>;
    updateUserAddress(id: string, address: Address): Promise<void>;
    changeUserPassword(id: string, passwords: {
        actualPassword: string;
        newPassword: string;
    }): Promise<void>;
    getUser(id: string): Promise<User>;
    getUsers(): Promise<User[]>;
    getTeachers(): Promise<User[]>;
    getChidren(id: string): Promise<Child[]>;
    getWorkingTeachersOnDate(date: string): Promise<User[]>;
    login(credentials: Credentials): Promise<{
        token: string;
    }>;
    whoAmI(currentUserProfile: MyUserProfile): Promise<string>;
    signup(newUserRequest: NewUserObject): Promise<User>;
}
