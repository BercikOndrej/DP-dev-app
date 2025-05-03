import {BindingScope, injectable} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import config from 'config';
import QRCode from 'qrcode';
import {z} from 'zod';

const DEFAULT_ACCOUNT = config.get('payment.defaultAccount') as string;
const DEFAULT_VARIABLE_SYMBOL = config.get(
  'payment.defaultVariableSymbol',
) as string;
const DEFAULT_MESSAGE = 'Finanční dar';

type PaymentData = {
  amount: number;
  accountNumber: string;
  variableSymbol: string;
  message: string;
};

@injectable({scope: BindingScope.TRANSIENT})
export class PaymentService {
  constructor() {}

  async generatePaymentQR(
    amount: number,
    accountNumber?: string,
    variableSymbol?: string,
    message?: string,
    returnType: 'string' | 'buffer' = 'string',
  ): Promise<Buffer | string> {
    accountNumber = accountNumber ?? DEFAULT_ACCOUNT;
    message = message || DEFAULT_MESSAGE;
    variableSymbol = variableSymbol || DEFAULT_VARIABLE_SYMBOL;
    accountNumber = accountNumber || DEFAULT_ACCOUNT;

    const paymentData: PaymentData = {
      amount,
      accountNumber,
      variableSymbol,
      message,
    };

    this.validatePaymentData(paymentData);

    const SPAYDString = `SPD*1.0*ACC:${accountNumber}*AM:${amount.toFixed(2)}*CC:CZK*PT:IP*X-VS:${variableSymbol}*MSG:${message}*`;

    if (returnType === 'string') {
      return await QRCode.toDataURL(SPAYDString, {errorCorrectionLevel: 'H'});
    } else {
      return await QRCode.toBuffer(SPAYDString, {errorCorrectionLevel: 'H'});
    }
  }

  // Validating variable symbol
  validatePaymentData(paymentData: PaymentData) {
    const schema = z.object({
      amount: z.number().positive({message: 'Amount must be positive'}),
      accountNumber: z.string().regex(/^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/, {
        message: 'Číslo účtu musí být ve formátu IBAN.',
      }),
      variableSymbol: z.string().regex(/^\d+$/, {
        message: 'Variabilní symbol musí obsahovat pouze číslice.',
      }),
      message: z
        .string()
        .max(60, {message: 'Zprává může mít maximálně 60 znaků.'})
        .regex(/^[^*]*$/, {message: "Zpráva nesmí obsahovat znak: '*'"}),
    });
    const {error} = schema.safeParse(paymentData);
    if (error) {
      throw HttpErrors.BadRequest(error.errors[0].message);
    }
  }
}
