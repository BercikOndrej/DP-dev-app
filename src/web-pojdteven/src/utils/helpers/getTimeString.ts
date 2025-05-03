import dayjs from 'dayjs';
import locale from 'dayjs/locale/cs';

const DEFAULT_DATE = '2000-01-01';
const TIME_FORMAT = 'H:mm';

const getTimeString = (timeStr: string): string => {
  const date = dayjs(`${DEFAULT_DATE} ${timeStr}`).locale({
    ...locale,
  });
  return date.format(TIME_FORMAT);
};

export default getTimeString;
