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
import {Action} from '../models';
import {ActionService} from '../services';

const ENDPOINT = '/actions';
const ADMIN_ENDPOINT = '/admin/actions';

export class ActionController {
  constructor(
    @service(ActionService)
    private actionService: ActionService,
  ) {}

  // Create Action
  @authenticate('jwt')
  @authorize({
    allowedRoles: [Role.ADMIN],
  })
  @post(ADMIN_ENDPOINT)
  @response(200, {
    description: 'Action model instance',
    content: {'application/json': {schema: getModelSchemaRef(Action)}},
  })
  async createAction(@requestBody.file() request: Request): Promise<Action> {
    return this.actionService.createAction(request);
  }

  @get(ENDPOINT)
  @response(200, {
    description: 'Array of Action model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Action, {includeRelations: true}),
        },
      },
    },
  })
  async getActions(): Promise<Action[]> {
    return this.actionService.getActions();
  }

  @get(`${ENDPOINT}/{id}`)
  @response(200, {
    description: 'Action model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Action, {includeRelations: true}),
      },
    },
  })
  async getAction(@param.path.string('id') id: string): Promise<Action> {
    return this.actionService.getAction(id);
  }

  @authenticate('jwt')
  @authorize({
    allowedRoles: [Role.ADMIN],
  })
  @del(`${ADMIN_ENDPOINT}/{id}`)
  @response(204, {
    description: 'Action DELETE success',
  })
  async deleteAction(@param.path.string('id') id: string): Promise<void> {
    await this.actionService.deleteAction(id);
  }
}
