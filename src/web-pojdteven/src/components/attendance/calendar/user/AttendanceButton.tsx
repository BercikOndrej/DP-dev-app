import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import useCurrentMonthStore from '@/stores/CurrentMonthStore';
import enrollBeforeDeadline from '@/utils/helpers/enrollBeforeDeadline';
import isCurrentMonth from '@/utils/helpers/isCurrentMonth';
import { Dayjs } from 'dayjs';
import isFromPast from "@/utils/helpers/isFromPast.ts";

interface Props {
  onAttendanceEdit: () => void;
  hasAttendance: boolean;
  day: Dayjs;
  isAdmin: boolean;
  className?: string;
}

const buttonGeneralStyles = 'my-4 mx-0 font-bold hidden lg:block w-full';

const AttendanceButton = ({
  onAttendanceEdit,
  hasAttendance,
  day,
  isAdmin,
  className,
}: Props) => {
  const currentMonth = useCurrentMonthStore((store) => store.currentMonth);

  if (!isCurrentMonth(day, currentMonth)) {
    return;
  }
  const condition = isAdmin ? (isFromPast(day.toDate())) : (!enrollBeforeDeadline(day))

  return (
    <Button
      onClick={onAttendanceEdit}
      disabled={condition}
      variant={hasAttendance ? 'destructive' : 'outline'}
      className={cn(
        buttonGeneralStyles,
        className,
        !hasAttendance && 'hover:bg-green-leaf hover:dark:bg-green-leaf'
      )}
    >
      {hasAttendance ? 'Odepsat' : 'Zapsat'}
    </Button>
  );
};

export default AttendanceButton;
