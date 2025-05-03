import { photoControllerGetPhotosOptions } from '@/client/@tanstack/react-query.gen';
import { PhotoTag } from '@/enums/PhotoTag';
import { useQuery } from '@tanstack/react-query';

const usePhotos = (tag?: PhotoTag) =>
  useQuery({
    ...photoControllerGetPhotosOptions({
      query: {
        tag: tag,
      },
    }),
  });

export default usePhotos;
