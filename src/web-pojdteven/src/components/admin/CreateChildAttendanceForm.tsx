import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import dayjs from 'dayjs';
import locale from 'dayjs/locale/cs';
import useCurrentMonthStore from '@/stores/CurrentMonthStore';
import useChildStore from '@/stores/ChildStore';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { attendanceControllerGetAllNormalAttendanceItemsOfChildInMonthQueryKey } from '@/client/@tanstack/react-query.gen';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { cs } from 'date-fns/locale';
import useCreateManyAttendanceItemsOfChild from '../../hooks/attendance/useCreateManyAttendanceItemsOfChild';

const formSchema = z.object({
  from: z.date({ required_error: 'Datum je nutno vyplnit.' }),
  to: z.date({ required_error: 'Datum je nutno vyplnit.' }),
});

const CreateChildAttendanceForm = () => {
  const now = dayjs()
    .locale({
      ...locale,
    })
    .startOf('day');

  const currentMonth = useCurrentMonthStore((store) => store.currentMonth);
  const childId = useChildStore((store) => store.childId);

  const childAttendanceQueryKey =
    attendanceControllerGetAllNormalAttendanceItemsOfChildInMonthQueryKey({
      path: {
        childId: childId ?? '',
      },
      query: {
        month: currentMonth.month(),
      },
    });

  const createChildAttendance = useCreateManyAttendanceItemsOfChild([
    childAttendanceQueryKey,
  ]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    createChildAttendance.mutate({
      body: {
        childId: childId,
        from: dayjs(values.from).startOf('day').format('YYYY-MM-DD'),
        to: dayjs(values.to).startOf('day').format('YYYY-MM-DD'),
      },
    });
    form.reset();
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      from: now.toDate(),
      to: now.add(7, 'day').toDate(),
    },
  });

  return (
    <div className='w-full'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='from'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Počáteční datum</FormLabel>
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
                      toYear={now.add(10, 'year').year()}
                      defaultMonth={field.value ? field.value : now.toDate()}
                      captionLayout='dropdown'
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Toto je počáteční datum od kterého se automaticky vytvoří
                  docházka dle školních dní dítěte.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='to'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Poslední datum</FormLabel>
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
                      toYear={now.add(10, 'year').year()}
                      defaultMonth={field.value ? field.value : now.toDate()}
                      captionLayout='dropdown'
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Toto je poslední datum po které se automaticky vytvoří
                  docházka dle školních dní dítěte.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={createChildAttendance.isPending} type='submit'>
            Uložit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateChildAttendanceForm;
