import { BindingScope, injectable, service } from '@loopback/core';
import { repository } from '@loopback/repository';
import { HttpErrors, Request } from '@loopback/rest';
import z from 'zod';
import { PhotoTag } from '../enums';
import { Photo } from '../models';
import { PhotoRepository } from '../repositories';
import { FileUpload, FileUploadService } from './file-upload.service';
import { createThumbnail } from '../utils/thumbnail';

const STATIC_FILES_PHOTOGALLERY_PATH = 'static/photogallery/';
const STATIC_FILES_THUMBNAILS_PATH = 'static/thumbnails/';

@injectable({ scope: BindingScope.TRANSIENT })
export class PhotoService {
  constructor(
    @repository(PhotoRepository) private photoRepo: PhotoRepository,
    @service(FileUploadService) private fileUploadService: FileUploadService,
  ) {}

  // Create photo object
  async createPhoto(request: Request, tag: string): Promise<Photo> {
    this.validatePhotoTag(tag);

    let photo = new Photo();
    photo.tag = tag as PhotoTag;
    photo = await this.photoRepo.create(photo);
    const fileName = `photo-${photo.id}`;
    try {
      const files: FileUpload[] =
        await this.fileUploadService.processFileUpload(
          request,
          STATIC_FILES_PHOTOGALLERY_PATH,
          fileName,
          true,
        );
      photo.imagePath = STATIC_FILES_PHOTOGALLERY_PATH + files[0].filename;
      // Create a thumbnail for a photo
      await this.photoRepo.updateById(photo.id, photo);
      createThumbnail(files[0].filename);
    } catch (error) {
      await this.deletePhoto(photo.id!);
      throw HttpErrors.BadRequest(`Chyba při načítání obrázků: ${error}.`);
    }

    return photo;
  }

  // Update photo
  async updatePhoto(id: string, photo: Photo): Promise<void> {
    await this.photoRepo.updateById(id, photo);
  }

  // Delete photo
  async deletePhoto(id: string): Promise<void> {
    if (!(await this.photoRepo.exists(id))) {
      throw HttpErrors.NotFound('Foto nebylo nalezeno.');
    }

    const photoRegex = new RegExp(`^photo-${id}\\.[a-zA-Z]+$`);
    const thumbnailRegex = new RegExp(`^thumbnail-${id}\\.[a-zA-Z]+$`);
    // Delete photo
    await this.fileUploadService.deleteFile(
      photoRegex,
      STATIC_FILES_PHOTOGALLERY_PATH,
    );
    // Delete thumbnail
    await this.fileUploadService.deleteFile(
      thumbnailRegex,
      STATIC_FILES_THUMBNAILS_PATH,
    );

    await this.photoRepo.deleteById(id);
  }

  // Get one photo
  async getPhoto(id: string): Promise<Photo> {
    return this.photoRepo.findById(id);
  }

  // Get all photos
  async getPhotos(tag?: string): Promise<Photo[]> {
    if (!tag) {
      return this.photoRepo.find();
    }
    this.validatePhotoTag(tag);

    return this.photoRepo.find({
      where: {
        tag: tag as PhotoTag,
      },
    });
  }

  // Validate photo tag
  private validatePhotoTag(tag: string) {
    const PhotoTagEnum = z.nativeEnum(PhotoTag);
    type PhotoTagEnum = z.infer<typeof PhotoTagEnum>;
    const { error } = PhotoTagEnum.safeParse(tag);
    if (error) {
      throw HttpErrors.BadRequest(
        `Vlastnost PhotoTag musí být jedna z těchto hodnot: ${Object.values(PhotoTag)}.`,
      );
    }
  }
}
