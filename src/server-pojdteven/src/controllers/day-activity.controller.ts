// Uncomment these imports to begin using these cool features!

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
import { Role } from '../enums';
import { DayActivity } from '../models';
import { DayActivityService } from '../services';

const ENDPOINT = '/dayActivities';
const ADMIN_ENDPOINT = '/admin/dayActivities';

export class DayActivityController {
  constructor(
    @service(DayActivityService) private dayActivityService: DayActivityService,
  ) {}

  // Create dayActivity
  @authenticate('jwt')
  @authorize({
    allowedRoles: [Role.ADMIN],
  })
  @post(ADMIN_ENDPOINT)
  @response(200, {
    description: 'DayActivity model instance',
    content: { 'application/json': { schema: getModelSchemaRef(DayActivity) } },
  })
  async createDayActivity(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DayActivity, {
            title: 'newDayActivity',
            exclude: ['id'],
          }),
        },
      },
    })
    dayActivity: Omit<DayActivity, 'id'>,
  ): Promise<DayActivity> {
    return this.dayActivityService.createDayActivity(dayActivity);
  }

  // Delete dayActivity
  @authenticate('jwt')
  @authorize({
    allowedRoles: [Role.ADMIN],
  })
  @del(`${ADMIN_ENDPOINT}/{id}`)
  @response(204, {
    description: 'DayActivity DELETE success',
  })
  async deleteDayActivity(@param.path.number('id') id: number): Promise<void> {
    await this.dayActivityService.deleteDayActivity(id);
  }

  // Update dayActivity
  @authenticate('jwt')
  @authorize({
    allowedRoles: [Role.ADMIN],
  })
  @put(`${ADMIN_ENDPOINT}/{id}`)
  @response(204, {
    description: 'DayActivity PUT success',
  })
  async updateDayActivity(
    @param.path.number('id') id: number,
    @requestBody() dayActivity: DayActivity,
  ): Promise<void> {
    await this.dayActivityService.updateDayActivity(id, dayActivity);
  }

  // Get all day activities
  @get(ENDPOINT)
  @response(200, {
    description: 'Array of DayActivity model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(DayActivity, { includeRelations: true }),
        },
      },
    },
  })
  async getAllDayActivities() {
    return this.dayActivityService.getDayActivities();
  }

  // Get dayActivity by id
  @get(`${ENDPOINT}/{id}`)
  @response(200, {
    description: 'DayActivity model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(DayActivity, { includeRelations: true }),
      },
    },
  })
  async getDayActivity(@param.path.number('id') id: number) {
    return this.dayActivityService.getDayActivity(id);
  }
}
