import { generalInfoControllerGetInfoByIdOptions } from '@/client/@tanstack/react-query.gen';
import { useQuery } from '@tanstack/react-query';

const useGeneralInfoById = (id: number) =>
  useQuery({
    ...generalInfoControllerGetInfoByIdOptions({
      path: {
        id: id,
      },
    }),
    enabled: !!id,
  });

export default useGeneralInfoById;
