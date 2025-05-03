import { Attendance } from '@/client';
import {
  attendanceControllerFindAttendanceQueryKey,
  userControllerGetWorkingTeachersOnDateQueryKey,
} from '@/client/@tanstack/react-query.gen';
import TeacherAttendanceButtons from '@/components/admin/attendance/TeacherAttendanceButtons';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { AttendanceTag, Role } from '@/enums';
import useCreateAttendance from '@/hooks/attendance/useCreateAttendance';
import useDeleteAttendance from '@/hooks/attendance/useDeleteAttendance';
import useFindAttendance from '@/hooks/attendance/useFindAttendance';
import useWorkingTeachersOnDate from '@/hooks/teachers/useTeachersWorkOnDate';
import { cn } from '@/lib/utils';
import useAuthStore from '@/stores/AuthStore';
import useCurrentMonthStore from '@/stores/CurrentMonthStore';
import useTeacherStore from '@/stores/TeacherStore';
import isCurrentMonth from '@/utils/helpers/isCurrentMonth';
import { Dayjs } from 'dayjs';
import { useMemo } from 'react';
import { BsBookmarkCheckFill } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';
import TeacherDayDetailDialog from './TeacherDayDetailDialog';

// Styles
const commonStyle =
  'rounded-lg flex flex-col justify-start w-full font-title font-semibold hover:bg-slate-100 hover:dark:bg-slate-800 cursor-pointer lg: cursor-default ease-linear duration-500';
const selectedStyle = 'bg-slate-200 dark:bg-slate-800';
const disabledStyle = 'text-slate-300';

interface Props {
  day: Dayjs;
}

const TeacherCalendarCell = ({ day }: Props) => {
  const currentMonth = useCurrentMonthStore((store) => store.currentMonth);
  const teacherId = useAuthStore((store) => store.user);
  const editableTeacherId = useTeacherStore((store) => store.teacherId);
  const { data: teachers, isLoading } = useWorkingTeachersOnDate(day);
  const location = useLocation();
  const isAdmin =
    location.pathname.startsWith('/admin/attendance/teachers') &&
    teacherId?.role === Role.ADMIN;

  const workingTeachersQuery = userControllerGetWorkingTeachersOnDateQueryKey({
    query: {
      date: day.format('YYYY-MM-DD'),
    },
  });

  const proccessTeacherId = isAdmin ? editableTeacherId : teacherId?.id;

  const findedAttendanceQueryKey = useMemo(
    () =>
      attendanceControllerFindAttendanceQueryKey({
        query: {
          dateStr: day.startOf('day').format('YYYY-MM-DD'),
          userId: proccessTeacherId,
        },
      }),
    [day, proccessTeacherId]
  );

  const isCurrentUserWorking = teachers?.some(
    (user) => user.id === proccessTeacherId
  );

  const createAttendance = useCreateAttendance([
    workingTeachersQuery,
    findedAttendanceQueryKey,
  ]);

  const deleteAttendance = useDeleteAttendance([
    workingTeachersQuery,
    findedAttendanceQueryKey,
  ]);

  const { data: findedAttendance } = useFindAttendance(
    proccessTeacherId ?? '',
    day.startOf('day').format('YYYY-MM-DD')
  ) as { data: Attendance | null };

  const deleteAttendanceAction = () =>
    deleteAttendance.mutate({
      path: {
        id: findedAttendance?.id ?? '',
      },
    });

  const createAttendanceAction = (pickUp: boolean) =>
    createAttendance.mutate({
      body: {
        tag: AttendanceTag.NORMAL,
        userId: proccessTeacherId!,
        date: day.startOf('day').format('YYYY-MM-DD'),
        pickUp: pickUp,
      },
    });

  if (isLoading) {
    return <Skeleton className='flex-grow w-full h-14 sm:h-20 lg:h-40' />;
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
        'group'
      )}
    >
      <Separator
        orientation='horizontal'
        className={cn(
          'h-1 rounded-xl w-full group-hover:bg-green-leaf group-hover:dark:bg-green-leaf',
          !isCurrentMonth(day, currentMonth)
            ? ''
            : 'bg-slate-600 dark:bg-slate-400'
        )}
      />
      <div className='flex flex-col gap-2 md:gap-4 items-center justify-between md:px-4 h-full'>
        <div className='flex flex-col items-center md:flex-row gap-4 md:gap-0 py-4 pb-0 md:pb-4 lg:mx-4 justify-between w-full'>
          <span className='text-sm lg:text-lg xl:text-2xl group-hover:text-green-leaf group-hover:dark:text-green-leaf group-hover:scale-125 ease-linear duration-500'>
            {day.date() < 10 ? `0${day.date()}` : day.date().toString()}
          </span>
          {isCurrentUserWorking && (
            <BsBookmarkCheckFill className='w-4 h-4 lg:w-8 lg:h-8 text-green-leaf md:ml-auto group-hover:scale-125 duration-500 ease-linear' />
          )}
          <TeacherDayDetailDialog day={day} />
        </div>
        {isAdmin && (
          <TeacherAttendanceButtons
            onCreate={createAttendanceAction}
            onDelete={deleteAttendanceAction}
            hasAttendance={isCurrentUserWorking ?? false}
            day={day}
          />
        )}
      </div>
    </div>
  );
};

export default TeacherCalendarCell;
