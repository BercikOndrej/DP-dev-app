import { userControllerGetUserOptions } from '@/client/@tanstack/react-query.gen';
import { useQuery } from '@tanstack/react-query';

const useUser = (id: string | undefined) =>
  useQuery({
    ...userControllerGetUserOptions({
      path: {
        id: id!,
      },
    }),
    enabled: !!id,
  });

export default useUser;
