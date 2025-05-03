import { childControllerGetChildrenOptions } from '@/client/@tanstack/react-query.gen';
import { useQuery } from '@tanstack/react-query';

const useChildren = () =>
  useQuery({
    ...childControllerGetChildrenOptions(),
  });

export default useChildren;
