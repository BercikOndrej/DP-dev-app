import { ContactInfo } from '@/client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useEditContactInfo from '@/hooks/contactInfo/useEditContactInfo';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface Props {
  info: ContactInfo | undefined;
}

const CZECH_BIG_LETTERS = 'ÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ';
const CZECH_SMALL_LETTERS = 'áčďéěíňóřšťúůýž';
const nameRegex = new RegExp(
  `^[A-Z${CZECH_BIG_LETTERS}][a-z${CZECH_SMALL_LETTERS}]+(?: [A-Z${CZECH_BIG_LETTERS}][a-z${CZECH_SMALL_LETTERS}]+)? [A-Z${CZECH_BIG_LETTERS}][a-z${CZECH_SMALL_LETTERS}]+$`,
  'g'
);
const phoneRegex = /^\+?[0-9]{3}(?: [0-9]{3}){2,3}$/;

const formSchema = z.object({
  fullName: z
    .string()
    .max(60, { message: 'Pole může mít maximálně 60 znaků.' })
    .regex(nameRegex, {
      message: 'Neplatné jméno.',
    }),
  email: z
    .string()
    .max(50, { message: 'Pole může mít maximálně 50 znaků.' })
    .email({ message: 'Neplatná emailová adresa.' }),
  phoneNumber: z
    .string()
    .regex(phoneRegex, { message: 'Neplatné telefoní číslo.' }),
});

const EditContactInfoForm = ({ info }: Props) => {
  const editInfo = useEditContactInfo(info?.id!);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      fullName: info?.fullName ?? '',
      email: info?.email ?? '',
      phoneNumber: info?.phoneNumber ?? '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    editInfo.mutate({
      path: {
        id: info?.id!,
      },
      body: {
        fullName: values.fullName,
        email: values.email,
        phoneNumber: values.phoneNumber,
      },
    });
  }

  return (
    <div className='w-full'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='fullName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jméno a příjmení</FormLabel>
                <Input placeholder='Petr Novák' {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
                <Input
                  type='email'
                  placeholder='teacher@example.com'
                  {...field}
                />
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
                <Input type='text' placeholder='XXX XXX XXX' {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={editInfo.isPending} type='submit'>
            Uložit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditContactInfoForm;
