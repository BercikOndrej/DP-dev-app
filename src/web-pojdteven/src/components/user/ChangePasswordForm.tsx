import { userControllerChangeUserPassword } from '@/client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import useAuthStore from '@/stores/AuthStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z
  .object({
    actualPassword: z.string(),
    password1: z
      .string()
      .min(8, { message: 'Heslo musí obsahovat alespoň 8 znaků.' })
      .max(15, { message: 'Heslo může mít maximálně 15 znaků.' })
      .regex(/^(?=.*[A-Z])(?=.*\d).{8,}$/, {
        message:
          'Heslo musí obsahovat alespoň jedno velké písmeno a alespoň jednu číslici.',
      }),
    password2: z.string().min(1, { message: 'Prosím potvrďte heslo.' }),
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

const ChangePasswordForm = () => {
  const user = useAuthStore((store) => store.user);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      actualPassword: '',
      password1: '',
      password2: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { error } = await userControllerChangeUserPassword({
        path: {
          id: user?.id!,
        },
        body: {
          actualPassword: values.actualPassword,
          newPassword: values.password1,
        },
      });
      if (error) {
        form.setError('root', {
          message: (error as any).error.message,
        });
      } else {
        form.reset();
        toast({
          title: 'Heslo bylo úspěšně změněno.',
          description: 'Změna se projeví při příštím přihlášení.',
        });
      }
    } catch (error) {
      toast({
        title: 'Chyba pří změně hesla.',
        description: 'Nelze navázat spojení se serverem.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-8'>
        <FormField
          control={form.control}
          name='actualPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Aktuální heslo</FormLabel>
              <FormControl>
                <Input
                  className='dark:border-slate-500'
                  type='password'
                  {...field}
                />
              </FormControl>
              <FormMessage />
              {form.formState.errors.root && (
                <FormMessage>{form.formState.errors.root.message}</FormMessage>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password1'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nové heslo</FormLabel>
              <FormControl>
                <Input
                  className='dark:border-slate-500'
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
              <FormLabel>Nové heslo znovu</FormLabel>
              <FormControl>
                <Input
                  className='dark:border-slate-500'
                  type='password'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant='secondary' type='submit'>
          Změnit heslo
        </Button>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
