import { userControllerGetChidrenOptions } from '@/client/@tanstack/react-query.gen';
import useAuthStore from '@/stores/AuthStore';
import { useQuery } from '@tanstack/react-query';

const useCurrentUserChildren = () => {
  const user = useAuthStore((store) => store.user);

  return useQuery({
    ...userControllerGetChidrenOptions({
      path: {
        id: user!.id,
      },
    }),
    enabled: !!user,
  });
};

export default useCurrentUserChildren;
