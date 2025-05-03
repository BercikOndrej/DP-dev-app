import {
  userControllerGetTeachersQueryKey,
  userControllerGetUserQueryKey,
} from '@/client/@tanstack/react-query.gen';
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { Role } from '@/enums';
import useCreateUser from '@/hooks/users/useCreateUser';
import useUpdateUser from '@/hooks/users/useUpdateUser';
import useUpdateUserAddress from '@/hooks/users/useUpdateUserAddress';
import useUser from '@/hooks/users/useUser';
import { cn } from '@/lib/utils';
import createSkeletons from '@/utils/helpers/createSkeletons';
import generatePassword from '@/utils/helpers/generatePassword';
import isAdult from '@/utils/helpers/isAdult';
import { zodResolver } from '@hookform/resolvers/zod';
import { cs } from 'date-fns/locale';
import dayjs from 'dayjs';
import locale from 'dayjs/locale/cs';
import { CalendarIcon } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { z } from 'zod';

const CZECH_BIG_LETTERS = 'ÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ';
const CZECH_SMALL_LETTERS = 'áčďéěíňóřšťúůýž';
const nameRegex = new RegExp(
  `^[A-Z${CZECH_BIG_LETTERS}][a-z${CZECH_SMALL_LETTERS}]+(?: [A-Z${CZECH_BIG_LETTERS}][a-z${CZECH_SMALL_LETTERS}]+)? [A-Z${CZECH_BIG_LETTERS}][a-z${CZECH_SMALL_LETTERS}]+$`,
  'g'
);
const houseNumberRegex = /^[1-9]\d*(?:\/\d+)?$/;
const zipCodeRegex = /^[1-9]\d{2} \d{2}$/;

const phoneRegex = /^\+?[0-9]{3}(?: [0-9]{3}){2,3}$/;

const formSchema = z.object({
  email: z.string().email({ message: 'Neplatná emailová adresa.' }),
  fullName: z
    .string()
    .max(60, { message: 'Pole může mít maximálně 60 znaků.' })
    .regex(nameRegex, {
      message: 'Neplatné jméno.',
    }),
  dateOfBirth: z
    .date({ required_error: 'Datum narození je nutno vyplnit.' })
    .refine(isAdult, {
      message: 'Uživatel musí být starší 18 let.',
    }),
  phoneNumber: z
    .string()
    .regex(phoneRegex, { message: 'Neplatné telefoní číslo.' }),
  description: z
    .string({ required_error: 'Toto pole je povinné.' })
    .min(1, {message: 'Toto pole je povinné.'})
    .max(1000, { message: 'Toto pole může mít maximálně 1000 znaků.' }),
  academicTitle: z
    .string()
    .max(20, { message: 'Toto pole je příliš dlouhé.' })
    .optional(),
  note: z
    .string()
    .max(100, { message: 'Pole může mít maximálně 100 znaků.' })
    .optional(),
  address: z.object({
    street: z
      .string()
      .max(50, { message: 'Pole může mít maximálně 50 znaků.' })
      .optional(),
    houseNumber: z
      .string()
      .max(50, { message: 'Pole může mít maximálně 50 znaků.' })
      .regex(houseNumberRegex, { message: 'Neplatné číslo popisné.' }),
    city: z.string().max(50, { message: 'Pole může mít maximálně 50 znaků.' }),
    zipCode: z.string().regex(zipCodeRegex, {
      message: "Zip musí mít být ve tvaru 'NNN NN'.",
    }),
    note: z
      .string()
      .max(100, { message: 'Pole může mít maximálně 100 znaků.' })
      .optional(),
  }),
});

