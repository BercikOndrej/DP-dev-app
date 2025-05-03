import { Skeleton } from '@/components/ui/skeleton';
import useActions from '@/hooks/actions/useActions';
import useDeleteAction from '@/hooks/actions/useDeleteAction';
import createSkeletons from '@/utils/helpers/createSkeletons';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import AdminDeleteDialogButton from './admin/AdminDeleteDialogButton';

const ActionList = () => {
  const { data, isLoading } = useActions();
  const serverDomain = import.meta.env.VITE_SERVER_DOMAIN;
  const skeletons = createSkeletons(6);
  const deleteAction = useDeleteAction();

  return (
    <ul className='grid grid-cols-1 gap-8 max-w-[1140px] lg:grid-cols-2 mx-auto w-4/5 lg:w-3/5'>
      {isLoading &&
        skeletons.map((skeleton) => (
          <Skeleton
            key={skeleton}
            className='h-[300px] md:h-[600px] lg:h-[400px] xl:h-[500px] 2xl:h-[850px] w-full rounded-xl'
          />
        ))}

      <PhotoProvider>
        {data?.map((action) => (
          <li
            key={action.id}
            className='flex items-center justify-center cursor-pointer relative group'
          >
            <AdminDeleteDialogButton
              conditionalPath='/admin/actions'
              onDelete={() =>
                deleteAction.mutate({
                  path: {
                    id: action.id!,
                  },
                })
              }
            />
            <PhotoView src={`${serverDomain ?? ''}/${action.imagePath}`}>
              <div className='rounded-xl shadow-xl overflow-hidden hover:scale-110 duration-500 ease-linear'>
                <img src={`${serverDomain ?? ''}/${action.imagePath}`} />
              </div>
            </PhotoView>
          </li>
        ))}
      </PhotoProvider>
    </ul>
  );
};

export default ActionList;
