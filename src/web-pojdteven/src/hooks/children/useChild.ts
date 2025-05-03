import { childControllerGetChildOptions } from '@/client/@tanstack/react-query.gen';
import { useQuery } from '@tanstack/react-query';

const useChild = (id: string) =>
  useQuery({
    ...childControllerGetChildOptions({
      path: {
        id: id,
      },
    }),
    enabled: !!id,
  });

export default useChild;