const TeacherForm = () => {
  const params = useParams();
  const teacherId = params.id;

  // Get query key
  const teachersQueryKey = userControllerGetTeachersQueryKey();
  const actualTeacherQueryKey = userControllerGetUserQueryKey({
    path: {
      id: teacherId ?? '',
    },
  });

  const today = dayjs().startOf('day');
  const skeletons = createSkeletons(10);

  const createTeacher = useCreateUser(teachersQueryKey);
  const updateAddress = useUpdateUserAddress(teachersQueryKey);
  const updateTeacher = useUpdateUser([
    actualTeacherQueryKey,
    teachersQueryKey,
  ]);

  const { data: teacher, isLoading } = useUser(teacherId);
  const teacherAvaiable = teacher !== undefined;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      email: teacher?.email ?? '',
      fullName: teacher?.fullName ?? '',
      dateOfBirth:
        dayjs(teacher?.dateOfBirth)
          .locale({
            ...locale,
          })
          .startOf('day')
          .toDate() ?? today.toDate(),
      description: teacher?.description ?? '',
      academicTitle: teacher?.academicTitle ?? '',
      phoneNumber: teacher?.phoneNumber ?? '',
      note: teacher?.note ?? '',
      address: {
        street: teacher?.address?.street ?? '',
        houseNumber: teacher?.address?.houseNumber ?? '',
        city: teacher?.address?.city ?? '',
        zipCode: teacher?.address?.zipCode ?? '',
        note: teacher?.address?.note ?? '',
      },
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (teacher) {
      const { address, ...teacherData } = values;
      updateTeacher.mutate({
        path: {
          id: teacher.id!,
        },
        body: {
          ...teacherData,
          dateOfBirth: dayjs(teacherData.dateOfBirth)
            .startOf('day')
            .format('YYYY-MM-DD'),
        },
      });

      updateAddress.mutate({
        path: {
          id: teacher.id!,
        },
        body: address,
      });
    } else {
      createTeacher.mutate({
        body: {
          ...values,
          dateOfBirth: dayjs(values.dateOfBirth)
            .startOf('day')
            .format('YYYY-MM-DD'),
          role: Role.TEACHER,
          password: generatePassword(),
        },
      });
      form.reset();
    }
  }

  if (isLoading) {
    return (
      <div className='w-full space-y-8'>
        {skeletons.map((s) => (
          <Skeleton
            key={s}
            className={`h-8 ${s === 3 || s === 6 ? 'w-1/4' : 'w-full'}`}
          />
        ))}
        <Skeleton className='w-1/4 h-8' />
      </div>
    );
  }

  return (
    <div className='w-full'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emailová adresa</FormLabel>
                <FormControl>
                  <Input
                    disabled={teacherAvaiable}
                    placeholder='user@example.com'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='w-full flex flex-row gap-4 items-end'>
            <FormField
              control={form.control}
              name='academicTitle'
              render={({ field }) => (
                <FormItem className='w-1/5'>
                  <FormLabel>Titul</FormLabel>
                  <FormControl>
                    <Input placeholder='Titul' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='fullName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jméno a příjmení</FormLabel>
                <FormControl>
                  <Input placeholder='Petr Novák' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='dateOfBirth'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Datum narození</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] pl-3 text-left rounded-md font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          dayjs(field.value)
                            .locale({
                              ...locale,
                            })
                            .startOf('day')
                            .format('D. MMMM YYYY')
                        ) : (
                          <span>Vyberte datum</span>
                        )}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <DayPicker
                      mode='single'
                      selected={field.value}
                      onSelect={field.onChange}
                      locale={cs}
                      fromYear={1920}
                      toYear={today.year()}
                      defaultMonth={
                        field.value
                          ? field.value
                          : today.subtract(18, 'year').toDate()
                      }
                      captionLayout='dropdown'
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Vaše datum narození je vyu žito pro vypočet Vašeho věku.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Popis</FormLabel>
                <FormControl>
                  <Textarea
                    className='h-32'
                    placeholder='Krátký popis...'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Tento popisek bude viditelný na veřejných stránkách pro
                  všechny návštěvníky webu.
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
                  <Input placeholder='XXX XXX XXX' {...field} />
                </FormControl>
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
                  <Input placeholder='' {...field} />
                </FormControl>
                <FormDescription>
                  Zde doplňte dodatečné informace.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='font-title text-xl pt-8'>Adresa</div>
          <FormField
            control={form.control}
            name='address.street'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ulice</FormLabel>
                <FormControl>
                  <Input placeholder='Lošov' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='address.houseNumber'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Číslo popisné</FormLabel>
                <FormControl>
                  <Input placeholder='99' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='address.city'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Město</FormLabel>
                <FormControl>
                  <Input placeholder='Olomouc' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='address.zipCode'
            render={({ field }) => (
              <FormItem>
                <FormLabel>PSČ</FormLabel>
                <FormControl>
                  <Input placeholder='783 65' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='address.note'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Poznámka k adrese</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Zde doplňte dodatečné informace k Váší adrese.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={updateTeacher.isPending || createTeacher.isPending}
            type='submit'
          >
            Uložit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default TeacherForm;
