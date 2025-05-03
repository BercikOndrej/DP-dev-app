import { CgDetailsLess } from 'react-icons/cg';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Dayjs } from 'dayjs';
import useWorkingTeachersOnDate from '@/hooks/teachers/useTeachersWorkOnDate';
import { BsBookmarkCheckFill } from 'react-icons/bs';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import AttendanceButton from './AttendanceButton';
import { Skeleton } from '@/components/ui/skeleton';
import createSkeletons from '@/utils/helpers/createSkeletons';

interface Props {
  day: Dayjs;
  hasAttendance: boolean;
  onAttendanceEdit: () => void;
  isAdmin: boolean;
}

const UserDayDetailDialog = ({
  day,
  hasAttendance,
  onAttendanceEdit,
  isAdmin,
}: Props) => {
  const { data: teachers, isLoading } = useWorkingTeachersOnDate(day);
  const skeletons = createSkeletons(2);

  return (
    <Dialog>
      <DialogTrigger className='p-2 mt-auto lg:mt-0'>
        <CgDetailsLess className='w-4 h-4 lg:w-8 lg:h-8 hover:scale-125 duration-500 ease-linear' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className='flex flex-row justify-between items-center pt-8'>
              <span>{day.format('D. M')}</span>
              {hasAttendance && (
                <BsBookmarkCheckFill className='text-green-leaf w-8 h-8' />
              )}
            </div>
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <Table className='p-4'>
          <TableBody>
            {isLoading &&
              skeletons.map((s) => (
                <TableRow key={s}>
                  <TableCell>
                    <Skeleton className='w-full h-8' />
                  </TableCell>
                </TableRow>
              ))}
            {teachers?.map((teacher) => (
              <TableRow key={teacher.id} className='rounded-lg'>
                <TableCell>{teacher.fullName}</TableCell>
                <TableCell>
                  <a
                    href={`tel:${teacher.phoneNumber?.replace(' ', '')}`}
                    className='hover:text-green-500 duration-500 ease-linear'
                  >
                    {teacher.phoneNumber}
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <DialogFooter>
          <AttendanceButton
            hasAttendance={hasAttendance}
            day={day}
            isAdmin={isAdmin}
            onAttendanceEdit={onAttendanceEdit}
            className='block'
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserDayDetailDialog;
