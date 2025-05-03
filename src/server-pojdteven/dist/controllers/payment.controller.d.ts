/// <reference types="node" />
/// <reference types="node" />
import { PaymentService } from '../services';
export declare class PaymentController {
    private paymentService;
    constructor(paymentService: PaymentService);
    generatePaymentQR(amount: number, variableSymbol?: string, accountNumber?: string, message?: string, returnType?: 'string' | 'buffer'): Promise<Buffer | string>;
}
