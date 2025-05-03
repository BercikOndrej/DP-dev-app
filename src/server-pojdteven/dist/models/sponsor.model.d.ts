import { Entity } from '@loopback/repository';
export declare class Sponsor extends Entity {
    id?: string;
    name?: string;
    imagePath?: string;
    constructor(data?: Partial<Sponsor>);
}
export interface SponsorRelations {
}
export type SponsorWithRelations = Sponsor & SponsorRelations;
