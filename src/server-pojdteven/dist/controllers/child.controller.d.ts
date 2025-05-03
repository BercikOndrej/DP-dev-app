import { User } from '@loopback/authentication-jwt';
import { Child } from '../models';
import { ChildService } from '../services';
export declare class ChildController {
    private childService;
    constructor(childService: ChildService);
    createChild(child: Omit<Child, 'id'>): Promise<Child>;
    deleteChild(id: string): Promise<void>;
    updateChild(id: string, child: Child): Promise<void>;
    getChildren(): Promise<Child[]>;
    getChild(id: string): Promise<Child>;
    getChildParents(id: string): Promise<User[]>;
    getChildrenWithAttendanceOnDate(date: string): Promise<Child[]>;
}
