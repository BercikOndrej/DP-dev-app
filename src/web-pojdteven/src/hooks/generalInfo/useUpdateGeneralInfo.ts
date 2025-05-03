import {
  generalInfoControllerGetInfoByIdQueryKey,
  generalInfoControllerUpdateInfoMutation,
} from '@/client/@tanstack/react-query.gen';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '../use-toast';
import useAllGeneralInfoQueryKeys from './useAllGeneralInfoQueryKeys';

const useUpdateGeneralInfo = (infoId: number) => {
  // Query keys
  const actualGeneraliInfoItemQueryKey =
    generalInfoControllerGetInfoByIdQueryKey({
      path: {
        id: infoId!,
      },
    });

  const queryKeys = [
    ...useAllGeneralInfoQueryKeys(),
    actualGeneraliInfoItemQueryKey,
  ];

  const client = useQueryClient();

  return useMutation({
    ...generalInfoControllerUpdateInfoMutation(),
    onSuccess: () => {
      queryKeys.forEach((queryKey) => {
        client.invalidateQueries({
          queryKey: queryKey,
          refetchType: 'all',
        });
      });
      toast({
        title: 'Informace úspěšně uloženy.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Nastala chyba během uložení informací.',
        description: (error.response && error.response.data.error) ? error.response.data.error.message : `Neočekávaná chyba ${error.message}`,
        variant: 'destructive',
      });
    },
  });
};

export default useUpdateGeneralInfo;
