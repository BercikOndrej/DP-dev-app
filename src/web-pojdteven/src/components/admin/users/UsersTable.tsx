import { userControllerGetUsersQueryKey } from '@/client/@tanstack/react-query.gen';
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
import useDeleteUser from '@/hooks/users/useDeleteUser';
import useUsers from '@/hooks/users/useUsers';
import createSkeletons from '@/utils/helpers/createSkeletons';
import { Baby, Edit2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import DataDeleteDialog from '../DataDeleteDialog';

const UsersTable = () => {
  const { data: users, isLoading } = useUsers();
  const skeletons = createSkeletons(10);
  const usersQueryKey = userControllerGetUsersQueryKey();
  const deleteUser = useDeleteUser(usersQueryKey);

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
        <TableCaption>Seznam uživatelů</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Jméno</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className='text-right'>Akce</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.fullName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className='flex flex-row gap-2 justify-end items-end'>
                <Link
                  className='flex items-center rounded-lg bg-green-200 dark:bg-green-600 hover:bg-green-200/70 dark:hover:bg-green-600/80 p-2 dark:text-black'
                  to={`/admin/users/${user.id}/childrenManagement`}
                >
                  <Baby />
                </Link>
                <Link
                  className='flex items-center rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-200/70 dark:hover:bg-slate-800/80 p-2'
                  to={`/admin/users/${user.id}`}
                >
                  <Edit2 />
                </Link>
                <DataDeleteDialog
                  onDelete={() => {
                    deleteUser.mutate({
                      path: {
                        id: user.id!,
                      },
                    });
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTable;
