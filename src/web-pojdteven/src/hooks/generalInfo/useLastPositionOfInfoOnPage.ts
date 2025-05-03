import { generalInfoControllerGetNextPositionOfInfoOnPageOptions } from '@/client/@tanstack/react-query.gen';
import { PageType } from '@/enums';
import { useQuery } from '@tanstack/react-query';

const useNextPositionOfInfoOnPage = (page: PageType) =>
  useQuery({
    ...generalInfoControllerGetNextPositionOfInfoOnPageOptions({
      query: {
        page: page,
      },
    }),
  });

export default useNextPositionOfInfoOnPage;
