import { Button } from '@/components/ui/button';
import useCurrentMonthStore from '@/stores/CurrentMonthStore';
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md';

const CalendarHeader = () => {
  const { currentMonth, setCurrentMonth } = useCurrentMonthStore();

  // Functions for iterating over months
  const nextMonth = () => {
    const next = currentMonth.add(1, 'month');
    setCurrentMonth(next);
  };

  const previousMonth = () => {
    const previous = currentMonth.subtract(1, 'month');
    setCurrentMonth(previous);
  };

  const dateFormat = 'MMMM YYYY';
  return (
    <div className='p-4 flex flex-row justify-between gap-4 text-center items-center'>
      <Button variant='outline' size='icon' onClick={() => previousMonth()}>
        <MdOutlineNavigateBefore />
      </Button>
      <div className='font-title font-bold text-sm md:text-2xl xl:text-4xl'>
        {currentMonth.format(dateFormat)}
      </div>
      <Button variant='outline' size='icon' onClick={() => nextMonth()}>
        <MdOutlineNavigateNext />
      </Button>
    </div>
  );
};

export default CalendarHeader;
