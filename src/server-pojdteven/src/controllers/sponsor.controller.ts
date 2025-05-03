import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {service} from '@loopback/core';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  post,
  put,
  Request,
  requestBody,
  response,
} from '@loopback/rest';
import {Role} from '../enums';
import {Sponsor} from '../models';
import {SponsorService} from '../services';

const ENDPOINT = '/sponsors';
const ADMIN_ENDPOINT = '/admin/sponsors';

export class SponsorController {
  constructor(
    @service(SponsorService) private sponsorService: SponsorService,
  ) {}

  // Create sponsor
  @authenticate('jwt')
  @authorize({
    allowedRoles: [Role.ADMIN],
  })
  @post(ADMIN_ENDPOINT)
  @response(200, {
    description: 'Sponsor model instance',
    content: {'application/json': {schema: getModelSchemaRef(Sponsor)}},
  })
  async createSponsor(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sponsor, {
            title: 'NewSponsor',
            exclude: ['id', 'imagePath'],
          }),
        },
      },
    })
    sponsor: Omit<Sponsor, 'id' | 'imagePath'>,
  ): Promise<Sponsor> {
    return this.sponsorService.createSponsor(sponsor);
  }

  // Update sponsor
  @authenticate('jwt')
  @authorize({
    allowedRoles: [Role.ADMIN],
  })
  @put(`${ADMIN_ENDPOINT}/{id}`)
  @response(204, {
    description: 'Sponsor PUT success',
  })
  async updateSponsor(
    @param.path.string('id') id: string,
    @requestBody() sponsor: Sponsor,
  ): Promise<void> {
    await this.sponsorService.updateSponsor(id, sponsor);
  }

  // Upload sponsor image
  @authenticate('jwt')
  @authorize({
    allowedRoles: [Role.ADMIN],
  })
  @post(`${ADMIN_ENDPOINT}/{id}/imageUpload`)
  @response(204, {
    description: 'Upload sponsor image success',
  })
  async uploadSponsorImage(
    @param.path.string('id') id: string,
    @requestBody.file() request: Request,
  ): Promise<void> {
    await this.sponsorService.uploadSponsorImage(id, request);
  }

  // Delete sponsor
  @authenticate('jwt')
  @authorize({
    allowedRoles: [Role.ADMIN],
  })
  @del(`${ADMIN_ENDPOINT}/{id}`)
  @response(204, {
    description: 'Sponsor DELETE success',
  })
  async deleteSponsor(@param.path.string('id') id: string) {
    await this.sponsorService.deleteSponsor(id);
  }

  // Get sponsor
  @get(`${ENDPOINT}/{id}`)
  @response(200, {
    description: 'Sponsor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Sponsor, {includeRelations: true}),
      },
    },
  })
  async getSponsor(@param.path.string('id') id: string): Promise<Sponsor> {
    return this.sponsorService.getSponsor(id);
  }

  // Get all sponsors
  @get(ENDPOINT)
  @response(200, {
    description: 'Array of Sponsor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Sponsor, {includeRelations: true}),
        },
      },
    },
  })
  async getSponsors(): Promise<Sponsor[]> {
    return this.sponsorService.getSponsors();
  }
}
