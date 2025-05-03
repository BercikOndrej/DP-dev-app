"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkConfig = void 0;
const tslib_1 = require("tslib");
const config_1 = tslib_1.__importDefault(require("config"));
const configKeys = [
    'jwt.secret',
    'jwt.expiresIn',
    'db.host',
    'db.port',
    'db.user',
    'db.password',
    'db.database',
    'payment.defaultAccount',
    'payment.defaultVariableSymbol',
    'email.user',
    'email.sendGrid_api_key',
    'frontendDomain',
    'backendDomain',
];
function checkConfig() {
    for (const key of configKeys) {
        if (!config_1.default.get(key)) {
            console.error(`FATAL ERROR: config key ${key} is not set.`);
            process.exit(1);
        }
    }
}
exports.checkConfig = checkConfig;
//# sourceMappingURL=checkConfig.js.map