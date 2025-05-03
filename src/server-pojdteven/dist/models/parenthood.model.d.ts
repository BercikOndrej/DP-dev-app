import { Entity } from '@loopback/repository';
export declare class Parenthood extends Entity {
    id: string;
    userId: string;
    childId: string;
    constructor(data?: Partial<Parenthood>);
}
export interface ParenthoodRelations {
}
export type ParenthoodWithRelations = Parenthood & ParenthoodRelations;
