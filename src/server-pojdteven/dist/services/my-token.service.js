"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyTokenService = void 0;
const tslib_1 = require("tslib");
const authentication_jwt_1 = require("@loopback/authentication-jwt");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const security_1 = require("@loopback/security");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
let MyTokenService = class MyTokenService {
    constructor(secret, expiresIn) {
        this.secret = secret;
        this.expiresIn = expiresIn;
    }
    // Parse request and return MyUserProfile
    async verifyToken(token) {
        if (!token) {
            throw rest_1.HttpErrors.Unauthorized('Chyba při ověřování tokenu.');
        }
        let userProfile;
        try {
            const decodedToken = jsonwebtoken_1.default.verify(token, this.secret);
            userProfile = Object.assign({ [security_1.securityId]: '', fullName: '' }, {
                [security_1.securityId]: decodedToken.id,
                id: decodedToken.id,
                email: decodedToken.email,
                role: decodedToken.role,
                fullName: decodedToken.fullName,
            });
        }
        catch (error) {
            throw rest_1.HttpErrors.Unauthorized(`Chyba při ověřování tokenu: ${error.message}`);
        }
        return userProfile;
    }
    // Create token
    async generateToken(userProfile) {
        if (!userProfile) {
            throw rest_1.HttpErrors.Unauthorized('Chyba při generování tokenu. Uživatel má hodnotu null.');
        }
        const userInfoForToken = {
            id: userProfile[security_1.securityId],
            email: userProfile.email,
            role: userProfile.role,
            fullName: userProfile.fullName,
        };
        let token;
        try {
            token = jsonwebtoken_1.default.sign(userInfoForToken, this.secret, {
                expiresIn: this.expiresIn,
            });
        }
        catch (error) {
            throw rest_1.HttpErrors.Unauthorized(`Chyba při generování tokenu: ${error.message}`);
        }
        return token;
    }
    revokeToken(token) {
        throw new Error('Method not implemented.');
    }
};
exports.MyTokenService = MyTokenService;
exports.MyTokenService = MyTokenService = tslib_1.__decorate([
    (0, core_1.injectable)({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__param(0, (0, core_1.inject)(authentication_jwt_1.TokenServiceBindings.TOKEN_SECRET)),
    tslib_1.__param(1, (0, core_1.inject)(authentication_jwt_1.TokenServiceBindings.TOKEN_EXPIRES_IN)),
    tslib_1.__metadata("design:paramtypes", [String, String])
], MyTokenService);
//# sourceMappingURL=my-token.service.js.map