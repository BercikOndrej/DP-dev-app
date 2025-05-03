import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  sponsorControllerCreateSponsorMutation,
  sponsorControllerGetSponsorsQueryKey,
} from '@/client/@tanstack/react-query.gen.ts';
import { toast } from '../use-toast';

const useCreateSponsor = () => {
  // Query keys
  const sponsorsQueryKey = sponsorControllerGetSponsorsQueryKey();
  const queryClient = useQueryClient();

  return useMutation({
    ...sponsorControllerCreateSponsorMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: sponsorsQueryKey,
      });
      toast({
        title: 'Sponsor byl úspěšně vytvořen.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Nastala chyba během vytvoření sponzora.',
        description: (error.response && error.response.data.error) ? error.response.data.error.message : `Neočekávaná chyba ${error.message}`,
        variant: 'destructive',
      });
    },
  });
};

export default useCreateSponsor;
