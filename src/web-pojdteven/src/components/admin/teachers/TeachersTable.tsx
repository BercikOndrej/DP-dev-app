import useTeachers from '@/hooks/teachers/useTeachers';
import { userControllerGetTeachersQueryKey } from '../../../client/@tanstack/react-query.gen';
import useDeleteUser from '@/hooks/users/useDeleteUser';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Link, useLocation } from 'react-router-dom';
import { Edit2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import createSkeletons from '@/utils/helpers/createSkeletons';
import DataDeleteDialog from '@/components/admin/DataDeleteDialog';
import { Button } from '@/components/ui/button';

const TeachersTable = () => {
  // Query keys
  const teachersQueryKey = userControllerGetTeachersQueryKey();

  const { data: teachers, isLoading } = useTeachers();
  const deleteTeacher = useDeleteUser(teachersQueryKey);
  const skeletons = createSkeletons(10);
  const location = useLocation();

  const renderLastCellBasedOnLocation = (teacherId: string) => {
    if (location.pathname.startsWith('/admin/attendance')) {
      return (
        <TableCell className='text-end'>
          <Link to={`/admin/attendance/teachers/${teacherId}`}>
            <Button variant='outline'>Spravovat docházku</Button>
          </Link>
        </TableCell>
      );
    }
    return (
      <TableCell className='flex flex-row gap-2 justify-end items-end'>
        <Link
          className='flex items-center rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-800/80 p-2'
          to={`/admin/teachers/${teacherId}`}
        >
          <Edit2 />
        </Link>
        <DataDeleteDialog
          onDelete={() => {
            deleteTeacher.mutate({
              path: {
                id: teacherId,
              },
            });
          }}
        />
      </TableCell>
    );
  };

  if (isLoading) {
    return (
      <div className='w-full flex flex-col gap-4'>
        <Skeleton className='rounded-md w-1/4 h-5 mx-auto' />
        {skeletons.map((skeleton) => (
          <Skeleton key={skeleton} className='w-full h-5 rounded-md' />
        ))}
      </div>
    );
  }

  return (
    <div className='w-full'>
      <Table>
        <TableCaption>Seznam průvodců</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Jméno</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className='text-right'>Akce</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teachers?.map((teacher) => (
            <TableRow key={teacher.id}>
              <TableCell>{teacher.fullName}</TableCell>
              <TableCell>{teacher.email}</TableCell>
              {renderLastCellBasedOnLocation(teacher.id!)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TeachersTable;
