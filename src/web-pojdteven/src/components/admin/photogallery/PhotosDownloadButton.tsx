import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import usePhotos from '@/hooks/photos/usePhotos';
import usePhotosFilterStore from '@/stores/PhotosFilterStore';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { useState } from 'react';

const PhotosDownloadButton = () => {
  const filter = usePhotosFilterStore((store) => store.filter);
  const { data: photos, isLoading } = usePhotos(filter);
  const serverDomain = import.meta.env.VITE_SERVER_DOMAIN;
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadZip = async () => {
    if (!photos || photos.length === 0) return;

    setIsDownloading(true);
    const zip = new JSZip();

    try {
      const downloadPromises = photos.map(async (photoObj, index) => {
        try {
          const response = await fetch(`${serverDomain}/${photoObj.imagePath}`);
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          const blob = await response.blob();
          zip.file(`image-${index + 1}.jpg`, blob);
        } catch (error) {
          console.error(`Chyba při stahování ${photoObj.id}:`, error);
        }
      });

      await Promise.all(downloadPromises);
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, 'images.zip');
    } catch (error) {
      console.error('Chyba při generování ZIP souboru:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  if (isLoading) {
    return (
      <div className='w-full flex flex-col items-center justify-center gap-4'>
        <Skeleton className='w-1/3 h-4' />
        <Skeleton className='w-1/5 h-8' />
      </div>
    );
  }

  return (
    <div className='w-full flex flex-col items-center justify-center gap-4'>
      <span>
        {photos?.length
          ? `Zde můžete stáhnout fotky dle vybraného filtru. (${photos.length})`
          : 'Žádné fotky k dispozici pro stažení.'}
      </span>
      <Button onClick={handleDownloadZip} disabled={!photos?.length || isDownloading}>
        {isDownloading ? 'Stahuji...' : 'Stáhnout fotky (.zip)'}
      </Button>
    </div>
  );
};

export default PhotosDownloadButton;