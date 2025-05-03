import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  dayActivityControllerCreateDayActivityMutation,
  dayActivityControllerGetAllDayActivitiesQueryKey,
} from '../../client/@tanstack/react-query.gen';
import { toast } from '../use-toast';

const useCreateActivity = () => {
  // Query keys
  const dayActivitiesQueryKey =
    dayActivityControllerGetAllDayActivitiesQueryKey();

  const client = useQueryClient();

  return useMutation({
    ...dayActivityControllerCreateDayActivityMutation(),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: dayActivitiesQueryKey,
        refetchType: 'all',
      });
      toast({
        title: 'Aktivity byla úspěšně vytvořena.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Nastala chyba během vytvoření aktivity.',
        description: (error.response && error.response.data.error) ? error.response.data.error.message : `Neočekávaná chyba ${error.message}`,
        variant: 'destructive',
      });
    },
  });
};

export default useCreateActivity;
