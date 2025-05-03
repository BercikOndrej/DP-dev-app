import { attendanceControllerGetCountOfAllAlternativeAttendanceItemsOfChild } from '@/client';
import { useQuery } from '@tanstack/react-query';

const useCountAlternativeAttendanceItemsOfChild = (childId: string) =>
  useQuery({
    queryFn: () =>
      attendanceControllerGetCountOfAllAlternativeAttendanceItemsOfChild({
        path: {
          childId: childId,
        },
      })
        .then((res) => res.data)
        .catch((error) => console.log(error)),
    queryKey: ['alternativeAttendanceItemsCount'],
    enabled: !!childId,
  });

export default useCountAlternativeAttendanceItemsOfChild;
