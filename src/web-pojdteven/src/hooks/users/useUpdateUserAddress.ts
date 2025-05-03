import { userControllerUpdateUserAddressMutation } from '@/client/@tanstack/react-query.gen';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '../use-toast';

const useUpdateUserAddress = (queryKey: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...userControllerUpdateUserAddressMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
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

export default useUpdateUserAddress;
