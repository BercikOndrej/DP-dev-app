import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import AuthService from '@/services/AuthService';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface Props {
  token: string;
}

const formSchema = z
  .object({
    password1: z
      .string()
      .min(8, { message: 'Heslo musí obsahovat alespoň 8 znaků.' })
      .max(15, { message: 'Heslo může mít maximálně 15 znaků.' })
      .regex(/^(?=.*[A-Z])(?=.*\d).{8,}$/, {
        message:
          'Heslo musí obsahovat alespoň jedno velké písmeno a alespoň jednu číslici.',
      }),
    password2: z.string().min(1, { message: 'Prosím potvrďte heslo' }),
  })
  .superRefine((val, ctx) => {
    if (val.password1 !== val.password2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Hesla musí být stejná',
        path: ['password2'],
      });
    }
  });

const PasswordResetForm = ({ token }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password1: '',
      password2: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const { error } = await AuthService.sendResetPasswordRequest(
      values.password1,
      token
    );
    if (error) {
      form.setError('root', {
        message: error,
      });
    } else {
      form.reset();
      navigate('/');
      toast({
        title: 'Resetování hesla',
        description:
          'Heslo bylo úspěšně změněno. Nyní se můžete přihlásit v členské sekci ke svému účtu.',
      });
    }
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='password1'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className='dark:border-slate-500'
                  placeholder='Nové heslo'
                  type='password'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password2'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className='dark:border-slate-500'
                  placeholder='Potvrďte heslo'
                  type='password'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.errors.root && (
          <FormMessage>{form.formState.errors.root.message}</FormMessage>
        )}
        <Button className='flex ml-auto' type='submit' disabled={isLoading}>
          Resetovat heslo
        </Button>
      </form>
    </Form>
  );
};

export default PasswordResetForm;
