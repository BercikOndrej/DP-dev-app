import { useQuery } from '@tanstack/react-query';
import { contactInfoControllerGetOneContactInfoOptions } from '@/client/@tanstack/react-query.gen';

const useContactInfo = (id: number) =>
  useQuery({
    ...contactInfoControllerGetOneContactInfoOptions({
      path: {
        id: id,
      },
    }),
  });

export default useContactInfo;
