import { generalInfoControllerDeleteInfoMutation } from '@/client/@tanstack/react-query.gen';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '../use-toast';
import useAllGeneralInfoQueryKeys from './useAllGeneralInfoQueryKeys';

const useDeleteGeneralInfo = () => {
  // Query keys
  const queryKeys = useAllGeneralInfoQueryKeys();

  const client = useQueryClient();

  return useMutation({
    ...generalInfoControllerDeleteInfoMutation(),
    onSuccess: () => {
      queryKeys.forEach((queryKey) => {
        client.invalidateQueries({
          queryKey: queryKey,
        });
      });
      toast({
        title: 'Informace úspěšně smazány.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Nastala chyba během mazání informací.',
        description: (error.response && error.response.data.error) ? error.response.data.error.message : `Neočekávaná chyba ${error.message}`,
        variant: 'destructive',
      });
    },
  });
};

export default useDeleteGeneralInfo;
