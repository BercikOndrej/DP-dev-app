import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  contactInfoControllerGetOneContactInfoQueryKey,
  contactInfoControllerUpdateContactInfoMutation,
} from '../../client/@tanstack/react-query.gen';
import { toast } from '../use-toast';

const useEditContactInfo = (infoId: number) => {
  const client = useQueryClient();
  const infoQueryKey = contactInfoControllerGetOneContactInfoQueryKey({
    path: {
      id: infoId,
    },
  });

  return useMutation({
    ...contactInfoControllerUpdateContactInfoMutation(),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: infoQueryKey,
        refetchType: 'all',
      });
      toast({
        title: 'Informace byly úspěšně uloženy.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Nastala chyba během uložení informací.',
        description: (error.response && error.response.data.error) ? error.response.data.error.message : `Neočekávaný error ${error.message}`,
        variant: 'destructive',
      });
    },
  });
};

export default useEditContactInfo;
