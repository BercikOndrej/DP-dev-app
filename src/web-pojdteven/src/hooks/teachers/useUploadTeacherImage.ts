import {
  userControllerGetTeachersQueryKey,
  userControllerUploadUserImageMutation,
} from '@/client/@tanstack/react-query.gen';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '../use-toast';

const useUploadTeacherImage = () => {
  // Query keys
  const teachersQueryKey = userControllerGetTeachersQueryKey();
  const client = useQueryClient();

  return useMutation({
    ...userControllerUploadUserImageMutation(),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: teachersQueryKey,
      });
      toast({
        title: 'Data byla úspěšně uložena',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Nastala chyba během ukládání dat.',
        description: (error.response && error.response.data.error) ? error.response.data.error.message : `Neočekávaná chyba ${error.message}`,
        variant: 'destructive',
      });
    },
  });
};

export default useUploadTeacherImage;
