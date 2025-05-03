import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import useCountAlternativeAttendanceItemsOfChild from '@/hooks/attendance/useAlternativeAttendanceItemsOfChild';
import useChildStore from '@/stores/ChildStore';

const UserAlternativeAttendanceCountLabel = () => {
  const childId = useChildStore((store) => store.childId);

  const { data: alternativeAttendanceCount, isLoading } =
    useCountAlternativeAttendanceItemsOfChild(childId ?? '');

  return (
    <div className='flex flex-row m-4 justify-start gap-4'>
      <span>Přehledový počet náhradní docházky:</span>
      {isLoading ? (
        <Skeleton className='w-7 h-6' />
      ) : (
        <Badge>{`${alternativeAttendanceCount}`}</Badge>
      )}
    </div>
  );
};

export default UserAlternativeAttendanceCountLabel;
