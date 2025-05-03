"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const dayjs_1 = tslib_1.__importDefault(require("dayjs"));
const cs_1 = tslib_1.__importDefault(require("dayjs/locale/cs"));
const isSameOrAfter_1 = tslib_1.__importDefault(require("dayjs/plugin/isSameOrAfter"));
const isSameOrBefore_1 = tslib_1.__importDefault(require("dayjs/plugin/isSameOrBefore"));
const isToday_1 = tslib_1.__importDefault(require("dayjs/plugin/isToday"));
const weekday_1 = tslib_1.__importDefault(require("dayjs/plugin/weekday"));
const zod_1 = require("zod");
const enums_1 = require("../enums");
const repositories_1 = require("../repositories");
const email_service_1 = require("./email.service");
dayjs_1.default.extend(weekday_1.default);
dayjs_1.default.extend(isToday_1.default);
dayjs_1.default.extend(isSameOrAfter_1.default);
dayjs_1.default.extend(isSameOrBefore_1.default);
const DATE_FORMAT = 'YYYY-MM-DD';
let AttendanceService = class AttendanceService {
    constructor(attendanceRepo, childRepo, userRepo, emailService) {
        this.attendanceRepo = attendanceRepo;
        this.childRepo = childRepo;
        this.userRepo = userRepo;
        this.emailService = emailService;
    }
    // General methods
    // ----------------------------------------------------------------------
    // Create attendance - return null if attendance already exists
    async createAttendance(attendance) {
        await this.validateAttendance(attendance);
        if (await this.attendanceAlreadyExisted(attendance)) {
            throw rest_1.HttpErrors.BadRequest('Docházka již existuje.');
        }
        return this.attendanceRepo.create(attendance);
    }
    // Delete attendence
    async deleteAttendance(id) {
        await this.attendanceRepo.deleteById(id);
    }
    // Delete all attendance that are older than that 1 year
    async deleteAllAttendanceItemsOlderThanYear() {
        const attendanceItems = await this.attendanceRepo.find();
        const beforeYear = (0, dayjs_1.default)()
            .locale({ ...cs_1.default })
            .startOf('day')
            .subtract(1, 'year');
        const olderAttendanceItems = attendanceItems
            .filter(item => (0, dayjs_1.default)(item.date).isBefore(beforeYear));
        await Promise.all(olderAttendanceItems.map(item => this.attendanceRepo.deleteById(item.id)));
    }
    // Get attendance
    async getAttendance(id) {
        return this.attendanceRepo.findById(id);
    }
    // Find attendance
    async findAttendance(userId, dateStr) {
        this.validateDateString(dateStr);
        return this.attendanceRepo.findOne({
            where: {
                userId: userId,
                date: dateStr,
            },
        });
    }
    // Get many attendance items
    async getAllAttendanceItems() {
        return this.attendanceRepo.find();
    }
    // Get all attendance items that exist on given date
    async getAllAttendanceItemsOnDate(date) {
        this.validateDateString(date);
        return this.attendanceRepo.find({
            where: {
                date: date,
                tag: enums_1.AttendanceTag.NORMAL,
            },
        });
    }
    // Validating attendance
    async validateAttendance(attendance) {
        const pickUpErrorMsg = 'Svoz může provádět pouze průvodce/učitel školky.';
        if (attendance.pickUp) {
            if (!attendance.userId) {
                throw rest_1.HttpErrors.UnprocessableEntity(pickUpErrorMsg);
            }
            if (attendance.userId) {
                const user = await this.userRepo.findById(attendance.userId);
                if (user.role === enums_1.Role.USER) {
                    throw rest_1.HttpErrors.UnprocessableEntity(pickUpErrorMsg);
                }
            }
        }
        const now = (0, dayjs_1.default)()
            .locale({
            ...cs_1.default,
        })
            .startOf('day');
        const attendanceSchema = zod_1.z.object({
            date: zod_1.z
                .string()
                .date(`Neplatné datum. Datum musí být ve formátu '${DATE_FORMAT}'.`)
                .refine(date => (0, dayjs_1.default)(date)
                .locale({
                ...cs_1.default,
            })
                .startOf('day')
                .isSameOrAfter(now, 'day'), 'Neplatné datum.')
                .refine(date => (0, dayjs_1.default)(date)
                .locale({
                ...cs_1.default,
            })
                .startOf('day')
                .month() !== 7, 'Nelze zapsat datum o prázdninách.'),
            tag: zod_1.z.nativeEnum(enums_1.AttendanceTag, {
                message: `Vlastnost 'tag' musí být jednou z těchto hodnot: ${Object.values(enums_1.AttendanceTag)}.`,
            }),
            childId: zod_1.z.string().optional(),
            userId: zod_1.z.string().optional(),
            pickUp: zod_1.z.boolean().optional(),
        });
        const { error } = attendanceSchema.safeParse(attendance);
        if (error) {
            throw rest_1.HttpErrors.UnprocessableEntity(error.errors[0].message);
        }
    }
    // Check if attendance already exists
    async attendanceAlreadyExisted(attendance) {
        const attendanceItems = await this.attendanceRepo.find({
            where: {
                childId: attendance.childId,
                userId: attendance.userId,
                tag: enums_1.AttendanceTag.NORMAL,
            },
        });
        const searchResult = attendanceItems.find(att => {
            const attDate = (0, dayjs_1.default)(att.date).startOf('day');
            const attendanceDate = (0, dayjs_1.default)(attendance.date).startOf('day');
            return attDate.isSame(attendanceDate, 'day');
        });
        return searchResult !== undefined;
    }
    // Validate date string
    validateDateString(date) {
        const schema = zod_1.z
            .string()
            .date(`Neplatné datum. Datum musí být ve formátu '${DATE_FORMAT}'.`);
        const { error } = schema.safeParse(date);
        if (error) {
            throw rest_1.HttpErrors.BadRequest(error.errors[0].message);
        }
    }
    // Methods for child attendance
    // ----------------------------------------------------------------------
    // Create many attendance items for a child from given date to given date. Dates are dependet on child school days
    async createManyChildAttendanceItemsBySchoolDays(childId, from, to) {
        // Check child existation
        const child = await this.childRepo.findById(childId);
        if (!child) {
            throw rest_1.HttpErrors.BadRequest('Dítě nebylo nalezeno.');
        }
        // Get school days array
        const schoolDays = child.schoolDays
            .split('')
            .map(char => Number(char));
        // Validate dates
        this.validateDateString(from);
        this.validateDateString(to);
        const fromDate = (0, dayjs_1.default)(from)
            .locale({ ...cs_1.default })
            .startOf('day');
        const toDate = (0, dayjs_1.default)(to)
            .locale({ ...cs_1.default })
            .startOf('day');
        if (fromDate.isAfter(toDate, 'day')) {
            throw rest_1.HttpErrors.BadRequest("Neplatné zadání dat - Datum 'od' musí být dřívější než datum 'do'.");
        }
        // Dates cannot be on August (říjen)
        if (fromDate.month() <= 8 && toDate.month() >= 8) {
            throw rest_1.HttpErrors.BadRequest('Nelze vytvořit záznamy docházky přes prázdniny.');
        }
        const attendanceItems = [];
        // Get all attendance items
        let day = fromDate;
        while (day.isBefore(toDate, 'day') || day.isSame(toDate, 'day')) {
            if (schoolDays.includes(day.weekday())) {
                const att = await this.createAttendance({
                    date: day.format(DATE_FORMAT),
                    tag: enums_1.AttendanceTag.NORMAL,
                    childId,
                });
                if (att) {
                    attendanceItems.push(att);
                }
            }
            day = day.add(1, 'day');
        }
        return attendanceItems;
    }
    // Delete all attendance items of the child
    // This method is used in deleting child
    async deleteAllAttendanceItemsOfChild(childId) {
        if (!(await this.childRepo.exists(childId))) {
            throw rest_1.HttpErrors.NotFound('Dítě nebylo nalezeno.');
        }
        await this.attendanceRepo.deleteAll({ childId: childId });
    }
    // Delete all attendance items of the child from today date
    // This method is used in changing school days of the child
    async deleteAllAttendanceItemsOfChildFromToday(childId) {
        if (!(await this.childRepo.exists(childId))) {
            throw rest_1.HttpErrors.NotFound('Dítě nebylo nalezeno.');
        }
        const today = (0, dayjs_1.default)()
            .locale({
            ...cs_1.default,
        })
            .startOf('day');
        const childAttendance = await this.getAllNormalAttendanceItemsOfChild(childId);
        for (const att of childAttendance) {
            const attDate = (0, dayjs_1.default)(att.date)
                .locale({
                ...cs_1.default,
            })
                .startOf('day');
            if (attDate.isSameOrAfter(today)) {
                await this.attendanceRepo.deleteById(att.id);
            }
        }
    }
    // Get all normal attendance items of the child in given month (zero indexed)
    // This method is used to show all attendance items in calendar on FE
    async getAllNormalAttendanceItemsOfChildInMonth(childId, month) {
        const attendanceItems = await this.getAllNormalAttendanceItemsOfChild(childId);
        return attendanceItems.filter(att => (0, dayjs_1.default)(att.date)
            .locale({
            ...cs_1.default,
        })
            .month() === month);
    }
    // Get count of all alternative attendance items of the child
    // Thanks to this function we know how much attendance may write down
    async getCountOfAllAlternativeAttendanceOfChild(childId) {
        if (!(await this.childRepo.exists(childId))) {
            throw rest_1.HttpErrors.NotFound('Dítě nebylo nalezeno.');
        }
        // Always during the getting a count of alternative attendance, I must delete the old one
        return (await this.getAllAlternativeAttendanceItemsOfChild(childId)).length;
    }
    // Enroll new normal attendace for a child
    // It can happend only if child have some alternative attendace
    async enrollNewNormalAttendanceOfChild(att) {
        att.tag = enums_1.AttendanceTag.NORMAL;
        await this.validateAttendance(att);
        if (!att.childId) {
            throw rest_1.HttpErrors.BadRequest('K vytvoření nového záznamu docházky nebylo specifikováno pro které dítě má být záznam vytvořen.');
        }
        const alternativeAttendanceItems = await this.getAllAlternativeAttendanceItemsOfChild(att.childId);
        if (alternativeAttendanceItems.length === 0) {
            throw rest_1.HttpErrors.BadRequest('Dítě nemá žádné náhrady za docházku. Nový záznam docházky tedy nelze zapsat.');
        }
        const oldestAtt = alternativeAttendanceItems.pop();
        await this.attendanceRepo.deleteById(oldestAtt.id);
        return this.attendanceRepo.create(att);
    }
    // Unroll normal attendace of the child
    // When child unroll attendance he get alternative attendance and thanks to that it can later enroll new normal attendance
    async unrollAttendanceOfChild(id) {
        const att = await this.attendanceRepo.findById(id);
        if (!att) {
            throw rest_1.HttpErrors.NotFound('Záznam docházky nebyl nalezen.');
        }
        att.tag = enums_1.AttendanceTag.ALTERNATIVE;
        att.date = (0, dayjs_1.default)(att.date)
            .locale({
            ...cs_1.default,
        })
            .startOf('day')
            .format(DATE_FORMAT);
        await this.attendanceRepo.updateById(id, att);
    }
    // Helper methods for child attendnace itemns management
    // ------------------------------------------------------------------
    // Get all alternative attendance items ordered from the oldest to the newest
    // Attendance older than 2 months are not included
    async getAllAlternativeAttendanceItemsOfChild(childId) {
        const attendanceItems = await this.attendanceRepo.find({
            where: {
                childId: childId,
                tag: enums_1.AttendanceTag.ALTERNATIVE,
            },
            order: ['date DESC'],
        });
        // Deleting attendance older than 2 months and return the right ones
        return this.deleteAttendanceItemsOlderThanTwoMonths(attendanceItems);
    }
    // Get all normalaAttendance items of the child
    async getAllNormalAttendanceItemsOfChild(childId) {
        return this.attendanceRepo.find({
            where: {
                childId: childId,
                tag: enums_1.AttendanceTag.NORMAL,
            },
        });
    }
    // Delete attendance older than 2 months and return the rest of attendance items
    async deleteAttendanceItemsOlderThanTwoMonths(attendanceItems) {
        const resultAttendanceItems = [];
        const beforeTwoMonths = (0, dayjs_1.default)()
            .locale({
            ...cs_1.default,
        })
            .subtract(2, 'month')
            .startOf('day');
        for (const att of attendanceItems) {
            const attDate = (0, dayjs_1.default)(att.date)
                .locale({
                ...cs_1.default,
            })
                .startOf('day');
            if (attDate.isBefore(beforeTwoMonths)) {
                await this.attendanceRepo.deleteById(att.id);
            }
            else {
                resultAttendanceItems.push(att);
            }
        }
        return resultAttendanceItems;
    }
    // Methods for user/teacher attendance
    // ----------------------------------------------------------------------
    // Create many user attendance items for teacher based on given dates
    async createAttendanceItemsOfUser(userId, dates) {
        await this.validateTeacher(userId);
        // Validate all dates
        for (const date of dates) {
            this.validateDateString(date);
            if ((0, dayjs_1.default)(date)
                .locale({
                ...cs_1.default,
            })
                .startOf('day')
                .month() === 7) {
                throw rest_1.HttpErrors.BadRequest('Nelze vytvořit záznamy docházky přes prázdniny.');
            }
        }
        const attendanceItems = [];
        for (const date of dates) {
            const att = await this.createAttendance({
                date: date,
                tag: enums_1.AttendanceTag.NORMAL,
                userId: userId,
            });
            if (att) {
                attendanceItems.push(att);
            }
        }
        return attendanceItems;
    }
    // Delete all user attendance items
    async deleteAllAttendanceItemsOfUser(userId) {
        await this.validateTeacher(userId);
        await this.attendanceRepo.deleteAll({ userId: userId });
    }
    // Get all attendance items of all users in given month (zero indexed)
    async getAllAttendanceItemsOfAllTeachersInMonth(month) {
        const attendanceItems = await this.attendanceRepo.find({
            where: {
                childId: undefined,
            },
        });
        return attendanceItems.filter(att => (0, dayjs_1.default)(att.date)
            .locale({
            ...cs_1.default,
        })
            .month() === month);
    }
    // Change attendance between users
    // We must send emails to all users signed that day
    async changeTeacherAttendance(data) {
        var _a;
        this.validateDateString(data.dateStr);
        const attendaceObj = {
            userId: data.nextTeacherId,
            tag: enums_1.AttendanceTag.NORMAL,
            date: data.dateStr,
            pickUp: data.isPickUp,
        };
        if (await this.attendanceAlreadyExisted(attendaceObj)) {
            throw rest_1.HttpErrors.BadRequest('Docházka již existuje.');
        }
        // Send emails
        const users = await this.getSignedUserOnDate(data.dateStr);
        const emails = users.map(user => user.email);
        const originTeacher = await this.userRepo.findById(data.originTeacherId);
        const nextTeacher = await this.userRepo.findById(data.nextTeacherId);
        await this.emailService.sendEmailOfAttendanceChangeToUsers(emails, originTeacher.fullName, nextTeacher.fullName, (0, dayjs_1.default)(data.dateStr).startOf('day'));
        const oldAttendance = await this.findAttendance(data.originTeacherId, data.dateStr);
        await this.deleteAttendance((_a = oldAttendance === null || oldAttendance === void 0 ? void 0 : oldAttendance.id) !== null && _a !== void 0 ? _a : '');
        return this.createAttendance(attendaceObj);
    }
    // Get all users that signed on given date
    async getSignedUserOnDate(date) {
        const attendanceItemsOnDate = await this.getAllAttendanceItemsOnDate(date);
        const childsParentsPromises = attendanceItemsOnDate
            .map(att => att.childId)
            .filter(id => id !== undefined && id !== null)
            .map(async (id) => {
            return this.childRepo.users(id).find();
        });
        const result = await Promise.all(childsParentsPromises);
        return result.flat(1);
    }
    // Check if a user is teacher
    async validateTeacher(userId) {
        const user = await this.userRepo.findById(userId);
        if (!user) {
            throw rest_1.HttpErrors.NotFound('Uživatel nebyl nalezen.');
        }
        if (user.role !== enums_1.Role.TEACHER) {
            throw rest_1.HttpErrors.BadRequest('Uživatel nemá patřičná oprávnění.');
        }
    }
};
exports.AttendanceService = AttendanceService;
exports.AttendanceService = AttendanceService = tslib_1.__decorate([
    (0, core_1.injectable)({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.AttendanceRepository)),
    tslib_1.__param(1, (0, repository_1.repository)(repositories_1.ChildRepository)),
    tslib_1.__param(2, (0, repository_1.repository)(repositories_1.UserRepository)),
    tslib_1.__param(3, (0, core_1.service)(email_service_1.EmailService)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.AttendanceRepository,
        repositories_1.ChildRepository,
        repositories_1.UserRepository,
        email_service_1.EmailService])
], AttendanceService);
//# sourceMappingURL=attendance.service.js.map