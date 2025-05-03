import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {service} from '@loopback/core';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  post,
  Request,
  requestBody,
  response,
} from '@loopback/rest';
import {Role} from '../enums';
import {Photo} from '../models';
import {PhotoService} from '../services';

const ENDPOINT = '/photos';
const ADMIN_ENDPOINT = '/admin/photos';

export class PhotoController {
  constructor(@service(PhotoService) private photoService: PhotoService) {}

  // Create photo
  @authenticate('jwt')
  @authorize({
    allowedRoles: [Role.ADMIN],
  })
  @post(ADMIN_ENDPOINT)
  @response(200, {
    description: 'Photo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Photo)}},
  })
  async createPhoto(
    @requestBody.file() request: Request,
    @param.query.string('tag') tag: string,
  ): Promise<Photo> {
    return this.photoService.createPhoto(request, tag);
  }

  // Delete photo
  @authenticate('jwt')
  @authorize({
    allowedRoles: [Role.ADMIN],
  })
  @del(`${ADMIN_ENDPOINT}/{id}`)
  @response(204, {
    description: 'Photo DELETE success',
  })
  async deletePhoto(@param.path.string('id') id: string): Promise<void> {
    await this.photoService.deletePhoto(id);
  }

  // Get photo
  @get(`${ENDPOINT}/{id}`)
  @response(200, {
    description: 'Photo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Photo, {includeRelations: true}),
      },
    },
  })
  async getPhoto(@param.path.string('id') id: string): Promise<Photo> {
    return this.photoService.getPhoto(id);
  }

  // Get all photos
  @get(ENDPOINT)
  @response(200, {
    description: 'Array of Photo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Photo, {includeRelations: true}),
        },
      },
    },
  })
  async getPhotos(@param.query.string('tag') tag: string): Promise<Photo[]> {
    return this.photoService.getPhotos(tag);
  }
}
