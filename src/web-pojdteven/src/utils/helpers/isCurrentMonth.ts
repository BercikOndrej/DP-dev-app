import { Dayjs } from 'dayjs';

const isCurrentMonth = (day: Dayjs, currenntMonth: Dayjs): boolean =>
  day.month() === currenntMonth.month();

export default isCurrentMonth;
