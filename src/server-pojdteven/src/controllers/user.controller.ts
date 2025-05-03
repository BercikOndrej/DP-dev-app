import {authenticate} from '@loopback/authentication';
import {UserServiceBindings} from '@loopback/authentication-jwt';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  Request,
  requestBody,
  response,
  SchemaObject,
} from '@loopback/rest';
import {SecurityBindings} from '@loopback/security';
import {Role} from '../enums';
import {Address, Child, User} from '../models';
import {Credentials, MyUserProfile, MyUserService} from '../services';

const ENDPOINT = '/users';
const ADMIN_ENDPOINT = '/admin/users';

export type NewUserObject = {
  email: string;
  role: Role;
  fullName: string;
  dateOfBirth?: string;
  description?: string;
  academicTitle?: string;
  phoneNumber: string;
  address: Address;
  note?: string;
  password: string;
};

// Must be here because loopback has wrong reference for User and include relations
const UserWithAddressSchema: SchemaObject = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    email: {
      type: 'string',
      format: 'email',
    },
    role: {
      type: 'string',
    },
    fullName: {
      type: 'string',
    },
    dateOfBirth: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    academicTitle: {
      type: 'string',
    },
    phoneNumber: {
      type: 'string',
    },
    address: {
      type: 'object',
      required: ['houseNumber', 'city', 'zip'],
      properties: {
        id: {
          type: 'string',
        },
        street: {
          type: 'string',
        },
        houseNumber: {
          type: 'string',
        },
        city: {
          type: 'string',
        },
        zipCode: {
          type: 'string',
        },
        note: {
          type: 'string',
        },
      },
    },
    note: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
  },
};

const NewUserSchema: SchemaObject = {
  type: 'object',
  required: ['email', 'role', 'fullName', 'phoneNumber', 'address', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    role: {
      type: 'string',
    },
    fullName: {
      type: 'string',
    },
    dateOfBirth: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    academicTitle: {
      type: 'string',
    },
    phoneNumber: {
      type: 'string',
    },
    address: {
      type: 'object',
      required: ['houseNumber', 'city', 'zip'],
      properties: {
        street: {
          type: 'string',
        },
        houseNumber: {
          type: 'string',
        },
        city: {
          type: 'string',
        },
        zipCode: {
          type: 'string',
        },
        note: {
          type: 'string',
        },
      },
    },
    note: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
  },
};

export const NewUserRequestBody = {
  description: 'Data for signup user',
  required: true,
  content: {
    'application/json': {schema: NewUserSchema},
  },
};

const CredentialsSchema: SchemaObject = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
    },
  },
};

export const CredentialsRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': {schema: CredentialsSchema},
  },
};

export class UserController {
  constructor(
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
    @inject(SecurityBindings.USER, {optional: true})
    public user: MyUserProfile,
  ) {}

  // Testing -> populate DB
  // @authenticate('jwt')
  // @authorize({
  //   allowedRoles: [Role.ADMIN],
  // })
  // @post(`${ADMIN_ENDPOINT}/dev/testData`)
  // async populateDb() {
  //   for (const teacher of teachers) {
  //     await this.userService.signup(teacher);
  //   }
  // }

  // Clasic CRUD operation
  // ---------------------------------------------------------------------

  // Delete user
  @authenticate('jwt')
  @authorize({
    allowedRoles: [Role.ADMIN],
  })
  @del(`${ADMIN_ENDPOINT}/{id}`)
  @response(204, {
    description: 'User DELETE success',
  })
  async deleteUser(@param.path.string('id') id: string): Promise<void> {
    await this.userService.deleteUser(id);
  }

  // Upload image for user
  @authenticate('jwt')
  @authorize({
    allowedRoles: [Role.ADMIN, Role.TEACHER],
  })
  @post(`${ENDPOINT}/{id}/imageUpload`)
  @response(204, {
    description: 'Upload user image success',
  })
  async uploadUserImage(
    @requestBody.file() request: Request,
    @param.path.string('id') id: string,
  ): Promise<void> {
    await this.userService.uploadUserImage(request, id);
  }

