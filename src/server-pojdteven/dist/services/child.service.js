"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChildService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const dayjs_1 = tslib_1.__importDefault(require("dayjs"));
const cs_1 = tslib_1.__importDefault(require("dayjs/locale/cs"));
const isToday_1 = tslib_1.__importDefault(require("dayjs/plugin/isToday"));
const toObject_1 = tslib_1.__importDefault(require("dayjs/plugin/toObject"));
const weekday_1 = tslib_1.__importDefault(require("dayjs/plugin/weekday"));
const zod_1 = require("zod");
const repositories_1 = require("../repositories");
const attendance_service_1 = require("./attendance.service");
const parenthood_service_1 = require("./parenthood.service");
dayjs_1.default.extend(weekday_1.default);
dayjs_1.default.extend(toObject_1.default);
dayjs_1.default.extend(isToday_1.default);
let ChildService = class ChildService {
    constructor(childRepo, attendanceService, parenthoodService) {
        this.childRepo = childRepo;
        this.attendanceService = attendanceService;
        this.parenthoodService = parenthoodService;
    }
    // Create child
    async createChild(child) {
        this.validateChild(child);
        return this.childRepo.create(child);
    }
    // Delete child
    async deleteChild(id) {
        await this.parenthoodService.deleteAllChildRelations(id);
        await this.attendanceService.deleteAllAttendanceItemsOfChild(id);
        await this.childRepo.deleteById(id);
    }
    // Update child
    async updateChild(id, child) {
        this.validateChild(child);
        const originalChild = await this.childRepo.findById(id);
        if (originalChild.schoolDays !== child.schoolDays) {
            await this.attendanceService.deleteAllAttendanceItemsOfChildFromToday(id);
        }
        await this.childRepo.updateById(id, child);
    }
    // Get all children
    async getChildren() {
        return this.childRepo.find({
            include: ['users'],
        });
    }
    // Get a child
    async getChild(id) {
        return this.childRepo.findById(id);
    }
    // Get parents o child
    async getChildParents(id) {
        if (!(await this.childRepo.exists(id))) {
            throw rest_1.HttpErrors.NotFound('Dítě nebylo nalezeno.');
        }
        return this.childRepo.users(id).find();
    }
    // Get all children who has attendance on given date
    async getChildrenWithAttendanceOnDate(date) {
        const attendanceItems = await this.attendanceService.getAllAttendanceItemsOnDate(date);
        const childPromises = attendanceItems
            .filter(att => !att.userId && att.childId)
            .map(att => this.childRepo.findById(att.childId));
        return Promise.all(childPromises);
    }
    // Validate new child
    validateChild(child) {
        const CZECH_BIG_LETTERS = 'ÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ';
        const CZECH_SMALL_LETTERS = 'áčďéěíňóřšťúůýž';
        const nameRegex = new RegExp(`^[A-Z${CZECH_BIG_LETTERS}][a-z${CZECH_SMALL_LETTERS}]+(?: [A-Z${CZECH_BIG_LETTERS}][a-z${CZECH_SMALL_LETTERS}]+)? [A-Z${CZECH_BIG_LETTERS}][a-z${CZECH_SMALL_LETTERS}]+$`, 'g');
        const schoolDaysRegex = new RegExp('^0?1?2?3?4?$', 'g');
        const childSchema = zod_1.z.object({
            fullName: zod_1.z.string().regex(nameRegex, {
                message: 'Neplatné jméno',
            }),
            dateOfBirth: zod_1.z
                .string()
                .date()
                .refine(this.isFromPast, { message: 'Neplatné datum narození.' }),
            description: zod_1.z.string().optional(),
            monthlyFee: zod_1.z.number().positive(),
            schoolDays: zod_1.z.string().regex(schoolDaysRegex, {
                message: 'Dny musí být reprezentovýny pouze znaky 0-4 a musí být seřazeny. Dále musí obsahovat alespoň jeden znak a maximálně 5 znaků.',
            }),
            note: zod_1.z.string().max(1000).optional(),
        });
        const { error } = childSchema.safeParse(child);
        if (error) {
            throw rest_1.HttpErrors.UnprocessableEntity(error.errors[0].message);
        }
    }
    // Test for date lower than today
    isFromPast(dateStr) {
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
        return date.isBefore(today);
    }
};
exports.ChildService = ChildService;
exports.ChildService = ChildService = tslib_1.__decorate([
    (0, core_1.injectable)({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.ChildRepository)),
    tslib_1.__param(1, (0, core_1.service)(attendance_service_1.AttendanceService)),
    tslib_1.__param(2, (0, core_1.service)(parenthood_service_1.ParenthoodService)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ChildRepository,
        attendance_service_1.AttendanceService,
        parenthood_service_1.ParenthoodService])
], ChildService);
//# sourceMappingURL=child.service.js.map