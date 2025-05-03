import {
  photoControllerDeletePhotoMutation,
  photoControllerGetPhotosQueryKey,
} from '@/client/@tanstack/react-query.gen';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '../use-toast';
import usePhotosFilterStore from '@/stores/PhotosFilterStore';

const useDeletePhoto = () => {
  // Query key
  const filter = usePhotosFilterStore((store) => store.filter);
  const photosQueryKey = photoControllerGetPhotosQueryKey({
    query: {
      tag: filter,
    },
  });
  const queryClient = useQueryClient();

  return useMutation({
    ...photoControllerDeletePhotoMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: photosQueryKey,
      });
      toast({
        title: 'Fotografie byla úspěšně smazána.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Nastala chyba během mazání fotografie.',
        description: (error.response && error.response.data.error) ? error.response.data.error.message : `Neočekávaná chyba ${error.message}`,
        variant: 'destructive',
      });
    },
  });
};

export default useDeletePhoto;
