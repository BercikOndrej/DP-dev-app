import useCalendarDates from '@/hooks/useCalendarDates';
import useChildStore from '@/stores/ChildStore';
import useCurrentMonthStore from '@/stores/CurrentMonthStore';
import { Dayjs } from 'dayjs';
import { useState } from 'react';
import UserCalendarCell from './UserCalendarCell';
import CalendarHeader from '../CalendarHeader';
import DayLabels from '../DayLabels';
import UserAlternativeAttendanceCountLabel from './UserAlternativeAttendanceCountLabel';

const UserCalendar = () => {
  const currentMonth = useCurrentMonthStore((store) => store.currentMonth);
  const [weeks, setWeeks] = useState<Dayjs[][]>([]);
  const childId = useChildStore((store) => store.childId);

  // Effect hook for render component after changing currentMonth
  useCalendarDates(currentMonth, setWeeks);

  const renderUserCells = () => {
    return (
      <div className='flex flex-col gap-4'>
        {weeks.map((week, index) => (
          <div key={index} className='flex flex-row  w-full gap-4'>
            {week.map((day, index) => (
              <UserCalendarCell key={index} day={day} />
            ))}
          </div>
        ))}
      </div>
    );
  };

  return childId ? (
    <div className='p-4 md:p-8 shadow-xl rounded-xl border-8 border-slate-200 mt-8 w-full container mx-auto'>
      <CalendarHeader />
      <DayLabels />
      {renderUserCells()}
      <UserAlternativeAttendanceCountLabel />
    </div>
  ) : (
    <></>
  );
};

export default UserCalendar;
