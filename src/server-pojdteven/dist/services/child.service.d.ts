import { Child, User } from '../models';
import { ChildRepository } from '../repositories';
import { AttendanceService } from './attendance.service';
import { ParenthoodService } from './parenthood.service';
export declare class ChildService {
    private childRepo;
    private attendanceService;
    private parenthoodService;
    constructor(childRepo: ChildRepository, attendanceService: AttendanceService, parenthoodService: ParenthoodService);
    createChild(child: Omit<Child, 'id'>): Promise<Child>;
    deleteChild(id: string): Promise<void>;
    updateChild(id: string, child: Child): Promise<void>;
    getChildren(): Promise<Child[]>;
    getChild(id: string): Promise<Child>;
    getChildParents(id: string): Promise<User[]>;
    getChildrenWithAttendanceOnDate(date: string): Promise<Child[]>;
    validateChild(child: Omit<Child, 'id'>): void;
    private isFromPast;
}