  // Update user
  @authenticate('jwt')
  @authorize({
    allowedRoles: Object.values(Role),
  })
  @put(`${ENDPOINT}/{id}`)
  @response(204, {
    description: 'User PUT success',
  })
  async updateUser(
    @param.path.string('id') id: string,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userService.updateUser(id, user);
  }

  // Update user address
  @authenticate('jwt')
  @authorize({
    allowedRoles: Object.values(Role),
  })
  @put(`${ENDPOINT}/{id}/address`)
  @response(204, {
    description: 'User PUT success',
  })
  async updateUserAddress(
    @param.path.string('id') id: string,
    @requestBody() address: Address,
  ): Promise<void> {
    await this.userService.updateUserAddress(id, address);
  }

  // Change user password
  @authenticate('jwt')
  @authorize({
    allowedRoles: Object.values(Role),
  })
  @patch(`${ENDPOINT}/{id}/changePassword`)
  @response(204, {
    description: 'Change and save user password SUCCESS.',
  })
  async changeUserPassword(
    @param.path.string('id') id: string,
    @requestBody() passwords: {actualPassword: string; newPassword: string},
  ): Promise<void> {
    await this.userService.changeUserPassword(
      id,
      passwords.actualPassword,
      passwords.newPassword,
    );
  }

  // Get user
  @authenticate('jwt')
  @authorize({
    allowedRoles: Object.values(Role),
  })
  @get(`${ENDPOINT}/{id}`)
  @response(200, {
    description: 'User model instance',
    content: {
      'application/json': {
        schema: UserWithAddressSchema,
      },
    },
  })
  async getUser(@param.path.string('id') id: string): Promise<User> {
    return this.userService.getUser(id);
  }

  // Get all users
  @authenticate('jwt')
  @authorize({
    allowedRoles: [Role.ADMIN],
  })
  @get(ADMIN_ENDPOINT)
  @response(200, {
    description: 'Array of User model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: UserWithAddressSchema,
        },
      },
    },
  })
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  // Get only teachers
  @get(`${ENDPOINT}/teachers`)
  @response(200, {
    description: 'Array of User model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User),
        },
      },
    },
  })
  async getTeachers(): Promise<User[]> {
    return this.userService.getTeachers();
  }

  // Get user children
  @authenticate('jwt')
  @authorize({
    allowedRoles: Object.values(Role),
  })
  @get(`${ENDPOINT}/{id}/children`)
  @response(200, {
    description: 'Array of Child model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Child),
        },
      },
    },
  })
  async getChidren(@param.path.string('id') id: string): Promise<Child[]> {
    return this.userService.getChildren(id);
  }

  // Get teachers with attendance on given date
  @authenticate('jwt')
  @authorize({
    allowedRoles: Object.values(Role),
  })
  @get(`${ENDPOINT}/teachers/onDate`)
  @response(200, {
    description: 'Array of User model instances that works on given date.',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User),
        },
      },
    },
  })
  async getWorkingTeachersOnDate(
    @param.query.string('date') date: string,
  ): Promise<User[]> {
    return this.userService.getWorkingTeachersOnDate(date);
  }

  // User functions
  // ------------------------------------------------------------------------

  // Login function
  @post(`${ENDPOINT}/login`, {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<{token: string}> {
    return this.userService.login(credentials);
  }

  // Function for geting information about current user
  @authenticate('jwt')
  @authorize({
    allowedRoles: Object.values(Role),
  })
  @get(`${ENDPOINT}/whoAmI`, {
    responses: {
      '200': {
        description: 'Return current user',
        content: {
          'application/json': {
            schema: {
              type: 'string',
            },
          },
        },
      },
    },
  })
  async whoAmI(
    @inject(SecurityBindings.USER)
    currentUserProfile: MyUserProfile,
  ): Promise<string> {
    // Now I just returned only id of user, but you can return all user profile
    return this.userService.whoAmI(currentUserProfile);
  }

  // Function for sign up a user
  @post(`${ENDPOINT}/signup`, {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  async signup(
    @requestBody(NewUserRequestBody)
    newUserRequest: NewUserObject,
  ): Promise<User> {
    return this.userService.signup(newUserRequest);
  }
}
