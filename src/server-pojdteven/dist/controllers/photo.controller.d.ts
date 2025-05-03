/// <reference types="express" />
import { Request } from '@loopback/rest';
import { Photo } from '../models';
import { PhotoService } from '../services';
export declare class PhotoController {
    private photoService;
    constructor(photoService: PhotoService);
    createPhoto(request: Request, tag: string): Promise<Photo>;
    deletePhoto(id: string): Promise<void>;
    getPhoto(id: string): Promise<Photo>;
    getPhotos(tag: string): Promise<Photo[]>;
}
