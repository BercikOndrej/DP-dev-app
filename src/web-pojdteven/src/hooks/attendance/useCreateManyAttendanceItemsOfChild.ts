import { attendanceControllerCreateManyChildAttendanceItemsBySchoolDaysMutation } from '@/client/@tanstack/react-query.gen';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '../use-toast';

const useCreateManyAttendanceItemsOfChild = (queryKeys: any[]) => {
  const client = useQueryClient();

  return useMutation({
    ...attendanceControllerCreateManyChildAttendanceItemsBySchoolDaysMutation(),
    onSuccess: () => {
      queryKeys.forEach((queryKey) => {
        client.invalidateQueries({
          queryKey: queryKey,
        });
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

export default useCreateManyAttendanceItemsOfChild;
