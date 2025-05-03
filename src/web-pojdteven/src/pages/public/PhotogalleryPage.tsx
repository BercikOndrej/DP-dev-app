import ParallaxPhoto from '@/components/ParallaxPhoto';
import Photogallery from '@/components/photogallery/Photogallery';
import PhotoFilter from '@/components/photogallery/PhotoFilter';
import PlaceInfo from '@/components/PlaceInfo';

const PhotogalleryPage = () => {
  return (
    <div>
      <ParallaxPhoto className='bg-parallax-gallery'>
        <h1 className='font-bold tracking-widest text-2xl' data-aos='fade-up'>
          Jak to u nás vypadá
        </h1>
      </ParallaxPhoto>
      <div className='m-[4vw]'>
        <PlaceInfo />
        <PhotoFilter />
        <Photogallery />
      </div>
    </div>
  );
};

export default PhotogalleryPage;
