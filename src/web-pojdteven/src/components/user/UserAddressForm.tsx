import { userControllerGetUserQueryKey } from '@/client/@tanstack/react-query.gen';
import useUser from '@/hooks/users/useUser';
import useAuthStore from '@/stores/AuthStore';
import createSkeletons from '@/utils/helpers/createSkeletons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
import { Skeleton } from '../ui/skeleton';
import useUpdateUserAddress from '@/hooks/users/useUpdateUserAddress';

const houseNumberRegex = /^[1-9]\d*(?:\/\d+)?$/;
const zipCodeRegex = /^[1-9]\d{2} \d{2}$/;

const formDescriptionTextStyle = 'text-slate-100 dark:text-slate-100';

const formSchema = z.object({
  street: z
    .string()
    .max(50, { message: 'Pole může mít maximálně 50 znaků.' })
    .optional(),
  houseNumber: z
    .string()
    .max(50, { message: 'Pole může mít maximálně 50 znaků.' })
    .regex(houseNumberRegex),
  city: z.string().max(50, { message: 'Pole může mít maximálně 50 znaků.' }),
  zipCode: z.string().regex(zipCodeRegex, {
    message: "Zip musí mít být ve tvaru 'NNN NN'.",
  }),
  note: z
    .string()
    .max(100, { message: 'Pole může mít maximálně 100 znaků.' })
    .optional(),
});

const UserAddressForm = () => {
  const currentUser = useAuthStore((store) => store.user);
  const { data: user, isLoading } = useUser(currentUser?.id);

  const queryKey = userControllerGetUserQueryKey({
    path: {
      id: user?.id!,
    },
  });

  const userAddressMutation = useUpdateUserAddress(queryKey);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      street: user?.address?.street ?? '',
      houseNumber: user?.address?.houseNumber ?? '',
      city: user?.address?.city ?? '',
      zipCode: user?.address?.zipCode ?? '',
      note: user?.address?.note ?? '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    userAddressMutation.mutate({
      path: {
        id: user?.id!,
      },
      body: values,
    });
  }

  const skeletons = createSkeletons(5);

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
              name='street'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ulice</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='houseNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Číslo popisné</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription className={formDescriptionTextStyle}>
                    Lze využít i znak lomítka (/).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='city'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Město</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='zipCode'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PSČ</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription className={formDescriptionTextStyle}>
                    Požadovaný formát obsahuje mezeru.
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
                    Zde můžete zadat doplňující informace o Vaší adrese.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
        <Button variant='secondary' disabled={isLoading} type='submit'>
          Uložit adresu
        </Button>
      </form>
    </Form>
  );
};

export default UserAddressForm;
