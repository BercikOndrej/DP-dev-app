import {
  photoControllerCreatePhotoMutation,
  photoControllerGetPhotosQueryKey,
} from '@/client/@tanstack/react-query.gen';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '../use-toast';
import usePhotosFilterStore from '@/stores/PhotosFilterStore';

const useCreatePhoto = () => {
  // Query key
  const filter = usePhotosFilterStore((store) => store.filter);
  const photosQueryKey = photoControllerGetPhotosQueryKey({
    query: {
      tag: filter,
    },
  });
  const queryClient = useQueryClient();

  return useMutation({
    ...photoControllerCreatePhotoMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: photosQueryKey,
      });
      toast({
        title: 'Fotografie byla úspěšně vytvořena.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Nastala chyba během vytvoření fotografie.',
        description: (error.response && error.response.data.error) ? error.response.data.error.message : `Neočekávaná chyba ${error.message}`,
        variant: 'destructive',
      });
    },
  });
};
export default useCreatePhoto;
