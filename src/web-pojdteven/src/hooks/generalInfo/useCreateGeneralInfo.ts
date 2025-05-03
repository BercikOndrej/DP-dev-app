import { generalInfoControllerCreateInfoMutation } from '@/client/@tanstack/react-query.gen';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '../use-toast';
import useAllGeneralInfoQueryKeys from './useAllGeneralInfoQueryKeys';

const useCreateGeneralInfo = () => {
  // Query keys
  const queryKeys = useAllGeneralInfoQueryKeys();

  const queryClient = useQueryClient();

  return useMutation({
    ...generalInfoControllerCreateInfoMutation(),
    onSuccess: () => {
      queryKeys.forEach((queryKey) => {
        queryClient.invalidateQueries({
          queryKey: queryKey,
          refetchType: 'all',
        });
      });

      toast({
        title: 'Informace byly úspěšně vytvořeny.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Nastala chyba během vytvoření informací.',
        description: (error.response && error.response.data.error) ? error.response.data.error.message : `Neočekávaná chyba ${error.message}`,
        variant: 'destructive',
      });
    },
  });
};

export default useCreateGeneralInfo;
