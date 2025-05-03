import { Attendance } from '@/client';
import dayjs from 'dayjs';
import locale from 'dayjs/locale/cs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isTodayPlugin from 'dayjs/plugin/isToday';
import weekdayPlugin from 'dayjs/plugin/weekday';

dayjs.extend(weekdayPlugin);
dayjs.extend(isTodayPlugin);
dayjs.extend(isSameOrBefore);

const today = dayjs()
  .locale({
    ...locale,
  })
  .startOf('day');

const getVisitedAttendanceItems = (items?: Attendance[]) =>
  !items
    ? undefined
    : items
        .filter((att) =>
          dayjs(att.date)
            .locale({
              ...locale,
            })
            .startOf('day')
            .isSameOrBefore(today)
        )
        .sort((att1, att2) => {
          const date1 = dayjs(att1.date);
          const date2 = dayjs(att2.date);
          return date1.isBefore(date2) ? -1 : date1.isAfter(date2) ? 1 : 0;
        });

export default getVisitedAttendanceItems;
