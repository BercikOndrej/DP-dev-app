/// <reference types="express" />
import { Request } from '@loopback/rest';
import { Photo } from '../models';
import { PhotoRepository } from '../repositories';
import { FileUploadService } from './file-upload.service';
export declare class PhotoService {
    private photoRepo;
    private fileUploadService;
    constructor(photoRepo: PhotoRepository, fileUploadService: FileUploadService);
    createPhoto(request: Request, tag: string): Promise<Photo>;
    updatePhoto(id: string, photo: Photo): Promise<void>;
    deletePhoto(id: string): Promise<void>;
    getPhoto(id: string): Promise<Photo>;
    getPhotos(tag?: string): Promise<Photo[]>;
    private validatePhotoTag;
}
