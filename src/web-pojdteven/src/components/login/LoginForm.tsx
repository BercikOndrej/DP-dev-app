import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useAuthStore from '@/stores/AuthStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import z from 'zod';

const formSchema = z.object({
  email: z.string().email({ message: 'Neplatný email' }),
  password: z.string(),
});

const LoginForm = () => {
  const [isView, setIsView] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const eyeStyle = 'absolute right-4 top-3 z-10 cursor-pointer text-slate-500';
  const login = useAuthStore((store) => store.login);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const toggleIsView = () => {
    setIsView(!isView);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const { error } = await login(values.email, values.password);
    if (error) {
      form.setError('root', {
        type: '400',
        message: error.message,
      });
    } else {
      navigate('/clenska-sekce');
    }
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='relative'>
                  <Input
                    type={isView ? 'text' : 'password'}
                    placeholder='Heslo'
                    {...field}
                  />
                  {isView ? (
                    <FaEye className={eyeStyle} onClick={toggleIsView} />
                  ) : (
                    <FaEyeSlash className={eyeStyle} onClick={toggleIsView} />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.errors.root && (
          <FormMessage>{form.formState.errors.root.message}</FormMessage>
        )}
        <Button className='flex ml-auto' type='submit' disabled={isLoading}>
          Přihlásit se
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
