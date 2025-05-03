import { useQuery } from '@tanstack/react-query';
import { actionControllerGetActionsOptions } from '@/client/@tanstack/react-query.gen';

const useActions = () =>
  useQuery({
    ...actionControllerGetActionsOptions(),
  });
export default useActions;
