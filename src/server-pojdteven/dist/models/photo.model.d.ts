import { Entity } from '@loopback/repository';
import { PhotoTag } from '../enums/PhotoTag';
export declare class Photo extends Entity {
    id?: string;
    existsFrom: Date;
    imagePath?: string;
    tag: PhotoTag;
    constructor(data?: Partial<Photo>);
}
export interface PhotoRelations {
}
export type PhotoWithRelations = Photo & PhotoRelations;
