/// <reference types="express" />
import { UserService } from '@loopback/authentication';
import { Filter } from '@loopback/repository';
import { Request } from '@loopback/rest';
import { Address, Child, User, UserWithRelations } from '../models';
import { UserRepository } from '../repositories';
import { AttendanceService } from './attendance.service';
import { EmailService } from './email.service';
import { FileUploadService } from './file-upload.service';
import { MyTokenService, MyUserProfile } from './my-token.service';
import { ParenthoodService } from './parenthood.service';
import { NewUserObject } from '../controllers';
export type Credentials = {
    email: string;
    password: string;
};
export declare class MyUserService implements UserService<User, Credentials> {
    private userRepo;
    jwtService: MyTokenService;
    private fileUploadService;
    private emailService;
    private parenthoodService;
    private attendanceService;
    constructor(userRepo: UserRepository, jwtService: MyTokenService, fileUploadService: FileUploadService, emailService: EmailService, parenthoodService: ParenthoodService, attendanceService: AttendanceService);
    createUser(newUser: Omit<User, 'id' | 'imagePath'>): Promise<User>;
    deleteUser(id: string): Promise<void>;
    deleteUserImage(id: string): Promise<void>;
    uploadUserImage(request: Request, id: string): Promise<void>;
    updateUser(id: string, user: User): Promise<void>;
    updateUserWithoutValidation(id: string, user: User): Promise<void>;
    updateUserAddress(id: string, address: Address): Promise<void>;
    changeUserPassword(id: string, actualPassword: string, newPassword: string): Promise<void>;
    savedNewPassword(id: string, password: string): Promise<void>;
    getUser(id: string): Promise<UserWithRelations>;
    findUser(filter: Filter<User>): Promise<User | null>;
    getUsers(): Promise<User[]>;
    getTeachers(): Promise<User[]>;
    getChildren(id: string): Promise<Child[]>;
    getWorkingTeachersOnDate(date: string): Promise<User[]>;
    login(credentials: Credentials): Promise<{
        token: string;
    }>;
    whoAmI(currentUserProfile: MyUserProfile): Promise<string>;
    signup(newUserRequest: NewUserObject): Promise<User>;
    verifyCredentials(credentials: Credentials): Promise<User>;
    convertToUserProfile(user: User): MyUserProfile;
    hashPassword(password: string): Promise<string>;
    validatePassword(passwd: string): void;
    validateAddress(address: Omit<Address, 'id'>): void;
    validateUniqueEmail(email: string): Promise<void>;
    validateNewUser(user: Omit<User, 'id' | 'imagePath' | 'address' | 'userCredentials'>): void;
    isAdult(dateStr: string): boolean;
}
