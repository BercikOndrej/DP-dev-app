import { userControllerSignupMutation } from '@/client/@tanstack/react-query.gen';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '../use-toast';

const useCreateUser = (queryKey: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...userControllerSignupMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
      toast({
        title: 'Uživatel byl úspěšně vytvořen.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Nastala chyba během vytvoření uživatele.',
        description: (error.response && error.response.data.error) ? error.response.data.error.message : `Neočekávaná chyba ${error.message}`,
        variant: 'destructive',
      });
    },
  });
};

export default useCreateUser;
