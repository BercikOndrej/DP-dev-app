import { BindingScope, injectable } from '@loopback/core';
import { repository } from '@loopback/repository';
import { HttpErrors } from '@loopback/rest';
import dayjs from 'dayjs';
import locale from 'dayjs/locale/cs';
import { z } from 'zod';
import { DayActivity } from '../models';
import { DayActivityRepository } from '../repositories';

const DEFAULT_DATE = '2000-01-01';

@injectable({ scope: BindingScope.TRANSIENT })
export class DayActivityService {
  constructor(
    @repository(DayActivityRepository)
    private dayActivityRepo: DayActivityRepository,
  ) {}

  // Create new DayActivity
  async createDayActivity(
    activity: Omit<DayActivity, 'id'>,
  ): Promise<DayActivity> {
    this.validateDayActivity(activity);
    return this.dayActivityRepo.create(activity);
  }

  // Update day activity
  async updateDayActivity(id: number, activity: DayActivity): Promise<void> {
    this.validateDayActivity(activity);
    await this.dayActivityRepo.updateById(id, activity);
  }

  // Delete day activity
  async deleteDayActivity(id: number): Promise<void> {
    await this.dayActivityRepo.deleteById(id);
  }

  // Get day activity
  async getDayActivity(id: number): Promise<DayActivity> {
    return this.dayActivityRepo.findById(id);
  }

  // Get all day activities
  async getDayActivities(): Promise<DayActivity[]> {
    return (await this.dayActivityRepo.find()).sort(this.compareActivities);
  }

  validateDayActivity(activity: Omit<DayActivity, 'id'>) {
    const schema = z
      .object({
        startTime: z.string().regex(/^\d{2}:\d{2}$/, {
          message: 'Neplané zadání času. Čas zadejte ve fotmátu HH:mm',
        }),
        endTime: z.string().regex(/^\d{2}:\d{2}$/, {
          message: 'Neplané zadání času. Čas zadejte ve fotmátu HH:mm',
        }),
        description: z.string(),
      })
      .superRefine((val, ctx) => {
        const now = dayjs().set('hour', 0).set('minute', 0);
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
            code: z.ZodIssueCode.custom,
            message: 'Konec akce musí být později než začátek akce.',
            path: ['endTime'],
          });
        }
      });

    const { error } = schema.safeParse(activity);
    if (error) {
      console.log(error);
      throw HttpErrors.UnprocessableEntity(error.errors[0].message);
    }
  }

  private compareActivities(a: DayActivity, b: DayActivity): number {
    const startTimeA = dayjs(`${DEFAULT_DATE} ${a.startTime}`).locale({
      ...locale,
    });

    const endTimeA = dayjs(`${DEFAULT_DATE} ${a.endTime}`).locale({
      ...locale,
    });
    const startTimeB = dayjs(`${DEFAULT_DATE} ${b.startTime}`).locale({
      ...locale,
    });
    const endTimeB = dayjs(`${DEFAULT_DATE} ${b.endTime}`).locale({
      ...locale,
    });

    if (startTimeA.isSame(startTimeB, 'minutes')) {
      // If start time is same it is decided by end time
      if (endTimeA.isSame(endTimeB, 'minutes')) {
        return 0;
      } else if (endTimeA.isBefore(endTimeB, 'minutes')) {
        return -1;
      } else {
        return 1;
      }
    } else if (startTimeA.isBefore(startTimeB, 'minutes')) {
      return -1;
    } else {
      return 1;
    }
  }
}
