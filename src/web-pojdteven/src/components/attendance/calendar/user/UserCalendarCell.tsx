import { Separator } from '@/components/ui/separator';
import { AttendanceTag, Role } from '@/enums';
import useEnrollAttendance from '@/hooks/attendance/useEnrollAttendance';
import useUnrollAttendance from '@/hooks/attendance/useUnrollAttendance';
import { cn } from '@/lib/utils';
import useChildStore from '@/stores/ChildStore';
import useCurrentMonthStore from '@/stores/CurrentMonthStore';
import isCurrentMonth from '@/utils/helpers/isCurrentMonth';
import { Dayjs } from 'dayjs';
import { BsBookmarkCheckFill } from 'react-icons/bs';
import UserDayDetailDialog from './UserDayDetailDialog';
import { attendanceControllerGetAllNormalAttendanceItemsOfChildInMonthQueryKey } from '@/client/@tanstack/react-query.gen';
import useAttendanceItemsOfChildInMonth from '@/hooks/attendance/useAttendanceItemsInMonth';
import findAttendanceItems from '@/utils/helpers/findAttendanceItems';
import { Skeleton } from '@/components/ui/skeleton';
import useAuthStore from '@/stores/AuthStore';
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import AttendanceButton from './AttendanceButton';

interface Props {
  day: Dayjs;
}

// Styles
const commonStyle =
  'rounded-lg flex flex-col justify-start w-full font-title font-semibold hover:bg-slate-100 hover:dark:bg-slate-800 cursor-pointer lg: cursor-default ease-linear duration-500';
const selectedStyle = 'bg-slate-200 dark:bg-slate-800';
const disabledStyle = 'text-slate-300';

const UserCalendarCell = ({ day }: Props) => {
  const currentMonth = useCurrentMonthStore((store) => store.currentMonth);
  const childId = useChildStore((store) => store.childId);
  const user = useAuthStore((store) => store.user);
  const location = useLocation();
  const dayLabel = day.date().toString().padStart(2, '0');
  const isRenderOnAdmin =
    user?.role === Role.ADMIN &&
    location.pathname.startsWith('/admin/attendance');

  const { data: attendanceItemsOfChild, isLoading } =
    useAttendanceItemsOfChildInMonth({
      childId: childId,
      month: currentMonth.month(),
    });

  const attendance = useMemo(
    () => findAttendanceItems(day, attendanceItemsOfChild)?.[0],
    [day, attendanceItemsOfChild],
  );
  const hasAttendance = attendance !== undefined;

  const normalAttendanceItemsQueryKey =
    attendanceControllerGetAllNormalAttendanceItemsOfChildInMonthQueryKey({
      path: {
        childId: childId!,
      },
      query: {
        month: currentMonth.month(),
      },
    });

  // const createAttendance = useCreateAttendance([normalAttendanceItemsQueryKey]);
  // const deleteAttendance = useDeleteAttendance([normalAttendanceItemsQueryKey]);
  const unrollAttendance = useUnrollAttendance(normalAttendanceItemsQueryKey);
  const enrollAttendance = useEnrollAttendance(normalAttendanceItemsQueryKey);

  // const createAttendanceAction = () =>
  //   createAttendance.mutate({
  //     body: {
  //       date: day.startOf('day').format('YYYY-MM-DD'),
  //       childId: childId!,
  //       tag: AttendanceTag.NORMAL,
  //     },
  //   });

  // const deleteAttendanceAction = () =>
  //   deleteAttendance.mutate({
  //     path: {
  //       id: attendance?.id ?? '',
  //     },
  //   });

  const unrollAttendanceAction = () =>
    unrollAttendance.mutate({
      path: {
        id: attendance?.id ?? '',
      },
    });

  const enrollAttendanceAction = () =>
    enrollAttendance.mutate({
      body: {
        date: day.startOf('day').format('YYYY-MM-DD'),
        childId: childId,
        tag: AttendanceTag.NORMAL,
      },
    });

  const renderAttendanceIcon = () => {
    if (!attendance) return null;
    return (
      <BsBookmarkCheckFill className='w-4 h-4 lg:w-8 lg:h-8 text-green-leaf md:ml-auto group-hover:scale-125 duration-500 ease-linear' />
    );
  };

  const renderAttendanceButton = () => {
    const action = attendance ? unrollAttendanceAction : enrollAttendanceAction;

    return (
      <AttendanceButton
        day={day}
        isAdmin={isRenderOnAdmin}
        hasAttendance={hasAttendance}
        onAttendanceEdit={action}
      />
    );
  };

  if (isLoading) {
    return <Skeleton className='flex-grow h-14 sm:h-20 lg:h-40' />;
  }
  return (
    <div
      className={cn(
        commonStyle,
        !isCurrentMonth(day, currentMonth)
          ? disabledStyle
          : day.isToday()
            ? selectedStyle
            : '',
        'group',
      )}
    >
      <Separator
        orientation='horizontal'
        className={cn(
          'h-1 rounded-xl w-full group-hover:bg-green-leaf group-hover:dark:bg-green-leaf',
          !isCurrentMonth(day, currentMonth)
            ? ''
            : 'bg-slate-600 dark:bg-slate-400',
        )}
      />
      <div className='flex flex-col gap-2 md:gap-4 items-center justify-between md:px-4 h-full'>
        <div className='flex flex-col items-center md:flex-row gap-4 md:gap-0 py-4 pb-0 md:pb-4 lg:mx-4 justify-between w-full h-full'>
          <span className='text-sm lg:text-lg xl:text-2xl group-hover:text-green-leaf group-hover:dark:text-green-leaf group-hover:scale-125 ease-linear duration-500'>
            {dayLabel}
          </span>
          {renderAttendanceIcon()}
          <UserDayDetailDialog
            hasAttendance={hasAttendance}
            day={day}
            isAdmin={isRenderOnAdmin}
            onAttendanceEdit={
              attendance ? unrollAttendanceAction : enrollAttendanceAction
            }
          />
        </div>
        {renderAttendanceButton()}
      </div>
    </div>
  );
};

export default UserCalendarCell;
