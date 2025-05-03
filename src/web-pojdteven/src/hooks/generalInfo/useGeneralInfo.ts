import { generalInfoControllerGetInfoOptions } from '@/client/@tanstack/react-query.gen';
import { PageType } from '@/enums';
import { useQuery } from '@tanstack/react-query';

const useGeneralInfo = (page?: PageType) =>
  useQuery({
    ...generalInfoControllerGetInfoOptions({
      query: {
        page: page,
      },
    }),
  });

export default useGeneralInfo;
