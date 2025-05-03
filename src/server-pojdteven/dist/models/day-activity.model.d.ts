import { Entity } from '@loopback/repository';
export declare class DayActivity extends Entity {
    id?: number;
    startTime: string;
    endTime: string;
    description: string;
    constructor(data?: Partial<DayActivity>);
}
export interface DayActivityRelations {
}
export type DayActivityWithRelations = DayActivity & DayActivityRelations;
