import { Skeleton } from '@/components/ui/skeleton';
import useDeletePhoto from '@/hooks/photos/useDeletePhoto';
import usePhotos from '@/hooks/photos/usePhotos';
import usePhotosFilterStore from '@/stores/PhotosFilterStore';
import createSkeletons from '@/utils/helpers/createSkeletons';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { useLocation } from 'react-router-dom';
import AdminDeleteDialogButton from '../admin/AdminDeleteDialogButton';
import PhotoContainer from '@/components/photogallery/PhotoContainer.tsx';

const Photogallery = () => {
  const filter = usePhotosFilterStore((store) => store.filter);
  const { data: photos, isLoading } = usePhotos(filter);
  const serverDomain = import.meta.env.VITE_SERVER_DOMAIN;
  const location = useLocation();
  const deletePhoto = useDeletePhoto();

  const skeletons = createSkeletons(12);

  return (
    <div
      className={`py-8 grid grid-cols-1 ${
        location.pathname === '/admin/photogallery' ? '' : 'md:grid-cols-2'
      } lg:grid-cols-3 gap-4 transition transform duration-500`}
      data-aos='fade-up'
    >
      {/* Skeletons */}
      {isLoading &&
        skeletons.map((skeleton) => (
          <Skeleton key={skeleton} className='w-full h-96 rounded-3xl' />
        ))}
      <PhotoProvider>
        {photos?.map((photo) => (
          <div key={photo.id} className='relative group'>
            <AdminDeleteDialogButton
              conditionalPath='/admin/photogallery'
              onDelete={() => {
                deletePhoto.mutate({
                  path: {
                    id: photo.id!,
                  },
                });
              }}
            />
            <PhotoView src={`${serverDomain}/${photo.imagePath}`}>
              <div
                key={photo.id}
                className='group relative rounded-3xl overflow-hidden w-full max-h-96 object-cover object-center h-full hover:cursor-pointer'
              >
                <PhotoContainer url={`${serverDomain}/${photo.imagePath}`} />
              </div>
            </PhotoView>
          </div>
        ))}
      </PhotoProvider>
    </div>
  );
};

export default Photogallery;
