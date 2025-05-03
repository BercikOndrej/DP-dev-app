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
import { Role } from '@/enums';
import useDayActivities from '@/hooks/dayActivities/useDayActivities';
import useDeleteDayActivity from '@/hooks/dayActivities/useDeleteDayActivity';
import useAuthStore from '@/stores/AuthStore';
import createSkeletons from '@/utils/helpers/createSkeletons';
import getTimeString from '@/utils/helpers/getTimeString';
import { useLocation } from 'react-router-dom';
import DataDeleteDialog from './admin/DataDeleteDialog';
const SchoolDayTimeline = () => {
  const { data: dayActivities, isLoading } = useDayActivities();
  const skeletons = createSkeletons(10);
  const location = useLocation();
  const user = useAuthStore((store) => store.user);
  const isRenderOnAdminPage =
    location.pathname === '/admin/dayActivities' && user?.role === Role.ADMIN;

  const deleteActivity = useDeleteDayActivity();

  // Skeletons
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
    <Table>
      <TableCaption>Časový rozpis dne ve školce</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>Začátek</TableHead>
          <TableHead className='w-[100px]'>Konec</TableHead>
          <TableHead>Aktivita</TableHead>
          {isRenderOnAdminPage && (
            <TableHead className='text-right'>Akce</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {dayActivities?.map((activity) => (
          <TableRow key={activity.id}>
            <TableCell className='font-bold'>
              {getTimeString(activity.startTime)}
            </TableCell>
            <TableCell className='font-bold'>
              {getTimeString(activity.endTime)}
            </TableCell>
            <TableCell>{activity.description}</TableCell>
            {isRenderOnAdminPage && (
              <TableCell className='flex flex-row gap-2 justify-end items-end'>
                <div className='bg-red-500 dark:bg-red-500 hover:bg-red-500/80 dark:hover:bg-red-500/80 flex w-max items-center rounded-lg'>
                  <DataDeleteDialog
                    onDelete={() => {
                      deleteActivity.mutate({
                        path: {
                          id: activity.id!,
                        },
                      });
                    }}
                  />
                </div>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SchoolDayTimeline;
