import { userControllerGetUsersOptions } from '@/client/@tanstack/react-query.gen';
import { useQuery } from '@tanstack/react-query';

const useUsers = () =>
  useQuery({
    ...userControllerGetUsersOptions(),
  });

export default useUsers;
