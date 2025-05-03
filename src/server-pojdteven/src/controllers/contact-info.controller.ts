import { service } from '@loopback/core';
import { ContactInfoService } from '../services';

import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import { Role } from '../enums';
import { ContactInfo } from '../models';

const ENDPOINT = '/contactInfo';
const ADMIN_ENDPOINT = '/admin/contactInfo';

export class ContactInfoController {
  constructor(
    @service(ContactInfoService) private contactInfoService: ContactInfoService,
  ) {}

  // Create contactInfo
  @authenticate('jwt')
  @authorize({
    allowedRoles: [Role.ADMIN],
  })
  @post(ADMIN_ENDPOINT)
  @response(200, {
    description: 'DayActivity model instance',
    content: { 'application/json': { schema: getModelSchemaRef(ContactInfo) } },
  })
  async createContactInfo(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ContactInfo, {
            title: 'newContactInfo',
            exclude: ['id'],
          }),
        },
      },
    })
    contactInfo: Omit<ContactInfo, 'id'>,
  ): Promise<ContactInfo> {
    return this.contactInfoService.createContactInfo(contactInfo);
  }

  // Delete
  @authenticate('jwt')
  @authorize({
    allowedRoles: [Role.ADMIN],
  })
  @del(`${ADMIN_ENDPOINT}/{id}`)
  @response(204, {
    description: 'ContactInfo DELETE success',
  })
  async deleteContactInfo(@param.path.number('id') id: number): Promise<void> {
    await this.contactInfoService.deleteContactInfo(id);
  }

  // Update contactInfo
  @authenticate('jwt')
  @authorize({
    allowedRoles: [Role.ADMIN],
  })
  @put(`${ADMIN_ENDPOINT}/{id}`)
  @response(204, {
    description: 'ContactInfo PUT success',
  })
  async updateContactInfo(
    @param.path.number('id') id: number,
    @requestBody() contactInfo: ContactInfo,
  ): Promise<void> {
    await this.contactInfoService.updateContactInfo(id, contactInfo);
  }

  // Get all contactInfo
  @get(ENDPOINT)
  @response(200, {
    description: 'Array of ContactInfo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ContactInfo, { includeRelations: true }),
        },
      },
    },
  })
  async getAllContactInfo() {
    return this.contactInfoService.getAllContactInfo();
  }

  // Get contactInfo by id
  @get(`${ENDPOINT}/{id}`)
  @response(200, {
    description: 'ContactInfo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ContactInfo, { includeRelations: true }),
      },
    },
  })
  async getOneContactInfo(@param.path.number('id') id: number) {
    return this.contactInfoService.getOneContactInfo(id);
  }
}
