import { dayActivityControllerGetAllDayActivitiesOptions } from '@/client/@tanstack/react-query.gen';
import { useQuery } from '@tanstack/react-query';

const useDayActivities = () =>
  useQuery({
    ...dayActivityControllerGetAllDayActivitiesOptions(),
  });

export default useDayActivities;
