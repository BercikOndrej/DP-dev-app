import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useChildren from '@/hooks/children/useChildren';
import useDeleteChild from '@/hooks/children/useDeleteChild';
import createSkeletons from '@/utils/helpers/createSkeletons';
import dayjs from 'dayjs';
import { Edit2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import DataDeleteDialog from '../DataDeleteDialog';

const ChildrenTable = () => {
  const { data: children, isLoading } = useChildren();
  const deleteChild = useDeleteChild();
  const skeletons = createSkeletons(10);

  const renderLastCellBasedOnLocation = (childId: string) => {
    if (location.pathname.startsWith('/admin/attendance')) {
      return (
        <TableCell className='text-end'>
          <Link to={`/admin/attendance/children/${childId}`}>
            <Button variant='outline'>Spravovat docházku</Button>
          </Link>
        </TableCell>
      );
    } else {
      return (
        <TableCell className='flex flex-row gap-2 justify-end items-end'>
          <Link
            className='flex items-center rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-800/80 p-2'
            to={`/admin/children/${childId}`}
          >
            <Edit2 />
          </Link>
          <DataDeleteDialog
            onDelete={() => {
              deleteChild.mutate({
                path: {
                  id: childId!,
                },
              });
            }}
          />
        </TableCell>
      );
    }
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
        <TableCaption>Seznam dětí</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Jméno</TableHead>
            <TableHead>Datum narození</TableHead>
            <TableHead className='text-right'>Akce</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {children?.map((child) => (
            <TableRow key={child.id}>
              <TableCell>{child.fullName}</TableCell>
              <TableCell>
                {dayjs(child.dateOfBirth).format('D. M. YYYY')}
              </TableCell>
              {renderLastCellBasedOnLocation(child.id!)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ChildrenTable;
