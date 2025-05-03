import createSkeletons from '@/utils/helpers/createSkeletons';
import { Skeleton } from '@/components/ui/skeleton';

const ContactCardSkeleton = () => {
  const skeletons = createSkeletons(3);

  return (
    <div className='dark:bg-slate-800 bg-slate-100 p-6 shadow-2xl rounded-3xl flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>
        <Skeleton className='w-full h-5' />
        <Skeleton className='w-1/3 h-3' />
      </div>
      <div className='flex flex-col gap-4 w-full'>
        {skeletons.map((skeleton) => (
          <div key={skeleton} className='flex flex-row gap-4 items-center'>
            <Skeleton className='rounded-full w-12 h-10' />
            <Skeleton className='rounded-md w-full h-5' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactCardSkeleton;
