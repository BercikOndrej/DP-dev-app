import { Card } from '@/components/ui/card';
import { Skeleton } from '../ui/skeleton';
import createSkeletons from '@/utils/helpers/createSkeletons';

const PublicTeacherCardSkeleton = () => {
  const skeletons = createSkeletons(7);

  return (
    <Card className='overflow-hidden border-0 w-full max-w-[400px] mx-auto'>
      <Skeleton className='rounded-t-3xl h-56 w-full' />
      <div className='p-4 flex flex-col justify-between gap-2 '>
        <Skeleton className='h-6 w-28 my-4' />
        {skeletons.map((skeleton) => (
          <Skeleton key={skeleton} className='h-4 max-w-80' />
        ))}
        <Skeleton className='h-4 w-2/3' />
      </div>
    </Card>
  );
};

export default PublicTeacherCardSkeleton;
