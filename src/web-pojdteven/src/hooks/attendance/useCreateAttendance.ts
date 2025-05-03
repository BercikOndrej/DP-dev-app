import { attendanceControllerCreateAttendanceMutation } from '@/client/@tanstack/react-query.gen';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '../use-toast';

const useCreateAttendance = (queryKeys: any[]) => {
  const client = useQueryClient();

  return useMutation({
    ...attendanceControllerCreateAttendanceMutation(),
    onSuccess: () => {
      queryKeys.forEach((queryKey) => {
        client.invalidateQueries({
          queryKey: queryKey,
        });
      });
      toast({
        title: 'Docházka byla úspěšně vytvořena.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Nastala chyba během vytvoření docházky.',
        description: (error.response && error.response.data.error) ? error.response.data.error.message : `Neočekávaná chyba ${error.message}`,
        variant: 'destructive',
      });
    },
  });
};

export default useCreateAttendance;
