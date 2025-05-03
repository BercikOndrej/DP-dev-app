import dayjs from 'dayjs';
import locale from 'dayjs/locale/cs';

// Validate age is higher than 18 years old from date
function isAdult(input: Date): boolean {
  const date = dayjs(input)
    .locale({
      ...locale,
    })
    .startOf('day');
  const today = dayjs()
    .locale({
      ...locale,
    })
    .startOf('day').subtract(18, 'year');

  return date.isSameOrBefore(today, 'day');
}

export default isAdult;
