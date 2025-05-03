import { userControllerDeleteUserMutation } from '@/client/@tanstack/react-query.gen';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '../use-toast';

const useDeleteUser = (queryKey: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...userControllerDeleteUserMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
      toast({
        title: 'Uživatel úspěšně smazán.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Nastala chyba během mazání uživatele.',
        description: (error.response && error.response.data.error) ? error.response.data.error.message : `Neočekávaná chyba ${error.message}`,
        variant: 'destructive',
      });
    },
  });
};

export default useDeleteUser;
