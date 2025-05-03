import {
  sponsorControllerDeleteSponsorMutation,
  sponsorControllerGetSponsorsQueryKey,
} from '@/client/@tanstack/react-query.gen';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '../use-toast';

const useDeleteSponsor = () => {
  // Query keys
  const sponsorsQueryKey = sponsorControllerGetSponsorsQueryKey();

  const queryClient = useQueryClient();

  return useMutation({
    ...sponsorControllerDeleteSponsorMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: sponsorsQueryKey,
      });
      toast({
        title: 'Sponzor byl úspěšně smazán.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Nastala chyba během mazání sponzora.',
        description: (error.response && error.response.data.error) ? error.response.data.error.message : `Neočekávaná chyba ${error.message}`,
        variant: 'destructive',
      });
    },
  });
};

export default useDeleteSponsor;
