import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  parenthoodControllerCreateParenthoodMutation,
  parenthoodControllerGetUserParenthoodItemsQueryKey,
  userControllerGetChidrenQueryKey,
} from '@/client/@tanstack/react-query.gen';
import { toast } from '../use-toast';

const useCreateParenthood = (userId: string) => {
  // Query keys
  const parenthoodItemsQueryKey =
    parenthoodControllerGetUserParenthoodItemsQueryKey({
      query: {
        userId: userId,
      },
    });

  const userChildrenQueryKey = userControllerGetChidrenQueryKey({
    path: {
      id: userId,
    },
  });

  const queryKeys = [userChildrenQueryKey, parenthoodItemsQueryKey];

  const queryClient = useQueryClient();

  return useMutation({
    ...parenthoodControllerCreateParenthoodMutation(),
    onSuccess: () => {
      queryKeys.forEach((queryKey) => {
        queryClient.invalidateQueries({
          queryKey: queryKey,
          refetchType: 'all',
        });
      });
      toast({
        title: 'Dítě bylo úspěšně přiděleno uživateli.',
        description: 'Nyní je uživatel zodpovědný za spravu dítěte',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Nastala chyba během přidělování dítěte.',
        description: (error.response && error.response.data.error) ? error.response.data.error.message : `Neočekávaná chyba ${error.message}`,
        variant: 'destructive',
      });
    },
  });
};

export default useCreateParenthood;
