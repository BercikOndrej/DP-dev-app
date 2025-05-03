import { Entity } from '@loopback/repository';
import { PageType } from '../enums/PageType';
export declare class GeneralInfo extends Entity {
    id?: number;
    title?: string;
    content?: string;
    page: PageType;
    position?: number;
    constructor(data?: Partial<GeneralInfo>);
}
export interface GeneralInfoRelations {
}
export type GeneralInfoWithRelations = GeneralInfo & GeneralInfoRelations;
