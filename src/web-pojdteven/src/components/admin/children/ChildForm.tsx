import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import useChild from '@/hooks/children/useChild';
import useCreateChild from '@/hooks/children/useCreateChild';
import useUpdateChild from '@/hooks/children/useUpdateChild';
import { cn } from '@/lib/utils';
import createSkeletons from '@/utils/helpers/createSkeletons';
import isFromPast from '@/utils/helpers/isFromPast';
import { zodResolver } from '@hookform/resolvers/zod';
import { cs } from 'date-fns/locale';
import dayjs from 'dayjs';
import locale from 'dayjs/locale/cs';
import { CalendarIcon } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { z } from 'zod';

const CZECH_BIG_LETTERS = 'ÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ';
const CZECH_SMALL_LETTERS = 'áčďéěíňóřšťúůýž';
const nameRegex = new RegExp(
  `^[A-Z${CZECH_BIG_LETTERS}][a-z${CZECH_SMALL_LETTERS}]+(?: [A-Z${CZECH_BIG_LETTERS}][a-z${CZECH_SMALL_LETTERS}]+)? [A-Z${CZECH_BIG_LETTERS}][a-z${CZECH_SMALL_LETTERS}]+$`,
  'g'
);

const formSchema = z.object({
  fullName: z
    .string()
    .max(60, { message: 'Pole může mít maximálně 60 znaků.' })
    .regex(nameRegex, {
      message: 'Neplatné jméno',
    }),
  dateOfBirth: z
    .date({ required_error: 'Datum narození je nutno vyplnit.' })
    .refine(isFromPast, { message: 'Neplatné datum narození.' }),
  description: z
    .string()
    .max(1000, { message: 'Pole může mít maximálně 1000 znaků.' })
    .optional(),
  monthlyFee: z.coerce
    .number()
    .positive({ message: 'Tota hodnota musí být pozitivní.' }),
  schoolDays: z
    .string()
    .array()
    .nonempty({ message: 'Musíte vybrat alespoň jeden den.' }),
  note: z.string().max(1000).optional(),
});

const daysOptions = [
  { label: 'Po', value: '0' },
  { label: 'Út', value: '1' },
  { label: 'St', value: '2' },
  { label: 'Čt', value: '3' },
  { label: 'Pá', value: '4' },
];

const ChildForm = () => {
  const params = useParams();
  const childId = params.id;
  const { data: child, isLoading } = useChild(childId ?? '');

  const today = dayjs().startOf('day');
  const skeletons = createSkeletons(6);

  const createChild = useCreateChild();
  const updateChild = useUpdateChild(childId ?? '');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      fullName: child?.fullName ?? '',
      dateOfBirth:
        dayjs(child?.dateOfBirth)
          .locale({
            ...locale,
          })
          .startOf('day')
          .toDate() ?? undefined,
      description: child?.description ?? '',
      monthlyFee: child?.monthlyFee ?? 0,
      schoolDays: (child?.schoolDays.split('') as [string, ...string[]]) ?? [
        '1',
      ],
      note: child?.note ?? '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (child) {
      updateChild.mutate({
        path: {
          id: child.id!,
        },
        body: {
          ...values,
          dateOfBirth: dayjs(values.dateOfBirth)
            .startOf('day')
            .format('YYYY-MM-DD'),
          schoolDays: values.schoolDays.map(str => Number(str)).sort().join(''),
        },
      });
    } else {
      createChild.mutate({
        body: {
          ...values,
          dateOfBirth: dayjs(values.dateOfBirth)
            .startOf('day')
            .format('YYYY-MM-DD'),
          schoolDays: values.schoolDays.map(str => Number(str)).sort().join(''),
        },
      });
      form.reset();
    }
  }

  if (isLoading) {
    return (
      <div className='w-full flex flex-col gap-8'>
        {skeletons.map((s) => (
          <div key={s} className='w-full flex flex-col gap-4'>
            <Skeleton className='w-1/4 h-4' />
            <Skeleton className='w-full h-8' />
          </div>
        ))}
        <Skeleton className='w-1/5 h-8' />
      </div>
    );
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
                <FormControl>
                  <Input placeholder='Amálie Malá' {...field} />
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
                          'w-[240px] pl-3 text-left font-normal rounded-md',
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
                  Datum narození je využito pro vypočet věku.
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
                <FormLabel>Popis dítěte</FormLabel>
                <FormControl>
                  <Input placeholder='Krátký popis dítěte' {...field} />
                </FormControl>
                <FormDescription>Toto pole není povinné.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='monthlyFee'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Měsíční poplatek</FormLabel>
                <FormControl>
                  <Input type='number' placeholder='0' {...field} />
                </FormControl>
                <FormDescription>
                  Tato hodnota reprezentuje finální měsiční poplatek za
                  školkovné. Jsou zde započítány i všechny slevy. Stravné se do
                  tohoto poplatku nepočítá.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='schoolDays'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Školní dny</FormLabel>
                <div className='flex flex-row gap-4 items-center justify-evenly py-4'>
                  {daysOptions.map((option) => (
                    <FormItem
                      key={option.label}
                      className='flex flex-col items-center justify-start'
                    >
                      <FormLabel>{option.label}</FormLabel>
                      <FormControl>
                        <Checkbox
                          className='m-0'
                          checked={field.value.includes(option.value)}
                          onCheckedChange={(checked) => {
                            field.onChange(
                              checked
                                ? [...field.value, option.value]
                                : field.value.filter(
                                    (item: string) => item !== option.value
                                  )
                            );
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  ))}
                </div>
                <FormDescription>
                  Zde zaškrtněte dny, ve kterých bude dítě navštěvovat školku.
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
                  <Input placeholder='' {...field} />
                </FormControl>
                <FormDescription>
                  Zde doplňte dodatečné informace.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={updateChild.isPending || createChild.isPending}
            type='submit'
          >
            Uložit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ChildForm;
