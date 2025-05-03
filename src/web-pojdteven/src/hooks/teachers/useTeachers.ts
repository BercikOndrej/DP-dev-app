import { userControllerGetTeachersOptions } from '@/client/@tanstack/react-query.gen';
import { useQuery } from '@tanstack/react-query';

const useTeachers = () =>
  useQuery({
    ...userControllerGetTeachersOptions(),
  });

export default useTeachers;
