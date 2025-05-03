import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils';
import {Dayjs} from 'dayjs';
import isFromPast from '@/utils/helpers/isFromPast.ts';

interface Props {
  onDelete: () => void;
  onCreate: (pickUp: boolean) => void;
  hasAttendance: boolean;
  day: Dayjs;
  className?: string;
}

const buttonGeneralStyles = 'mx-0 font-bold hidden lg:block w-full';

const TeacherAttendanceButtons = ({
  onDelete,
  onCreate,
  hasAttendance,
  day,
  className,
}: Props) => {
  return (
    <div className='flex flex-col w-full mb-2'>
      {hasAttendance ? (
        <Button
          onClick={onDelete}
          disabled={isFromPast(day.toDate())}
          variant={'destructive'}
          className={cn(buttonGeneralStyles, className)}
        >
          Odepsat
        </Button>
      ) : (
        <div className='flex flex-col gap-4'>
          <Button
            onClick={() => onCreate(false)}
            disabled={isFromPast(day.toDate())}
            variant={'outline'}
            className={cn(
              buttonGeneralStyles,
              'hover:bg-green-leaf hover:dark:bg-green-leaf',
              className
            )}
          >
            Zapsat
          </Button>
          <Button
            onClick={() => onCreate(true)}
            disabled={isFromPast(day.toDate())}
            variant={'outline'}
            className={cn(
              buttonGeneralStyles,
              'hover:bg-green-leaf hover:dark:bg-green-leaf',
              className
            )}
          >
            Zapsat svoz
          </Button>
        </div>
      )}
    </div>
  );
};

export default TeacherAttendanceButtons;
