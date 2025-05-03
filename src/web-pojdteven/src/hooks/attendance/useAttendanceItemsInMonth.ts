import { attendanceControllerGetAllNormalAttendanceItemsOfChildInMonthOptions } from '@/client/@tanstack/react-query.gen';
import { useQuery } from '@tanstack/react-query';

const useAttendanceItemsOfChildInMonth = (query: {
  childId?: string;
  month: number;
}) =>
  useQuery({
    ...attendanceControllerGetAllNormalAttendanceItemsOfChildInMonthOptions({
      path: {
        childId: query.childId!,
      },
      query: {
        month: query.month,
      },
    }),
    enabled: !!query.childId,
  });

export default useAttendanceItemsOfChildInMonth;
