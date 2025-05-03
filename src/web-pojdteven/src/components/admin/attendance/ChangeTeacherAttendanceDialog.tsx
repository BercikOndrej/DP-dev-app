import { User } from '@/client';
import {
  attendanceControllerFindAttendanceQueryKey,
  userControllerGetWorkingTeachersOnDateQueryKey,
} from '@/client/@tanstack/react-query.gen';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from '@/components/ui/table';
import useChangeAttendance from '@/hooks/attendance/useChangeAttendance';
import useTeachers from '@/hooks/teachers/useTeachers';
import { cn } from '@/lib/utils';
import createSkeletons from '@/utils/helpers/createSkeletons';
import { Dayjs } from 'dayjs';
import { RefreshCcw } from 'lucide-react';
import { useMemo, useState } from 'react';

interface Props {
  day: Dayjs;
  teacherId: string;
  isPickUp: boolean;
}

const ChangeTeacherAttendanceDialog = ({ day, teacherId, isPickUp }: Props) => {
  const [selectedTeacher, setSelectedTeacher] = useState<User>();
  const [error, setError] = useState<string>();
  const [open, setOpen] = useState(false);
  const { data: teachers, isLoading } = useTeachers();

  const teacherSkeletons = createSkeletons(10);

  // Query keys
  const workingTeachersQuery = userControllerGetWorkingTeachersOnDateQueryKey({
    query: {
      date: day.format('YYYY-MM-DD'),
    },
  });

  const findedAttendanceQueryKey = useMemo(
    () =>
      attendanceControllerFindAttendanceQueryKey({
        query: {
          dateStr: day.startOf('day').format('YYYY-MM-DD'),
          userId: teacherId,
        },
      }),
    [day, teacherId]
  );

  const changeAttendance = useChangeAttendance([
    workingTeachersQuery,
    findedAttendanceQueryKey,
  ]);

  // Handle on Confirm
  const onConfirm = () => {
    if (!selectedTeacher) {
      setError('Nebyl vybrán náhradní průvodce.');
    } else {
      changeAttendance.mutate({
        body: {
          originTeacherId: teacherId,
          nextTeacherId: selectedTeacher.id,
          dateStr: day.startOf('day').format('YYYY-MM-DD'),
          isPickUp: isPickUp,
        },
      });
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className='p-2 items-center rounded-lg bg-slate-200 hover:bg-slate-200/70 dark:bg-slate-700 dark:hover:bg-slate-700/80 w-max'>
          <RefreshCcw size={16} />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Záměna docházky</DialogTitle>
          <DialogDescription>
            Vyberte náhradního průvodce. Pokud změníte docházku reprezentující
            svoz, nahrazený průvodce bude mít zaznamenán také svoz. Zároveň všem
            rodičům budou rozeslány emaily o změně.
          </DialogDescription>
        </DialogHeader>
        <Table className='p-4'>
          <TableCaption>Průvodci</TableCaption>
          <TableBody>
            {isLoading &&
              teacherSkeletons.map((s) => (
                <TableRow key={s}>
                  <TableCell>
                    <Skeleton className='w-full h-8' />
                  </TableCell>
                </TableRow>
              ))}
            {teachers
              ?.filter((teacher) => teacher.id !== teacherId)
              .map((teacher) => (
                <TableRow
                  key={teacher.fullName}
                  onClick={() => {
                    setSelectedTeacher(teacher);
                  }}
                  className={cn(
                    'rounded-lg cursor-pointer',
                    selectedTeacher?.id === teacher.id &&
                      'bg-green-200 dark:bg-green-800 hover:bg-green-200 hover:dark:bg-green-800'
                  )}
                >
                  <TableCell className='text-center'>
                    {teacher.fullName}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {error && (
          <span className='text-red-500 dark:text-red-600'>{error}</span>
        )}
        <DialogFooter className='flex flex-row justify-between gap-2'>
          <Button
            variant='outline'
            className='w-full'
            onClick={() => setOpen(false)}
          >
            Zpět
          </Button>
          <Button
            variant='outline'
            onClick={onConfirm}
            className='w-full hover:bg-green-leaf dark:hover:bg-green-leaf'
          >
            Vyměnit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeTeacherAttendanceDialog;
