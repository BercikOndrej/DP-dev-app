import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';
import { service } from '@loopback/core';
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
import { PageType, Role } from '../enums';
import { GeneralInfo } from '../models';
import { GeneralInfoService } from '../services';

const ENDPOINT = '/generalInfo';
const ADMIN_ENDPOINT = '/admin/generalInfo';

export class GeneralInfoController {
  constructor(
    @service(GeneralInfoService) private generaInfoService: GeneralInfoService,
  ) {}

  @authenticate('jwt')
  @authorize({
    allowedRoles: [Role.ADMIN],
  })
  @post(ADMIN_ENDPOINT)
  @response(200, {
    description: 'GeneralInfo model instance',
    content: { 'application/json': { schema: getModelSchemaRef(GeneralInfo) } },
  })
  async createInfo(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GeneralInfo, {
            title: 'NewGeneralInfo',
            exclude: ['id'],
          }),
        },
      },
    })
    generalInfo: Omit<GeneralInfo, 'id'>,
  ): Promise<GeneralInfo> {
    return this.generaInfoService.createInfo(generalInfo);
  }

  @get(ENDPOINT)
  @response(200, {
    description: 'Array of GeneralInfo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(GeneralInfo, { includeRelations: true }),
        },
      },
    },
  })
  async getInfo(
    @param.query.string('page') page: PageType,
  ): Promise<GeneralInfo[]> {
    return this.generaInfoService.getWholeInfo(page);
  }

  @authenticate('jwt')
  @authorize({
    allowedRoles: [Role.ADMIN],
  })
  @get(`${ADMIN_ENDPOINT}/{id}`)
  @response(200, {
    description: 'GeneralInfo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(GeneralInfo, { includeRelations: true }),
      },
    },
  })
  async getInfoById(@param.path.number('id') id: number): Promise<GeneralInfo> {
    return this.generaInfoService.getInfoById(id);
  }

  @authenticate('jwt')
  @authorize({
    allowedRoles: [Role.ADMIN],
  })
  @get(`${ADMIN_ENDPOINT}/nextPosition`)
  @response(200, {
    description: 'number represents next position of info items',
    content: {
      'application/json': {
        schema: {
          type: 'number',
        },
      },
    },
  })
  async getNextPositionOfInfoOnPage(
    @param.query.string('page') page: PageType,
  ): Promise<number> {
    return this.generaInfoService.getNextPositionOfInfoOnPage(page);
  }

  @authenticate('jwt')
  @authorize({
    allowedRoles: [Role.ADMIN],
  })
  @put(`${ADMIN_ENDPOINT}/{id}`)
  @response(204, {
    description: 'GeneralInfo PUT success',
  })
  async updateInfo(
    @param.path.number('id') id: number,
    @requestBody() generalInfo: GeneralInfo,
  ): Promise<void> {
    await this.generaInfoService.updateInfo(id, generalInfo);
  }

  @authenticate('jwt')
  @authorize({
    allowedRoles: [Role.ADMIN],
  })
  @del(`${ADMIN_ENDPOINT}/{id}`)
  @response(204, {
    description: 'GeneralInfo DELETE success',
  })
  async deleteInfo(@param.path.number('id') id: number): Promise<void> {
    await this.generaInfoService.deleteInfo(id);
  }
}
