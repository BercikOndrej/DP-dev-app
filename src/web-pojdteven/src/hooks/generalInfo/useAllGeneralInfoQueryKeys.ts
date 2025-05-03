import { PageType } from '@/enums';
import {
  generalInfoControllerGetInfoQueryKey,
  generalInfoControllerGetNextPositionOfInfoOnPageQueryKey,
} from '../../client/@tanstack/react-query.gen';

const useAllGeneralInfoQueryKeys = (): any[] => [
  generalInfoControllerGetInfoQueryKey({
    query: {
      page: PageType.FOREST_CLUB,
    },
  }),
  generalInfoControllerGetInfoQueryKey({
    query: {
      page: PageType.ADAPTATION_PROGRAM,
    },
  }),
  generalInfoControllerGetNextPositionOfInfoOnPageQueryKey({
    query: {
      page: PageType.FOREST_CLUB,
    },
  }),
  generalInfoControllerGetNextPositionOfInfoOnPageQueryKey({
    query: {
      page: PageType.ADAPTATION_PROGRAM,
    },
  }),
];

export default useAllGeneralInfoQueryKeys;
