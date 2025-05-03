import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {ScrollArea} from '@/components/ui/scroll-area';
import {Skeleton} from '@/components/ui/skeleton';
import {Table, TableBody, TableCaption, TableCell, TableRow,} from '@/components/ui/table';
import useWorkingTeachersOnDate from '@/hooks/teachers/useTeachersWorkOnDate';
import useAuthStore from '@/stores/AuthStore';
import createSkeletons from '@/utils/helpers/createSkeletons';
import {Dayjs} from 'dayjs';
import {BsBookmarkCheckFill} from 'react-icons/bs';
import {CgDetailsLess} from 'react-icons/cg';
import useChildrenWithAttendanceOnDate from '../../../../hooks/children/useChildrenWithAttendanceOnDate';
import TeacherAttendanceButtons from '@/components/admin/attendance/TeacherAttendanceButtons';
import {AttendanceTag, Role} from '@/enums';
import {Attendance} from '@/client';
import useFindAttendance from '@/hooks/attendance/useFindAttendance';
import useDeleteAttendance from '@/hooks/attendance/useDeleteAttendance';
import useCreateAttendance from '@/hooks/attendance/useCreateAttendance';
import {
  attendanceControllerFindAttendanceQueryKey,
  userControllerGetWorkingTeachersOnDateQueryKey,
} from '@/client/@tanstack/react-query.gen';
import {useMemo} from 'react';
import useTeacherStore from '@/stores/TeacherStore';
import ChangeTeacherAttendanceDialog from '@/components/admin/attendance/ChangeTeacherAttendanceDialog';
import isFromPast from '@/utils/helpers/isFromPast.ts';

interface Props {
  day: Dayjs;
}
const TeacherDayDetailDialog = ({ day }: Props) => {
  const currentTeacher = useAuthStore((store) => store.user);
  const { data: teachers, isLoading: isTeachersLoading } =
    useWorkingTeachersOnDate(day);
  const { data: children, isLoading: isChildrenLoading } =
    useChildrenWithAttendanceOnDate(day);
  const teacherSkeletons = createSkeletons(2);
  const childrenSkeletons = createSkeletons(20);

  // Stuff for attendance edit
  const editableTeacherId = useTeacherStore((store) => store.teacherId);
  const isAdmin =
    location.pathname.startsWith('/admin/attendance/teachers') &&
    currentTeacher?.role === Role.ADMIN;

  const workingTeachersQuery = userControllerGetWorkingTeachersOnDateQueryKey({
    query: {
      date: day.format('YYYY-MM-DD'),
    },
  });

  const proccessTeacherId = isAdmin ? editableTeacherId : currentTeacher?.id;

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

  const isTodayOrAfter = !isFromPast(day.toDate())

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

  return (
    <Dialog>
      <DialogTrigger className='p-2 lg:mt-0'>
        <CgDetailsLess className='w-4 h-4 lg:w-8 lg:h-8 hover:scale-125 duration-500 ease-linear' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className='flex flex-row justify-between items-center pt-8'>
              <span>{day.format('D. M')}</span>
              {isCurrentUserWorking && (
                <BsBookmarkCheckFill className='text-green-leaf w-8 h-8' />
              )}
            </div>
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <Table className='p-4'>
          <TableCaption>Průvodci</TableCaption>
          <TableBody>
            {isTeachersLoading &&
              teacherSkeletons.map((s) => (
                <TableRow key={s}>
                  <TableCell>
                    <Skeleton className='w-full h-8' />
                  </TableCell>
                </TableRow>
              ))}
            {teachers?.map((teacher) => (
              <TableRow key={teacher.fullName} className='rounded-lg'>
                <TableCell>{teacher.fullName}</TableCell>
                <TableCell></TableCell>
                {isAdmin && isTodayOrAfter && (
                  <TableCell className='text-end'>
                    <ChangeTeacherAttendanceDialog
                      day={day}
                      teacherId={teacher.id ?? ''}
                      isPickUp={
                        teacher.fullName?.trim().endsWith('(svoz)') ?? false
                      }
                    />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <span className='text-center mt-4 text-sm text-slate-500 dark:text-slate-400'>
          Děti ({children?.length ?? 'počet'})
        </span>

        <ScrollArea className='w-full h-96'>
          <Table className='p-4'>
            <TableBody>
              {isChildrenLoading &&
                childrenSkeletons.map((s) => (
                  <TableRow key={s}>
                    <TableCell>
                      <Skeleton className='w-full h-8' />
                    </TableCell>
                  </TableRow>
                ))}
              {children?.map((child) => (
                <TableRow key={child.id} className='rounded-lg'>
                  <TableCell>{child.fullName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
        <DialogFooter>
          {isAdmin && (
            <TeacherAttendanceButtons
              onDelete={deleteAttendanceAction}
              onCreate={createAttendanceAction}
              hasAttendance={isCurrentUserWorking ?? false}
              day={day}
            />
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TeacherDayDetailDialog;
