import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import AuthService from '@/services/AuthService';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email({ message: 'Neplatný email' }),
});

interface Props {
  setOpen: (open: boolean) => void;
  setIsPasswordForgotten: (isForgotten: boolean) => void;
}

const PasswordForgottenForm = ({ setOpen, setIsPasswordForgotten }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  function handleError(errorMsg: string) {
    form.setError('root', { type: '400', message: errorMsg });
  }

  function handleSuccess() {
    toast({
      title: 'Resetování hesla',
      description:
        'Žádost o resetování hesla byla odeslána. Na email Vám byly odeslány další informace.',
    });

    setOpen(false);
    setIsPasswordForgotten(false);
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const { error } = await AuthService.sendForgotPasswordRequest(values.email);
    if (error) {
      handleError(error);
    } else {
      handleSuccess();
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormMessage />
        {form.formState.errors.root && (
          <FormMessage>{form.formState.errors.root.message}</FormMessage>
        )}
        <Button className='flex ml-auto' type='submit' disabled={isLoading}>
          Odeslat
        </Button>
      </form>
    </Form>
  );
};

export default PasswordForgottenForm;
