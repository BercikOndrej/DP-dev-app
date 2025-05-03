import { attendanceControllerUnrollAttendanceOfChildMutation } from '@/client/@tanstack/react-query.gen';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '../use-toast';

const useUnrollAttendance = (queryKey: any) => {
  const queryClient = useQueryClient();
  const alternativeAttendanceItemsCountQueryKey = [
    'alternativeAttendanceItemsCount',
  ];

  return useMutation({
    ...attendanceControllerUnrollAttendanceOfChildMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: alternativeAttendanceItemsCountQueryKey,
      });
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });

      toast({
        title: 'Docházka byla úspěšně odepsána.',
        description: 'Náhradní docházku lze zapsat do dvou měsíců.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Nastala chyba během odepisování docházky',
        description: (error.response && error.response.data.error) ? error.response.data.error.message : `Neočekávaná chyba ${error.message}`,
        variant: 'destructive',
      });
    },
  });
};

export default useUnrollAttendance;
