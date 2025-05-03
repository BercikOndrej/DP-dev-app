"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyUserService = void 0;
const tslib_1 = require("tslib");
const authentication_jwt_1 = require("@loopback/authentication-jwt");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const security_1 = require("@loopback/security");
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
const dayjs_1 = tslib_1.__importDefault(require("dayjs"));
const cs_1 = tslib_1.__importDefault(require("dayjs/locale/cs"));
const zod_1 = require("zod");
const enums_1 = require("../enums");
const repositories_1 = require("../repositories");
const attendance_service_1 = require("./attendance.service");
const email_service_1 = require("./email.service");
const file_upload_service_1 = require("./file-upload.service");
const my_token_service_1 = require("./my-token.service");
const parenthood_service_1 = require("./parenthood.service");
const STATIC_FILES_USERS_PATH = 'static/users/';
let MyUserService = class MyUserService {
    constructor(userRepo, jwtService, fileUploadService, emailService, parenthoodService, attendanceService) {
        this.userRepo = userRepo;
        this.jwtService = jwtService;
        this.fileUploadService = fileUploadService;
        this.emailService = emailService;
        this.parenthoodService = parenthoodService;
        this.attendanceService = attendanceService;
    }
    // Clasic CRUD operation
    // ---------------------------------------------------------------------
    // Create user
    async createUser(newUser) {
        this.validateNewUser(newUser);
        const user = { imagePath: '', ...newUser };
        return this.userRepo.create(user);
    }
    // Delete user
    async deleteUser(id) {
        const user = await this.userRepo.findById(id);
        if (!user) {
            throw rest_1.HttpErrors.NotFound('Uživatel nebyl nalezen.');
        }
        if (user.imagePath) {
            await this.deleteUserImage(id);
        }
        if (user.role === enums_1.Role.TEACHER) {
            await this.attendanceService.deleteAllAttendanceItemsOfUser(id);
        }
        await this.userRepo.userCredentials(id).delete();
        await this.userRepo.address(id).delete();
        await this.parenthoodService.deleteAllUserRelations(id);
        await this.userRepo.deleteById(id);
    }
    // Delete user image
    async deleteUserImage(id) {
        const regex = new RegExp(`^user-${id}\\.[a-zA-Z]+$`);
        await this.fileUploadService.deleteFile(regex, STATIC_FILES_USERS_PATH);
    }
    // Upload image for a user
    async uploadUserImage(request, id) {
        const user = await this.userRepo.findById(id);
        if (!user) {
            throw rest_1.HttpErrors.NotFound('Uživatel nebyl nalezen');
        }
        if (user.imagePath) {
            await this.deleteUserImage(id);
        }
        const fileName = `user-${id}`;
        try {
            const files = await this.fileUploadService.processFileUpload(request, STATIC_FILES_USERS_PATH, fileName, true);
            user.imagePath = STATIC_FILES_USERS_PATH + files[0].filename;
            await this.userRepo.updateById(id, user);
        }
        catch (error) {
            throw rest_1.HttpErrors.BadRequest(`Chyba při uploadu obrázku: ${error}`);
        }
    }
    // Update user
    async updateUser(id, user) {
        this.validateNewUser(user);
        if (!user.academicTitle) {
            user.academicTitle = undefined;
        }
        await this.userRepo.updateById(id, user);
    }
    // Update user without executing validation
    async updateUserWithoutValidation(id, user) {
        await this.userRepo.updateById(id, user);
    }
    // Update address of user
    async updateUserAddress(id, address) {
        this.validateAddress(address);
        await this.userRepo.address(id).patch(address);
    }
    // Change user password
    async changeUserPassword(id, actualPassword, newPassword) {
        const userCredentials = await this.userRepo.userCredentials(id).get();
        const passwordMatched = await bcrypt_1.default.compare(actualPassword, userCredentials.password);
        if (!passwordMatched) {
            throw rest_1.HttpErrors.BadRequest('Nesprávé aktuální heslo.');
        }
        await this.savedNewPassword(id, newPassword);
    }
    // Saved new password
    async savedNewPassword(id, password) {
        this.validatePassword(password);
        const hashedPassword = await this.hashPassword(password);
        await this.userRepo.userCredentials(id).patch({ password: hashedPassword });
    }
    // Get user
    async getUser(id) {
        const user = await this.userRepo.findOne({
            include: ['address'],
            where: {
                id: id,
            },
        });
        if (!user) {
            throw rest_1.HttpErrors.NotFound('Uživatel nebyl nalezen.');
        }
        return user;
    }
    // Find user by filter
    async findUser(filter) {
        return this.userRepo.findOne(filter);
    }
    // Get all users filtered by userRole
    async getUsers() {
        return this.userRepo.find({
            where: {
                role: enums_1.Role.USER,
            },
            include: ['children'],
        });
    }
    // Get teachers
    async getTeachers() {
        return this.userRepo.find({
            where: {
                or: [{ role: enums_1.Role.TEACHER }, { role: enums_1.Role.ADMIN }],
            },
        });
    }
    // Get all user's children
    async getChildren(id) {
        if (!(await this.userRepo.exists(id))) {
            throw rest_1.HttpErrors.NotFound('Uživatel nebyl nalezen');
        }
        return this.userRepo.children(id).find();
    }
    // Get teachers with an attendance on given date
    async getWorkingTeachersOnDate(date) {
        const attendanceItems = (await this.attendanceService.getAllAttendanceItemsOnDate(date)).filter((att) => !att.childId && att.userId);
        const teachers = [];
        for (const attendance of attendanceItems) {
            const teacher = await this.userRepo.findById(attendance.userId);
            if (attendance.pickUp) {
                teacher.fullName += ' (svoz)';
            }
            teachers.push(teacher);
        }
        return teachers;
    }
    // Other functions
    // ---------------------------------------------------------------------
    // Function for login a user
    async login(credentials) {
        // ensure the user exists, and the password is correct
        const user = await this.verifyCredentials(credentials);
        // convert a User object into a UserProfile object (reduced set of properties)
        const userProfile = this.convertToUserProfile(user);
        // create a JSON Web Token based on the user profile
        const token = await this.jwtService.generateToken(userProfile);
        return { token };
    }
    // Function for get info about current user
    async whoAmI(currentUserProfile) {
        // Now I just returned only id of user, but you can return all user profile
        if (!currentUserProfile) {
            throw new rest_1.HttpErrors.Unauthorized(`Uživatel se ještě nepřihlásil`);
        }
        return currentUserProfile[security_1.securityId];
    }
    // Function for sign up a user
    async signup(newUserRequest) {
        // Extraction of password, address and user
        const { password, address, ...newUser } = newUserRequest;
        // Validate password
        this.validatePassword(password);
        // Hashing password
        const hashedPassword = await this.hashPassword(password);
        // Validate address
        this.validateAddress(address);
        // Validate user
        this.validateNewUser(newUser);
        // Validate unique email address
        await this.validateUniqueEmail(newUser.email);
        // Create user
        const savedUser = await this.userRepo.create(newUser);
        // Save address
        await this.userRepo.address(savedUser.id).create(address);
        // Save credentials
        await this.userRepo
            .userCredentials(savedUser.id)
            .create({ password: hashedPassword });
        await this.emailService.sendGeneratedPasswordToNewUser(savedUser.email, password);
        return savedUser;
    }
    // UserService methods
    // ----------------------------------------------------------------------
    // Function for vertify user by his credentials
    async verifyCredentials(credentials) {
        const invalidCredentialsError = 'Neplatný email nebo heslo.';
        const foundUser = await this.userRepo.findOne({
            where: { email: credentials.email },
        });
        if (!foundUser) {
            throw new rest_1.HttpErrors.Unauthorized(invalidCredentialsError);
        }
        const credentialsFound = await this.userRepo.findCredentials(foundUser.id);
        if (!credentialsFound) {
            throw new rest_1.HttpErrors.Unauthorized(invalidCredentialsError);
        }
        const passwordMatched = await bcrypt_1.default.compare(credentials.password, credentialsFound.password);
        if (!passwordMatched) {
            throw new rest_1.HttpErrors.Unauthorized(invalidCredentialsError);
        }
        return foundUser;
    }
    // Function to convert user to user profile
    convertToUserProfile(user) {
        return {
            [security_1.securityId]: user.id.toString(),
            id: user.id,
            email: user.email,
            role: user.role,
            fullName: user.fullName,
        };
    }
    // Validation
    // ----------------------------------------------------------------------
    async hashPassword(password) {
        return bcrypt_1.default.hash(password, await bcrypt_1.default.genSalt());
    }
    // Password validation
    validatePassword(passwd) {
        const schema = zod_1.z
            .string()
            .min(8, { message: 'Heslo musí obsahovat minimálně 8 znaků.' })
            .max(15, { message: 'Heslo může obsahovat maximálně 15 znaků.' })
            .regex(/^(?=.*[A-Z])(?=.*\d).{8,}$/, {
            message: 'Heslo musí obsahovat alespoň jedno velké písmeno a alespoň jednu číslici.',
        });
        const { error } = schema.safeParse(passwd);
        if (error) {
            throw new rest_1.HttpErrors.UnprocessableEntity(`Neplatné heslo: ${error.errors[0].message}`);
        }
    }
    // Address validation
    validateAddress(address) {
        const houseNumberRegex = /^[1-9]\d*(?:\/\d+)?$/;
        const zipCodeRegex = /^[1-9]\d{2} \d{2}$/;
        const addressSchema = zod_1.z.object({
            street: zod_1.z.string().optional(),
            houseNumber: zod_1.z.string().regex(houseNumberRegex),
            city: zod_1.z.string(),
            zipCode: zod_1.z.string().regex(zipCodeRegex, {
                message: "Zip musí mít být ve tvaru 'NNN NN'.",
            }),
            note: zod_1.z.string().optional(),
        });
        const { error } = addressSchema.safeParse(address);
        if (error) {
            throw rest_1.HttpErrors.UnprocessableEntity(`Neplatná adresa: ${error.errors[0].message}.`);
        }
    }
    // Unique email validation
    async validateUniqueEmail(email) {
        const user = await this.userRepo.findOne({
            where: {
                email: email,
            },
        });
        if (user) {
            throw rest_1.HttpErrors.UnprocessableEntity('Tato emailová adresa je již používaná.');
        }
    }
    // newUser validation
    validateNewUser(user) {
        const CZECH_BIG_LETTERS = 'ÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ';
        const CZECH_SMALL_LETTERS = 'áčďéěíňóřšťúůýž';
        const nameRegex = new RegExp(`^[A-Z${CZECH_BIG_LETTERS}][a-z${CZECH_SMALL_LETTERS}]+(?: [A-Z${CZECH_BIG_LETTERS}][a-z${CZECH_SMALL_LETTERS}]+)? [A-Z${CZECH_BIG_LETTERS}][a-z${CZECH_SMALL_LETTERS}]+$`, 'g');
        const phoneRegex = /^\+?[0-9]{3}(?: [0-9]{3}){2,3}$/;
        const dateFormat = 'YYYY-MM-DD';
        const userSchema = zod_1.z.object({
            email: zod_1.z.string().email({ message: 'Neplatná emailová adresa.' }),
            role: zod_1.z
                .nativeEnum(enums_1.Role, {
                message: 'Neplatná uživatelská role.',
            })
                .optional(),
            fullName: zod_1.z.string().regex(nameRegex, {
                message: 'Neplatné jméno.',
            }),
            dateOfBirth: zod_1.z
                .string()
                .date(`Neplatné datum. Datum musí mít tento formát: ${dateFormat}.`)
                .refine(this.isAdult, {
                message: 'Uživatel musí být starší 18 let.',
            })
                .optional(),
            description: zod_1.z.string().optional(),
            academicTitle: zod_1.z
                .string()
                .max(20, { message: 'Toto pole je příliš dlouhé.' })
                .optional(),
            phoneNumber: zod_1.z
                .string()
                .regex(phoneRegex, { message: 'Neplatné telefoní číslo' }),
            note: zod_1.z.string().optional(),
        });
        const { error } = userSchema.safeParse(user);
        if (error) {
            console.log(error);
            throw rest_1.HttpErrors.UnprocessableEntity(error.errors[0].message);
        }
    }
    // Validate age is higher than 18 years old from date
    isAdult(dateStr) {
        const date = (0, dayjs_1.default)(dateStr)
            .locale({
            ...cs_1.default,
        })
            .startOf('day');
        const today = (0, dayjs_1.default)()
            .locale({
            ...cs_1.default,
        })
            .startOf('day');
        return date.isSameOrBefore(today, 'day');
    }
};
exports.MyUserService = MyUserService;
exports.MyUserService = MyUserService = tslib_1.__decorate([
    (0, core_1.injectable)({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.UserRepository)),
    tslib_1.__param(1, (0, core_1.inject)(authentication_jwt_1.TokenServiceBindings.TOKEN_SERVICE)),
    tslib_1.__param(2, (0, core_1.service)(file_upload_service_1.FileUploadService)),
    tslib_1.__param(3, (0, core_1.service)(email_service_1.EmailService)),
    tslib_1.__param(4, (0, core_1.service)(parenthood_service_1.ParenthoodService)),
    tslib_1.__param(5, (0, core_1.service)(attendance_service_1.AttendanceService)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UserRepository,
        my_token_service_1.MyTokenService,
        file_upload_service_1.FileUploadService,
        email_service_1.EmailService,
        parenthood_service_1.ParenthoodService,
        attendance_service_1.AttendanceService])
], MyUserService);
//# sourceMappingURL=my-user.service.js.map