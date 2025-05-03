import {
  childControllerGetChildQueryKey,
  childControllerGetChildrenQueryKey,
  childControllerUpdateChildMutation,
} from '@/client/@tanstack/react-query.gen';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '../use-toast';

const useUpdateChild = (childId: string) => {
  // Query keys
  const childrenQueryKey = childControllerGetChildrenQueryKey();
  const actualChildQueryKey = childControllerGetChildQueryKey({
    path: {
      id: childId,
    },
  });

  const queryKeys = [childrenQueryKey, actualChildQueryKey];

  const client = useQueryClient();

  return useMutation({
    ...childControllerUpdateChildMutation(),
    onSuccess: () => {
      queryKeys.forEach((queryKey) => {
        client.invalidateQueries({
          queryKey: queryKey,
          refetchType: 'all',
        });
      });
      toast({
        title: 'Informace byly úspěšně uloženy.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Nastala chyba během uložení informací.',
        description: (error.response && error.response.data.error) ? error.response.data.error.message : `Neočekávaná chyba ${error.message}`,
        variant: 'destructive',
      });
    },
  });
};

export default useUpdateChild;
