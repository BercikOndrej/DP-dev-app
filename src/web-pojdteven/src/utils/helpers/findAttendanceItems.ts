import { Attendance } from '@/client';
import dayjs, { Dayjs } from 'dayjs';
import locale from 'dayjs/locale/cs';
import weekdayPlugin from 'dayjs/plugin/weekday';

dayjs.extend(weekdayPlugin);

const findAttendanceItems = (
  day: Dayjs,
  attendanceItems: Attendance[] | void
): Attendance[] | undefined => {
  if (!attendanceItems) {
    return undefined;
  }
  day = day
    .locale({
      ...locale,
    })
    .startOf('day');
  return attendanceItems.filter((att) => {
    const attDate = dayjs(att.date)
      .locale({
        ...locale,
      })
      .startOf('day');
    return attDate.isSame(day, 'day');
  });
};

export default findAttendanceItems;
