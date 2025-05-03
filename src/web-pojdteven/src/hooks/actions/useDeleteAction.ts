import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  actionControllerDeleteActionMutation,
  actionControllerGetActionsQueryKey,
} from '@/client/@tanstack/react-query.gen.ts';
import { toast } from '../use-toast';

const useDeleteAction = () => {
  const queryClient = useQueryClient();
  const actionsQueryKey = actionControllerGetActionsQueryKey();

  return useMutation({
    ...actionControllerDeleteActionMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: actionsQueryKey,
      });
      toast({
        title: 'Akce byla úspěšně smazána.',
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

export default useDeleteAction;
