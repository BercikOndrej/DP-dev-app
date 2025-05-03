import { Attendance } from '../models';
import { AttendanceService } from '../services';
export declare class AttendanceController {
    private attendanceService;
    constructor(attendanceService: AttendanceService);
    createAttendance(att: Omit<Attendance, 'id'>): Promise<Attendance>;
    deleteAttendance(id: string): Promise<void>;
    deleteAllAttendanceItemsOlderThanYear(): Promise<void>;
    getAttendance(id: string): Promise<Attendance>;
    findAttendance(userId: string, dateStr: string): Promise<Attendance | null>;
    getAllAttendanceItems(): Promise<Attendance[]>;
    getAllAttendanceItemsOnDate(date: string): Promise<Attendance[]>;
    createManyChildAttendanceItemsBySchoolDays(data: {
        childId: string;
        from: string;
        to: string;
    }): Promise<Attendance[]>;
    deleteAllAttendanceItemsOfChild(childId: string): Promise<void>;
    deleteAllAttendanceItemsOfChildFromToday(childId: string): Promise<void>;
    getAllNormalAttendanceItemsOfChildInMonth(childId: string, month: number): Promise<Attendance[]>;
    getCountOfAllAlternativeAttendanceItemsOfChild(childId: string): Promise<number>;
    enrollNewNormalAttendanceOfChild(att: Omit<Attendance, 'id'>): Promise<Attendance>;
    unrollAttendanceOfChild(id: string): Promise<void>;
    createAttendanceItemsOfUser(data: {
        userId: string;
        dates: string[];
    }): Promise<Attendance[]>;
    deleteAllAttendanceItemsOfUser(userId: string): Promise<void>;
    getAllAttendanceItemsOfTeachersInMonth(month: number): Promise<Attendance[]>;
    changeTeacherAttendance(data: {
        originTeacherId: string;
        nextTeacherId: string;
        isPickUp: boolean;
        dateStr: string;
    }): Promise<Attendance>;
}
