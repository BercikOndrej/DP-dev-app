"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyAuthorizationProvider = void 0;
const authorization_1 = require("@loopback/authorization");
class MyAuthorizationProvider {
    /**
     * @returns an authorizer function
     *
     */
    value() {
        return this.authorize.bind(this);
    }
    async authorize(context, metadata) {
        var _a;
        const principalRole = context.principals[0].role;
        if ((_a = metadata.allowedRoles) === null || _a === void 0 ? void 0 : _a.some(role => role === principalRole)) {
            return authorization_1.AuthorizationDecision.ALLOW;
        }
        return authorization_1.AuthorizationDecision.DENY;
    }
}
exports.MyAuthorizationProvider = MyAuthorizationProvider;
//# sourceMappingURL=MyAuthorizationProvider.js.map