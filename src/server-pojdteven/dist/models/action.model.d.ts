import { Entity } from '@loopback/repository';
export declare class Action extends Entity {
    id?: string;
    imagePath?: string;
    existsFrom: Date;
    note?: string;
    constructor(data?: Partial<Action>);
}
export interface ActionRelations {
}
export type ActionWithRelations = Action & ActionRelations;
