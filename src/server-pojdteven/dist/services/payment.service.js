"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const config_1 = tslib_1.__importDefault(require("config"));
const qrcode_1 = tslib_1.__importDefault(require("qrcode"));
const zod_1 = require("zod");
const DEFAULT_ACCOUNT = config_1.default.get('payment.defaultAccount');
const DEFAULT_VARIABLE_SYMBOL = config_1.default.get('payment.defaultVariableSymbol');
const DEFAULT_MESSAGE = 'Finanční dar';
let PaymentService = class PaymentService {
    constructor() { }
    async generatePaymentQR(amount, accountNumber, variableSymbol, message, returnType = 'string') {
        accountNumber = accountNumber !== null && accountNumber !== void 0 ? accountNumber : DEFAULT_ACCOUNT;
        message = message || DEFAULT_MESSAGE;
        variableSymbol = variableSymbol || DEFAULT_VARIABLE_SYMBOL;
        accountNumber = accountNumber || DEFAULT_ACCOUNT;
        const paymentData = {
            amount,
            accountNumber,
            variableSymbol,
            message,
        };
        this.validatePaymentData(paymentData);
        const SPAYDString = `SPD*1.0*ACC:${accountNumber}*AM:${amount.toFixed(2)}*CC:CZK*PT:IP*X-VS:${variableSymbol}*MSG:${message}*`;
        if (returnType === 'string') {
            return await qrcode_1.default.toDataURL(SPAYDString, { errorCorrectionLevel: 'H' });
        }
        else {
            return await qrcode_1.default.toBuffer(SPAYDString, { errorCorrectionLevel: 'H' });
        }
    }
    // Validating variable symbol
    validatePaymentData(paymentData) {
        const schema = zod_1.z.object({
            amount: zod_1.z.number().positive({ message: 'Amount must be positive' }),
            accountNumber: zod_1.z.string().regex(/^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/, {
                message: 'Číslo účtu musí být ve formátu IBAN.',
            }),
            variableSymbol: zod_1.z.string().regex(/^\d+$/, {
                message: 'Variabilní symbol musí obsahovat pouze číslice.',
            }),
            message: zod_1.z
                .string()
                .max(60, { message: 'Zprává může mít maximálně 60 znaků.' })
                .regex(/^[^*]*$/, { message: "Zpráva nesmí obsahovat znak: '*'" }),
        });
        const { error } = schema.safeParse(paymentData);
        if (error) {
            throw rest_1.HttpErrors.BadRequest(error.errors[0].message);
        }
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = tslib_1.__decorate([
    (0, core_1.injectable)({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__metadata("design:paramtypes", [])
], PaymentService);
//# sourceMappingURL=payment.service.js.map