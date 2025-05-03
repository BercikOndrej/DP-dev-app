import {service} from '@loopback/core';
import {get, param, response} from '@loopback/rest';
import {PaymentService} from '../services';

export class PaymentController {
  constructor(
    @service(PaymentService) private paymentService: PaymentService,
  ) {}

  @get('/payment/qr')
  @response(200, {
    description: 'Generate payment QR',
    content: {
      'application/json': {
        schema: {
          type: 'string',
        },
      },
    },
  })
  async generatePaymentQR(
    @param.query.number('amount') amount: number,
    @param.query.string('variableSymbol') variableSymbol?: string,
    @param.query.string('accountNumber') accountNumber?: string,
    @param.query.string('message') message?: string,
    @param.query.string('returnType')
    returnType: 'string' | 'buffer' = 'string',
  ): Promise<Buffer | string> {
    return this.paymentService.generatePaymentQR(
      amount,
      accountNumber,
      variableSymbol,
      message,
      returnType,
    );
  }
}
