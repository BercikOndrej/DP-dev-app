import { Entity } from '@loopback/repository';
import { Attendance } from './attendance.model';
import { User } from './user.model';
export declare class Child extends Entity {
    id: string;
    fullName: string;
    dateOfBirth: string;
    description?: string;
    monthlyFee: number;
    schoolDays: string;
    note?: string;
    users: User[];
    attendanceItems: Attendance[];
    constructor(data?: Partial<Child>);
}
export interface ChildRelations {
}
export type ChildWithRelations = Child & ChildRelations;
