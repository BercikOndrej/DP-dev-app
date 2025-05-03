import {
  actionControllerCreateActionMutation,
  actionControllerGetActionsQueryKey,
} from '@/client/@tanstack/react-query.gen';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '../use-toast';

const useCreateAction = () => {
  const client = useQueryClient();
  const actionsQueryKey = actionControllerGetActionsQueryKey();

  return useMutation({
    ...actionControllerCreateActionMutation(),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: actionsQueryKey,
      });
      toast({
        title: 'Akce byla úspěšně vytvořena.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Nastala chyba během vytvoření akce.',
        description: (error.response && error.response.data.error) ? error.response.data.error.message : `Neočekávaná chyba ${error.message}`,
        variant: 'destructive',
      });
    },
  });
};

export default useCreateAction;
