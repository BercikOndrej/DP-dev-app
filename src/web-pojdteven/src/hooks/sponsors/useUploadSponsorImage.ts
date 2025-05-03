import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  sponsorControllerGetSponsorsQueryKey,
  sponsorControllerUploadSponsorImageMutation,
} from '@/client/@tanstack/react-query.gen';
import {toast} from '@/hooks/use-toast.ts';

const useUploadSponsorImage = () => {
  // Query keys
  const sponsorsQueryKey = sponsorControllerGetSponsorsQueryKey();
  const client = useQueryClient();

  return useMutation({
    ...sponsorControllerUploadSponsorImageMutation(),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: sponsorsQueryKey,
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

export default useUploadSponsorImage;
