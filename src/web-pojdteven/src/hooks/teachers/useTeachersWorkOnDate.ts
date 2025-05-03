import { userControllerGetWorkingTeachersOnDateOptions } from '@/client/@tanstack/react-query.gen';
import { useQuery } from '@tanstack/react-query';
import { Dayjs } from 'dayjs';

const useWorkingTeachersOnDate = (date: Dayjs) =>
  useQuery({
    ...userControllerGetWorkingTeachersOnDateOptions({
      query: {
        date: date.format('YYYY-MM-DD'),
      },
    }),
  });

export default useWorkingTeachersOnDate;
