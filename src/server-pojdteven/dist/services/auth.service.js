"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const tslib_1 = require("tslib");
const authentication_jwt_1 = require("@loopback/authentication-jwt");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const crypto_1 = tslib_1.__importDefault(require("crypto"));
const dayjs_1 = tslib_1.__importDefault(require("dayjs"));
const cs_1 = tslib_1.__importDefault(require("dayjs/locale/cs"));
const isToday_1 = tslib_1.__importDefault(require("dayjs/plugin/isToday"));
const toObject_1 = tslib_1.__importDefault(require("dayjs/plugin/toObject"));
const weekday_1 = tslib_1.__importDefault(require("dayjs/plugin/weekday"));
const email_service_1 = require("./email.service");
const my_user_service_1 = require("./my-user.service");
dayjs_1.default.extend(weekday_1.default);
dayjs_1.default.extend(toObject_1.default);
dayjs_1.default.extend(isToday_1.default);
let AuthService = class AuthService {
    constructor(userService, emailService) {
        this.userService = userService;
        this.emailService = emailService;
    }
    async fotgotPassword(email) {
        const user = await this.userService.findUser({
            where: {
                email: email,
            },
        });
        if (!user) {
            throw rest_1.HttpErrors.BadRequest('Uživatel s toutu emailovou adresou nebyl nalezen.');
        }
        // Crete random string
        const randomToken = crypto_1.default.randomBytes(256).toString('hex');
        const now = (0, dayjs_1.default)().locale({
            ...cs_1.default,
        });
        user.dateOfLastResetPasswordRequest = now.toDate();
        user.resetPasswordToken = randomToken;
        await this.userService.updateUserWithoutValidation(user.id, user);
        await this.emailService.sendEmailForPasswordReset(email, randomToken);
    }
    async resetPassword(token, password) {
        this.userService.validatePassword(password);
        const user = await this.userService.findUser({
            where: {
                resetPasswordToken: token,
            },
        });
        if (!user) {
            throw rest_1.HttpErrors.NotFound('Žádný uživatel pod tímto resetovacím tokenem nebyl nalezen.');
        }
        if (user.resetPasswordToken !== token) {
            throw rest_1.HttpErrors.BadRequest('Resetovací token není validní.');
        }
        const now = (0, dayjs_1.default)().locale({
            ...cs_1.default,
        });
        const userDate = (0, dayjs_1.default)(user.dateOfLastResetPasswordRequest);
        const dif = userDate.diff(now, 'minute');
        if (Math.abs(dif) > 10) {
            throw rest_1.HttpErrors.BadRequest('Platnost resetovacího linku vypršela (10 min).');
        }
        await this.userService.savedNewPassword(user.id, password);
        user.resetPasswordToken = null;
        user.dateOfLastResetPasswordRequest = null;
        await this.userService.updateUserWithoutValidation(user.id, user);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = tslib_1.__decorate([
    (0, core_1.injectable)({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__param(0, (0, core_1.inject)(authentication_jwt_1.UserServiceBindings.USER_SERVICE)),
    tslib_1.__param(1, (0, core_1.service)(email_service_1.EmailService)),
    tslib_1.__metadata("design:paramtypes", [my_user_service_1.MyUserService,
        email_service_1.EmailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map