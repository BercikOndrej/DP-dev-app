import { DayActivity } from '../models';
import { DayActivityRepository } from '../repositories';
export declare class DayActivityService {
    private dayActivityRepo;
    constructor(dayActivityRepo: DayActivityRepository);
    createDayActivity(activity: Omit<DayActivity, 'id'>): Promise<DayActivity>;
    updateDayActivity(id: number, activity: DayActivity): Promise<void>;
    deleteDayActivity(id: number): Promise<void>;
    getDayActivity(id: number): Promise<DayActivity>;
    getDayActivities(): Promise<DayActivity[]>;
    validateDayActivity(activity: Omit<DayActivity, 'id'>): void;
    private compareActivities;
}
