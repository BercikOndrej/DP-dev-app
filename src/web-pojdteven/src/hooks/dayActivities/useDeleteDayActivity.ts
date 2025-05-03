import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  dayActivityControllerDeleteDayActivityMutation,
  dayActivityControllerGetAllDayActivitiesQueryKey,
} from '../../client/@tanstack/react-query.gen';
import { toast } from '../use-toast';

const useDeleteDayActivity = () => {
  // Query key
  const dayActivitiesQueryKey =
    dayActivityControllerGetAllDayActivitiesQueryKey();

  const client = useQueryClient();

  return useMutation({
    ...dayActivityControllerDeleteDayActivityMutation(),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: dayActivitiesQueryKey,
        refetchType: 'all',
      });
      toast({
        title: 'Aktivity byla úspěšně smazána.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Nastala chyba během smazání aktivity.',
        description: (error.response && error.response.data.error) ? error.response.data.error.message : `Neočekávaná chyba ${error.message}`,
        variant: 'destructive',
      });
    },
  });
};

export default useDeleteDayActivity;
