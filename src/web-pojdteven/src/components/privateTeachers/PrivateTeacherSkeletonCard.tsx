import createSkeletons from '@/utils/helpers/createSkeletons';
import { Card } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

const PrivateTeacherSkeletonCard = () => {
  const skeletons = createSkeletons(3);

  return (
    <Card className='overflow-hidden border-0 flex flex-row'>
      <Skeleton className='w-44 max-h-52 rounded-lt-3xl sm:block hidden' />
      <div className='p-4 flex flex-col gap-4'>
        <Skeleton className='h-6 w-28' />
        {skeletons.map((skeleton) => (
          <div
            key={skeleton}
            className='flex flex-row justify-between gap-4 items-center'
          >
            <Skeleton className='w-8 h-8 rounded-md' />
            <Skeleton className='w-36 rounded-lg h-4' />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PrivateTeacherSkeletonCard;
