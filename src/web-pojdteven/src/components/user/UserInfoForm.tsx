import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import useAuthStore from '@/stores/AuthStore';
import useUser from '@/hooks/users/useUser';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import createSkeletons from '@/utils/helpers/createSkeletons';
import { Skeleton } from '../ui/skeleton';
import useUpdateUser from '@/hooks/users/useUpdateUser';
import { userControllerGetUserQueryKey } from '../../client/@tanstack/react-query.gen';

const CZECH_BIG_LETTERS = 'ÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ';
const CZECH_SMALL_LETTERS = 'áčďéěíňóřšťúůýž';
const nameRegex = new RegExp(
  `^[A-Z${CZECH_BIG_LETTERS}][a-z${CZECH_SMALL_LETTERS}]+(?: [A-Z${CZECH_BIG_LETTERS}][a-z${CZECH_SMALL_LETTERS}]+)? [A-Z${CZECH_BIG_LETTERS}][a-z${CZECH_SMALL_LETTERS}]+$`,
  'g'
);
const phoneRegex = /^\+?[0-9]{3}(?: [0-9]{3}){2,3}$/;

const formDescriptionTextStyle = 'text-slate-100 dark:text-slate-100';

const formSchema = z.object({
  email: z.string().email({ message: 'Neplatná emailová adresa.' }),
  fullName: z
    .string()
    .max(60, { message: 'Pole může mít maximálně 60 znaků.' })
    .regex(nameRegex, {
      message: 'Neplatné jméno.',
    }),
  phoneNumber: z
    .string()
    .regex(phoneRegex, { message: 'Neplatné telefoní číslo' }),
  note: z
    .string()
    .max(100, { message: 'Pole může mít maximálně 100 znaků.' })
    .optional(),
});

const UserInfoForm = () => {
  const currentUser = useAuthStore((store) => store.user);
  const { data: user, isLoading } = useUser(currentUser?.id);
  const queryKey = userControllerGetUserQueryKey({
    path: {
      id: user?.id!,
    },
  });
  const userMutation = useUpdateUser(queryKey);

  // Skeletons
  const skeletons = createSkeletons(4);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      email: user?.email ?? '',
      fullName: user?.fullName ?? '',
      phoneNumber: user?.phoneNumber ?? '',
      note: user?.note ?? '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    userMutation.mutate({
      path: {
        id: user?.id!,
      },
      body: {
        id: user?.id!,
        ...values,
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-8'>
        {isLoading ? (
          skeletons.map((s) => (
            <div
              key={s}
              className='flex flex-col justify-start items-start gap-2 py-2'
            >
              <Skeleton className='w-1/4 h-6' />
              <Skeleton className='w-full h-8' />
            </div>
          ))
        ) : (
          <div className='space-y-8'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emailová adresa</FormLabel>
                  <FormControl>
                    <Input disabled={true} {...field} />
                  </FormControl>
                  <FormDescription className={formDescriptionTextStyle}>
                    Emailovou adresu nelze změnit.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='fullName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jméno a příjmení</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription className={formDescriptionTextStyle}>
                    Toto jméno bude viditelné všem průvodcům.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='phoneNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefonní číslo</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription className={formDescriptionTextStyle}>
                    Požadovaný formát obsahuje mezery.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='note'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Poznámka</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription className={formDescriptionTextStyle}>
                    Zde můžete zadat doplňující informace.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        <Button variant='secondary' disabled={isLoading} type='submit'>
          Uložit osobní informace
        </Button>
      </form>
    </Form>
  );
};

export default UserInfoForm;
