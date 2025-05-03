import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {service} from '@loopback/core';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {Role} from '../enums';
import {Parenthood} from '../models';
import {ParenthoodService} from '../services';

const ADMIN_ENDPOINT = '/admin/parenthood';

export class ParenthoodController {
  constructor(
    @service(ParenthoodService) private parenthoodService: ParenthoodService,
  ) {}

  // Create realtionship
  @authenticate('jwt')
  @authorize({
    allowedRoles: [Role.ADMIN],
  })
  @post(ADMIN_ENDPOINT)
  @response(200, {
    description: 'Parenthood model instance',
    content: {'application/json': {schema: getModelSchemaRef(Parenthood)}},
  })
  async createParenthood(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parenthood, {
            title: 'NewParenthood',
            exclude: ['id'],
          }),
        },
      },
    })
    parenthood: Omit<Parenthood, 'id'>,
  ): Promise<Parenthood> {
    return this.parenthoodService.createParenthood(parenthood);
  }

  // Delete parenthood
  @authenticate('jwt')
  @authorize({
    allowedRoles: [Role.ADMIN],
  })
  @del(`${ADMIN_ENDPOINT}/{id}`)
  @response(204, {
    description: 'Parenthood DELETE success',
  })
  async deleteParenthood(@param.path.string('id') id: string): Promise<void> {
    await this.parenthoodService.deleteParenthood(id);
  }

  @authenticate('jwt')
  @authorize({
    allowedRoles: [Role.ADMIN],
  })
  @get(ADMIN_ENDPOINT)
  @response(200, {
    description: 'Array of Parenthood model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Parenthood),
        },
      },
    },
  })
  async getAllParenthoodItems(): Promise<Parenthood[]> {
    return this.parenthoodService.getAllParenthoodItems();
  }

  @authenticate('jwt')
  @authorize({
    allowedRoles: [Role.ADMIN],
  })
  @get(ADMIN_ENDPOINT)
  @response(200, {
    description: 'Array of Parenthood model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Parenthood),
        },
      },
    },
  })
  async getUserParenthoodItems(
    @param.query.string('userId') userId: string,
  ): Promise<Parenthood[]> {
    return this.parenthoodService.getUserParenthoodItems(userId);
  }
}
