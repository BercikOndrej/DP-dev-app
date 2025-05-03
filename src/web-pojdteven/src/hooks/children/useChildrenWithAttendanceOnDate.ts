import { childControllerGetChildrenWithAttendanceOnDateOptions } from '@/client/@tanstack/react-query.gen';
import { useQuery } from '@tanstack/react-query';
import { Dayjs } from 'dayjs';

const useChildrenWithAttendanceOnDate = (date: Dayjs) =>
  useQuery({
    ...childControllerGetChildrenWithAttendanceOnDateOptions({
      query: {
        date: date.format('YYYY-MM-DD'),
      },
    }),
  });

export default useChildrenWithAttendanceOnDate;
