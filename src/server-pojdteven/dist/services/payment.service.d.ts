/// <reference types="node" />
/// <reference types="node" />
type PaymentData = {
    amount: number;
    accountNumber: string;
    variableSymbol: string;
    message: string;
};
export declare class PaymentService {
    constructor();
    generatePaymentQR(amount: number, accountNumber?: string, variableSymbol?: string, message?: string, returnType?: 'string' | 'buffer'): Promise<Buffer | string>;
    validatePaymentData(paymentData: PaymentData): void;
}
export {};
