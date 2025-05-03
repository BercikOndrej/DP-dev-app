import { useQuery } from '@tanstack/react-query';
import { sponsorControllerGetSponsorsOptions } from '@/client/@tanstack/react-query.gen';

const useSponsors = () =>
  useQuery({
    ...sponsorControllerGetSponsorsOptions(),
  });

export default useSponsors;
