import { attendanceControllerDeleteAttendanceMutation } from '@/client/@tanstack/react-query.gen';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '../use-toast';

const useDeleteAttendance = (queryKeys: any[]) => {
  const client = useQueryClient();

  return useMutation({
    ...attendanceControllerDeleteAttendanceMutation(),
    onSuccess: () => {
      queryKeys.forEach((queryKey) => {
        client.invalidateQueries({
          queryKey: queryKey,
        });
      });
      toast({
        title: 'Docházka byla úspěšně smazána.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Nastala chyba během smazání docházky.',
        description: (error.response && error.response.data.error) ? error.response.data.error.message : `Neočekávaná chyba ${error.message}`,
        variant: 'destructive',
      });
    },
  });
};

export default useDeleteAttendance;
