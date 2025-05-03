import useSponsors from '@/hooks/sponsors/useSponsors';
import createSkeletons from '@/utils/helpers/createSkeletons';
import { PhotoProvider } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { Skeleton } from '@/components/ui/skeleton';
import SponsorCard from '@/components/sponsors/SponsorCard';
import { useLocation } from 'react-router-dom';

const SponsorsList = () => {
  const { data: sponsors, isLoading } = useSponsors();
  const skeletons = createSkeletons(4);
  const location = useLocation();

  return (
    <div className='w-full'>
      <p className='text-2xl mt-16 text-center font-title'>
        Naši činnost podpořili:
      </p>
      <div
        className={`flex flex-col ${
          location.pathname === '/admin/sponsors'
            ? 'lg:flex-row'
            : 'md:flex-row'
        } gap-4 items-center justify-center justify-items-center p-8`}
      >
        {isLoading &&
          skeletons.map((skeleton) => (
            <Skeleton key={skeleton} className={` ${
              location.pathname === '/admin/sponsors'
                ? 'lg:w-1/4'
                : 'md:w-1/4'
            } w-full  h-96 rounded-3xl`} />
          ))}
        <PhotoProvider>
          {sponsors?.map((sponsor) => (
            <SponsorCard key={sponsor.id} sponsor={sponsor} />
          ))}
        </PhotoProvider>
      </div>
    </div>
  );
};

export default SponsorsList;
