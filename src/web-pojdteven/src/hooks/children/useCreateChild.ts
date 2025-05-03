import {
  childControllerCreateChildMutation,
  childControllerGetChildrenQueryKey,
} from '@/client/@tanstack/react-query.gen';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '../use-toast';

const useCreateChild = () => {
  const client = useQueryClient();
  const childrenQueryKey = childControllerGetChildrenQueryKey();

  return useMutation({
    ...childControllerCreateChildMutation(),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: childrenQueryKey,
        refetchType: 'all',
      });
      toast({
        title: 'Dítě bylo úspěšně zaregistrováno.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Nastala chyba během registrace dítěte.',
        description: (error.response && error.response.data.error) ? error.response.data.error.message : `Neočekávaná chyba ${error.message}`,
        variant: 'destructive',
      });
    },
  });
};

export default useCreateChild;
