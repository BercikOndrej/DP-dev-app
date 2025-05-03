import { Button } from '@/components/ui/button';
import usePhotosFilterStore from '@/stores/PhotosFilterStore';
import { PHOTO_FILTER_VALUES } from '@/utils/constants';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router-dom';

const PhotoFilter = () => {
  const location = useLocation();
  const { filter, setFilter } = usePhotosFilterStore();
  const style =
    'hover:text-green-500 dark:hover:text-green-500 border-0 transation duration-500';
  const selectedStyle =
    'text-green-500 dark:text-green-500 bg-slate-100 dark:bg-slate-800';

  return (
    <div
      className={`grid grid-cols-2 max-w-[1140px] w-max m-auto md:w-full ${
        location.pathname === '/admin/photogallery'
          ? 'lg:flex lg:flex-row'
          : 'md:flex md:flex-row'
      } justify-center justify-items-center items-center gap-4 pt-16`}
      data-aos='fade-up'
    >
      {PHOTO_FILTER_VALUES.map(({ value, label }) => (
        <Button
          key={label}
          onClick={() => setFilter(value)}
          value={value}
          variant='outline'
          className={cn(style, value === filter ? selectedStyle : '')}
        >
          {label}
        </Button>
      ))}
    </div>
  );
};

export default PhotoFilter;
