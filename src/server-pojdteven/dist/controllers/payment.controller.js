"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const services_1 = require("../services");
let PaymentController = class PaymentController {
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    async generatePaymentQR(amount, variableSymbol, accountNumber, message, returnType = 'string') {
        return this.paymentService.generatePaymentQR(amount, accountNumber, variableSymbol, message, returnType);
    }
};
exports.PaymentController = PaymentController;
tslib_1.__decorate([
    (0, rest_1.get)('/payment/qr'),
    (0, rest_1.response)(200, {
        description: 'Generate payment QR',
        content: {
            'application/json': {
                schema: {
                    type: 'string',
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.query.number('amount')),
    tslib_1.__param(1, rest_1.param.query.string('variableSymbol')),
    tslib_1.__param(2, rest_1.param.query.string('accountNumber')),
    tslib_1.__param(3, rest_1.param.query.string('message')),
    tslib_1.__param(4, rest_1.param.query.string('returnType')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, String, String, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], PaymentController.prototype, "generatePaymentQR", null);
exports.PaymentController = PaymentController = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.service)(services_1.PaymentService)),
    tslib_1.__metadata("design:paramtypes", [services_1.PaymentService])
], PaymentController);
//# sourceMappingURL=payment.controller.js.map