import { userControllerUpdateUserMutation } from '@/client/@tanstack/react-query.gen';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '../use-toast';

const useUpdateUser = (queryKeys: any[]) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...userControllerUpdateUserMutation(),
    onSuccess: () => {
      queryKeys.forEach((queryKey) => {
        queryClient.invalidateQueries({
          queryKey: queryKey,
        });
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

export default useUpdateUser;
