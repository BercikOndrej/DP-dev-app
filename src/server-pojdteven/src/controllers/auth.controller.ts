import {service} from '@loopback/core';
import {param, post, put, requestBody, response} from '@loopback/rest';
import {AuthService} from '../services';

const ENDPOINT = '/auth';

export class AuthController {
  constructor(@service(AuthService) private authService: AuthService) {}

  // Forgot password request
  @post(`${ENDPOINT}/forgotPassword`)
  @response(204, {
    description: 'Request of forgotten password success',
  })
  async forgotPassword(
    @requestBody({
      description: 'email of user who forgot password',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
                format: 'email',
              },
            },
          },
        },
      },
    })
    request: {
      email: string;
    },
  ): Promise<void> {
    await this.authService.fotgotPassword(request.email);
  }

  // Reset password request
  @put(`${ENDPOINT}/resetPassword/{token}`)
  @response(204, {
    description: 'Reset password success',
  })
  async resetPassword(
    @param.path.string('token') token: string,
    @requestBody({
      description: 'new password',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              password: {
                type: 'string',
              },
            },
          },
        },
      },
    })
    request: {password: string},
  ): Promise<void> {
    await this.authService.resetPassword(token, request.password);
  }
}
