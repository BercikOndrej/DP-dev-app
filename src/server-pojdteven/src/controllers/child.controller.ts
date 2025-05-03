import {authenticate} from '@loopback/authentication';
import {User} from '@loopback/authentication-jwt';
import {authorize} from '@loopback/authorization';
import {service} from '@loopback/core';
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
import {Role} from '../enums';
import {Child} from '../models';
import {ChildService} from '../services';

const ENDPOINT = '/children';
const ADMIN_ENDPOINT = '/admin/children';

export class ChildController {
  constructor(@service(ChildService) private childService: ChildService) {}

  // Create child
  @authenticate('jwt')
  @authorize({
    allowedRoles: [Role.ADMIN],
  })
  @post(ADMIN_ENDPOINT)
  @response(200, {
    description: 'Child model instance',
    content: {
      'application/json': {schema: getModelSchemaRef(Child)},
    },
  })
  async createChild(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Child, {
            title: 'NewChild',
            exclude: ['id'],
          }),
        },
      },
    })
    child: Omit<Child, 'id'>,
  ): Promise<Child> {
    return this.childService.createChild(child);
  }

  // Delete child
  @authenticate('jwt')
  @authorize({
    allowedRoles: [Role.ADMIN],
  })
  @del(`${ADMIN_ENDPOINT}/{id}`)
  @response(204, {
    description: 'Delete Child instance success',
  })
  async deleteChild(@param.path.string('id') id: string): Promise<void> {
    await this.childService.deleteChild(id);
  }

  // Update child
  @authenticate('jwt')
  @authorize({
    allowedRoles: [Role.ADMIN, Role.USER],
  })
  @put(`${ENDPOINT}/{id}`)
  @response(204, {
    description: 'update Child success',
  })
  async updateChild(
    @param.path.string('id') id: string,
    @requestBody() child: Child,
  ) {
    await this.childService.updateChild(id, child);
  }

  // Get all children
  @authenticate('jwt')
  @authorize({
    allowedRoles: [Role.ADMIN, Role.TEACHER],
  })
  @get(ENDPOINT)
  @response(200, {
    description: 'Array of child model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Child, {includeRelations: true}),
        },
      },
    },
  })
  async getChildren(): Promise<Child[]> {
    return this.childService.getChildren();
  }

  // Get a child
  @authenticate('jwt')
  @authorize({
    allowedRoles: Object.values(Role),
  })
  @get(`${ENDPOINT}/{id}`)
  @response(200, {
    description: 'Child model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Child),
      },
    },
  })
  async getChild(@param.path.string('id') id: string): Promise<Child> {
    return this.childService.getChild(id);
  }

  // Get parents of the child
  @authenticate('jwt')
  @authorize({
    allowedRoles: Object.values(Role),
  })
  @get(`${ENDPOINT}/{id}/parents`)
  @response(200, {
    description: 'Array User model instance',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, {includeRelations: true}),
        },
      },
    },
  })
  async getChildParents(@param.path.string('id') id: string): Promise<User[]> {
    return this.childService.getChildParents(id);
  }

  // Get all children who has attendance on gicen date
  @authenticate('jwt')
  @authorize({
    allowedRoles: [Role.TEACHER, Role.ADMIN],
  })
  @get(`${ENDPOINT}/attendanceOnDate`)
  @response(200, {
    description:
      'Array of Child model instances that has attendance on given date.',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Child),
        },
      },
    },
  })
  async getChildrenWithAttendanceOnDate(
    @param.query.string('date') date: string,
  ): Promise<Child[]> {
    return this.childService.getChildrenWithAttendanceOnDate(date);
  }
}
