import { attendanceControllerEnrollNewNormalAttendanceOfChildMutation } from '@/client/@tanstack/react-query.gen';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '../use-toast';

const useEnrollAttendance = (queryKey: any) => {
  const queryClient = useQueryClient();
  const alternativeAttendanceItemsCountQueryKey = [
    'alternativeAttendanceItemsCount',
  ];

  return useMutation({
    ...attendanceControllerEnrollNewNormalAttendanceOfChildMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: alternativeAttendanceItemsCountQueryKey,
      });
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
      toast({
        title: 'Docházka byla úspěšně zapsána.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Nastala chyba během zapisování docházky.',
        description: (error.response && error.response.data.error) ? error.response.data.error.message : `Neočekávaná chyba ${error.message}`,
        variant: 'destructive',
      });
    },
  });
};

export default useEnrollAttendance;
