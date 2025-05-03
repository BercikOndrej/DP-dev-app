import PageLayout from '@/components/admin/PageLayout';
import AddPhotoForm from '@/components/admin/photogallery/AddPhotoForm';
import PhotosDownloadButton from '@/components/admin/photogallery/PhotosDownloadButton';
import PhotoFilter from '@/components/photogallery/PhotoFilter';
import Photogallery from '@/components/photogallery/Photogallery';
import TitleText from '@/components/TitleText';

const AdminPhotogalleryPage = () => {
  return (
    <PageLayout>
      <div className='w-full'>
        <TitleText className='mb-4'>Přidání fotografie</TitleText>
        <AddPhotoForm />
      </div>
      <div className='w-full'>
        <TitleText className='mt-16 mb-4'>Fotogalerie</TitleText>
        <PhotosDownloadButton />
        <PhotoFilter />
        <Photogallery />
      </div>
    </PageLayout>
  );
};

export default AdminPhotogalleryPage;
