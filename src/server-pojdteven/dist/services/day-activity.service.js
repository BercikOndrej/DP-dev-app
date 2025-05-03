"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DayActivityService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const dayjs_1 = tslib_1.__importDefault(require("dayjs"));
const cs_1 = tslib_1.__importDefault(require("dayjs/locale/cs"));
const zod_1 = require("zod");
const repositories_1 = require("../repositories");
const DEFAULT_DATE = '2000-01-01';
let DayActivityService = class DayActivityService {
    constructor(dayActivityRepo) {
        this.dayActivityRepo = dayActivityRepo;
    }
    // Create new DayActivity
    async createDayActivity(activity) {
        this.validateDayActivity(activity);
        return this.dayActivityRepo.create(activity);
    }
    // Update day activity
    async updateDayActivity(id, activity) {
        this.validateDayActivity(activity);
        await this.dayActivityRepo.updateById(id, activity);
    }
    // Delete day activity
    async deleteDayActivity(id) {
        await this.dayActivityRepo.deleteById(id);
    }
    // Get day activity
    async getDayActivity(id) {
        return this.dayActivityRepo.findById(id);
    }
    // Get all day activities
    async getDayActivities() {
        return (await this.dayActivityRepo.find()).sort(this.compareActivities);
    }
    validateDayActivity(activity) {
        const schema = zod_1.z
            .object({
            startTime: zod_1.z.string().regex(/^\d{2}:\d{2}$/, {
                message: 'Neplané zadání času. Čas zadejte ve fotmátu HH:mm',
            }),
            endTime: zod_1.z.string().regex(/^\d{2}:\d{2}$/, {
                message: 'Neplané zadání času. Čas zadejte ve fotmátu HH:mm',
            }),
            description: zod_1.z.string(),
        })
            .superRefine((val, ctx) => {
            const now = (0, dayjs_1.default)().set('hour', 0).set('minute', 0);
            const [startHour, startMinute] = val.startTime
                .split(':')
                .map((d) => parseInt(d));
            const startTime = now.set('hour', startHour).set('minute', startMinute);
            const [endHour, endMinute] = val.endTime
                .split(':')
                .map((d) => parseInt(d));
            const endTime = now.set('hour', endHour).set('minute', endMinute);
            if (endTime.isSameOrBefore(startTime)) {
                ctx.addIssue({
                    code: zod_1.z.ZodIssueCode.custom,
                    message: 'Konec akce musí být později než začátek akce.',
                    path: ['endTime'],
                });
            }
        });
        const { error } = schema.safeParse(activity);
        if (error) {
            console.log(error);
            throw rest_1.HttpErrors.UnprocessableEntity(error.errors[0].message);
        }
    }
    compareActivities(a, b) {
        const startTimeA = (0, dayjs_1.default)(`${DEFAULT_DATE} ${a.startTime}`).locale({
            ...cs_1.default,
        });
        const endTimeA = (0, dayjs_1.default)(`${DEFAULT_DATE} ${a.endTime}`).locale({
            ...cs_1.default,
        });
        const startTimeB = (0, dayjs_1.default)(`${DEFAULT_DATE} ${b.startTime}`).locale({
            ...cs_1.default,
        });
        const endTimeB = (0, dayjs_1.default)(`${DEFAULT_DATE} ${b.endTime}`).locale({
            ...cs_1.default,
        });
        if (startTimeA.isSame(startTimeB, 'minutes')) {
            // If start time is same it is decided by end time
            if (endTimeA.isSame(endTimeB, 'minutes')) {
                return 0;
            }
            else if (endTimeA.isBefore(endTimeB, 'minutes')) {
                return -1;
            }
            else {
                return 1;
            }
        }
        else if (startTimeA.isBefore(startTimeB, 'minutes')) {
            return -1;
        }
        else {
            return 1;
        }
    }
};
exports.DayActivityService = DayActivityService;
exports.DayActivityService = DayActivityService = tslib_1.__decorate([
    (0, core_1.injectable)({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.DayActivityRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.DayActivityRepository])
], DayActivityService);
//# sourceMappingURL=day-activity.service.js.map