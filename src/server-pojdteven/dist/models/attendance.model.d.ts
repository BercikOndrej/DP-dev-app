import { Entity } from '@loopback/repository';
import { AttendanceTag } from '../enums';
export declare class Attendance extends Entity {
    id: string;
    date: string;
    tag: AttendanceTag;
    pickUp?: boolean;
    childId?: string;
    userId?: string;
    constructor(data?: Partial<Attendance>);
}
export interface AttendanceRelations {
}
export type AttendanceWithRelations = Attendance & AttendanceRelations;
