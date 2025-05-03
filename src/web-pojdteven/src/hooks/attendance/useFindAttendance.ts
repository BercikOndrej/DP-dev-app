import { attendanceControllerFindAttendanceOptions } from '@/client/@tanstack/react-query.gen';
import { useQuery } from '@tanstack/react-query';

const useFindAttendance = (userId: string, dateStr: string) =>
  useQuery({
    ...attendanceControllerFindAttendanceOptions({
      query: {
        userId: userId,
        dateStr: dateStr,
      },
    }),
    enabled: !!userId,
  });

export default useFindAttendance;
