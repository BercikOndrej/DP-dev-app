import {
  parenthoodControllerDeleteParenthoodMutation,
  parenthoodControllerGetUserParenthoodItemsQueryKey,
  userControllerGetChidrenQueryKey,
} from '@/client/@tanstack/react-query.gen';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '../use-toast';

const useDeleteParenthood = (userId: string) => {
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
    ...parenthoodControllerDeleteParenthoodMutation(),
    onSuccess: () => {
      queryKeys.forEach((queryKey) => {
        queryClient.invalidateQueries({
          queryKey: queryKey,
          refetchType: 'all',
        });
      });
      toast({
        title: 'Dítě bylo úspěšně odebráno.',
        description: 'Uživatel již nadále nemůže spravovat toto dítě.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Nastala chyba během odebrání dítěte.',
        description: (error.response && error.response.data.error) ? error.response.data.error.message : `Neočekávaná chyba ${error.message}`,
        variant: 'destructive',
      });
    },
  });
};

export default useDeleteParenthood;
