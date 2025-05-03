import dayjs, { Dayjs } from 'dayjs';
import { create } from 'zustand';
import locale from 'dayjs/locale/cs';
import weekdayPlugin from 'dayjs/plugin/weekday';
import isTodayPlugin from 'dayjs/plugin/isToday';

const now = dayjs().locale({
  ...locale,
});
dayjs.extend(weekdayPlugin);
dayjs.extend(isTodayPlugin);

interface CurrentMonthStore {
  currentMonth: Dayjs;
  setCurrentMonth: (value: Dayjs) => void;
}

const useCurrentMonthStore = create<CurrentMonthStore>((set) => ({
  currentMonth: now,
  setCurrentMonth: (value: Dayjs) => set(() => ({ currentMonth: value })),
}));

export default useCurrentMonthStore;
