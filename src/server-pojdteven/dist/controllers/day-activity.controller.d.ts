import { DayActivity } from '../models';
import { DayActivityService } from '../services';
export declare class DayActivityController {
    private dayActivityService;
    constructor(dayActivityService: DayActivityService);
    createDayActivity(dayActivity: Omit<DayActivity, 'id'>): Promise<DayActivity>;
    deleteDayActivity(id: number): Promise<void>;
    updateDayActivity(id: number, dayActivity: DayActivity): Promise<void>;
    getAllDayActivities(): Promise<DayActivity[]>;
    getDayActivity(id: number): Promise<DayActivity>;
}
