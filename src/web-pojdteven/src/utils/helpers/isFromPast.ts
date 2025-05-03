import dayjs from 'dayjs';
import locale from 'dayjs/locale/cs';

// Test for date lower than today
function isFromPast(input: Date): boolean {
  const date = dayjs(input)
    .locale({
      ...locale,
    })
    .startOf('day');
  const today = dayjs()
    .locale({
      ...locale,
    })
    .startOf('day');
  return date.isBefore(today);
}

export default isFromPast;
