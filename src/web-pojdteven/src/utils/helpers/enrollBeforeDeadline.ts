import dayjs, { Dayjs } from 'dayjs';
import locale from 'dayjs/locale/cs';
import weekday from 'dayjs/plugin/weekday';

dayjs.extend(weekday);

const now = dayjs().locale({
  ...locale,
});

function enrollBeforeDeadline(day: Dayjs): boolean {
  const dayDate = dayjs(day)
    .locale({
      ...locale,
    })
    .startOf('day');
  const enrollDeadline = dayDate.subtract(1, 'day').add(18, 'hour');
  return now.isBefore(enrollDeadline);
}

export default enrollBeforeDeadline;
