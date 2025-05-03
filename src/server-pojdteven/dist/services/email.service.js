"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const config_1 = tslib_1.__importDefault(require("config"));
const mail_1 = tslib_1.__importDefault(require("@sendgrid/mail"));
const getNewUserHtmlEmail_1 = tslib_1.__importDefault(require("../utils/getNewUserHtmlEmail"));
const getTeacherChangeInfoHtmlEmail_1 = tslib_1.__importDefault(require("../utils/getTeacherChangeInfoHtmlEmail"));
const getPasswordHtmlEmail_1 = tslib_1.__importDefault(require("../utils/getPasswordHtmlEmail"));
mail_1.default.setApiKey(config_1.default.get('email.sendGrid_api_key'));
const emailUser = config_1.default.get('email.user');
let EmailService = class EmailService {
    constructor() { }
    async sendEmailForPasswordReset(email, token) {
        try {
            const msg = {
                to: email,
                from: emailUser,
                subject: 'Resetování hesla - Lesní dětský klub pojďte ven',
                text: 'Resetování hesla\n\nDobrý den,\nTento email byl zaslán na základě Vaší žádosti o resetování hesla.\n\nResetovat heslo\n\nPokud jste nežádal/a o resetování hesla, doporučujeme vám zkontrolovat Váš účet.\nVáš tým Lesního dětského klubu Pojďte ven',
                html: (0, getPasswordHtmlEmail_1.default)(token),
            };
            await mail_1.default.send(msg);
            console.info(`Message to ${email} was succefuly sent!`);
        }
        catch (error) {
            console.log(error);
            throw rest_1.HttpErrors.InternalServerError('Zaslání emailu bylo neúspěšné.');
        }
    }
    async sendGeneratedPasswordToNewUser(email, password) {
        try {
            const msg = {
                to: email,
                from: emailUser,
                subject: 'Registrace - Lesní dětský klub pojďte ven',
                text: 'Registrace nového uživatele\n\nDobrý den,\nTento email Vám byl zaslán na základě nové registrace uživatele.\n\nVaše nové přihlašovací údaje:\n\nEmail: ...\nHeslo: ...\n\nHeslo si můžete po přihlášení samozřejmě změnit dle Vaší libosti.\n\nVáš tým Lesního dětského klubu Pojďte ven',
                html: (0, getNewUserHtmlEmail_1.default)(email, password),
            };
            await mail_1.default.send(msg);
            console.info(`Message to ${email} was succefuly sent!`);
        }
        catch (error) {
            console.log(error);
            throw rest_1.HttpErrors.InternalServerError('Zaslání emailu novému uživately bylo neúspěšné.');
        }
    }
    async sendEmailOfAttendanceChangeToUsers(userEmails, originTeacher, nextTeacher, date) {
        if (!userEmails || userEmails.length < 1) {
            return;
        }
        const datum = date.format('D. M. YYYY');
        try {
            const msg = {
                to: userEmails,
                from: emailUser,
                subject: 'Změna průvodce',
                text: `Hlásíme změnu průvodce!\n\nDobrý den,\nTento email Vám byl zaslán za účelem oznámení, že naposlední chvíli měníme obsazení průvodců na den ${datum}\n\nPůvodní průvodce: ${originTeacher}\n\nNový průvodce: ${nextTeacher}\n\n
        Váš tým Lesního dětského klubu Pojďte ven`,
                html: (0, getTeacherChangeInfoHtmlEmail_1.default)(originTeacher, nextTeacher, date),
            };
            await mail_1.default.send(msg);
            console.info(`Messages to ${userEmails} was succefuly sent!`);
        }
        catch (error) {
            console.log(error);
            throw rest_1.HttpErrors.InternalServerError('Zaslání emailu uživatelům daného dne nebylo úspěšné.');
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = tslib_1.__decorate([
    (0, core_1.injectable)({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__metadata("design:paramtypes", [])
], EmailService);
//# sourceMappingURL=email.service.js.map