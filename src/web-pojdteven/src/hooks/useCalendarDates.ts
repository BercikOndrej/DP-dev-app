import { Dayjs } from 'dayjs';
import { useEffect } from 'react';

const getAllDays = (
  currentMonth: Dayjs,
  setWeeks: (value: Dayjs[][]) => void
) => {
  const monthStart = currentMonth.startOf('month');
  let currentDate =
    monthStart.weekday() > 4
      ? monthStart.add(1, 'week').weekday(0)
      : monthStart.weekday(0);

  const nextMonth = currentMonth.add(1, 'month').month();

  // All dates
  let allDates = [];
  let weekDates = [];
  let dayCounter = 1;

  while (currentDate.weekday(0).month() !== nextMonth) {
    const tempDay = currentDate.startOf('day');
    weekDates.push(tempDay);

    if (dayCounter === 5) {
      allDates.push(weekDates);
      weekDates = [];
      dayCounter = 0;
      currentDate = currentDate.add(2, 'day');
    }

    dayCounter++;
    currentDate = currentDate.add(1, 'day');
  }

  setWeeks(allDates);
};

const useCalendarDates = (
  currentMonth: Dayjs,
  setWeeks: (value: Dayjs[][]) => void
) => {
  useEffect(() => {
    getAllDays(currentMonth, setWeeks);
  }, [currentMonth, setWeeks]);
};

export default useCalendarDates;
