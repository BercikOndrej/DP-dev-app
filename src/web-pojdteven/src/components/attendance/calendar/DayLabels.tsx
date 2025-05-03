import useCurrentMonthStore from '@/stores/CurrentMonthStore';

const DayLabels = () => {
  const currentMonth = useCurrentMonthStore((store) => store.currentMonth);

  const dateFormat = 'dd';
  const weekDays = [];
  for (let index = 0; index < 5; index++) {
    weekDays.push(currentMonth.weekday(index).format(dateFormat));
  }

  return (
    <div className='flex flex-row items-center flex-1 w-full mb-16 mt-8 gap-4 text-slate-300'>
      {weekDays.map((day, index) => (
        <div
          key={index}
          className='w-full font-bold text-sm lg:text-lg xl:text-xl text-center'
        >
          {day.toUpperCase()}
        </div>
      ))}
    </div>
  );
};

export default DayLabels;
