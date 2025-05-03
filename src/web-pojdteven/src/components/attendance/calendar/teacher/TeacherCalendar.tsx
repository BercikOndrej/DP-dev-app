import useCalendarDates from '@/hooks/useCalendarDates';
import useCurrentMonthStore from '@/stores/CurrentMonthStore';
import { Dayjs } from 'dayjs';
import { useState } from 'react';
import CalendarHeader from '../CalendarHeader';
import DayLabels from '../DayLabels';
import TeacherCalendarCell from './TeacherCalendarCell';

const TeacherCalendar = () => {
  const currentMonth = useCurrentMonthStore((store) => store.currentMonth);
  const [weeks, setWeeks] = useState<Dayjs[][]>([]);

  // Effect hook for render component after changing currentMonth
  useCalendarDates(currentMonth, setWeeks);

  const renderTeacherCells = () => {
    return (
      <div className='flex flex-col gap-4'>
        {weeks.map((week, index) => (
          <div key={index} className='flex flex-row  w-full gap-4'>
            {week.map((day, index) => (
              <TeacherCalendarCell key={index} day={day} />
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className='p-4 md:p-8 shadow-xl rounded-xl border-8 border-slate-200 mt-8 w-full container mx-auto'>
      <CalendarHeader />
      <DayLabels />
      {renderTeacherCells()}
    </div>
  );
};

export default TeacherCalendar;
