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
import useCreateParenthood from '@/hooks/parenthood/useCreateParenthood';
import useDeleteParenthood from '@/hooks/parenthood/useDeleteParenthood';
import useUserParenthoodItems from '@/hooks/parenthood/useUserParenthoodItems';
import useUser from '@/hooks/users/useUser';
import createSkeletons from '@/utils/helpers/createSkeletons';
import { CirclePlus, Trash2 } from 'lucide-react';
import { useParams } from 'react-router-dom';

const ParenhoodList = () => {
  const params = useParams();
  const { data: user, isLoading: isUserLoading } = useUser(params.id);
  const { data: allChildren, isLoading: isChildrenLoading } = useChildren();
  const { data: userParenthoodOItems, isLoading: isParenthoodItemsLoading } =
    useUserParenthoodItems(user?.id ?? '');

  const createParenthood = useCreateParenthood(user?.id ?? '');
  const deleteParenthood = useDeleteParenthood(user?.id ?? '');

  const skeletons = createSkeletons(10);

  const renderAction = (isUserChild: boolean, childId: string) => {
    if (isUserChild) {
      return (
        <Trash2
          onClick={() =>
            deleteParenthood.mutate({
              path: {
                id:
                  userParenthoodOItems?.find((item) => item.childId === childId)
                    ?.id ?? '',
              },
            })
          }
          className='text-red-500 dark:text-red-600 cursor-pointer'
        />
      );
    } else {
      return (
        <CirclePlus
          onClick={() =>
            createParenthood.mutate({
              body: {
                userId: user?.id!,
                childId: childId!,
              },
            })
          }
          className='text-green-500 cursor-pointer'
        />
      );
    }
  };

  if (isChildrenLoading || isParenthoodItemsLoading || isUserLoading) {
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
        <TableCaption>
          Zde můžete přidat/odebrat dítě z uživatelova účtu
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Jméno</TableHead>
            <TableHead className='text-right'>Akce</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allChildren?.map((child) => {
            const isUserChild = userParenthoodOItems?.some(
              (item) => item.childId === child.id
            );
            return (
              <TableRow
                key={child.id}
                className={isUserChild ? 'bg-green-50 dark:bg-green-900' : ''}
              >
                <TableCell>{child.fullName}</TableCell>
                <TableCell className='flex flex-row gap-2 justify-end items-end'>
                  {renderAction(isUserChild ?? false, child.id!)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ParenhoodList;
