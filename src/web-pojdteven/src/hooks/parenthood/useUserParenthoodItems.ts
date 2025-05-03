import { useQuery } from '@tanstack/react-query';
import { parenthoodControllerGetUserParenthoodItemsOptions } from '../../client/@tanstack/react-query.gen';

const useUserParenthoodItems = (userId: string) =>
  useQuery({
    ...parenthoodControllerGetUserParenthoodItemsOptions({
      query: {
        userId: userId,
      },
    }),
    enabled: !!userId,
  });

export default useUserParenthoodItems;
