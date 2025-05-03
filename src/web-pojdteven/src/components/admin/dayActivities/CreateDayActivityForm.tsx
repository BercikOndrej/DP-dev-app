import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useCreateActivity from '@/hooks/dayActivities/useCreateDayActivity';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z
  .object({
    startTime: z.string().regex(/^\d{2}:\d{2}$/, {
      message: 'Neplané zadání času. Čas zadejte ve fotmátu HH:mm',
    }),
    endTime: z.string().regex(/^\d{2}:\d{2}$/, {
      message: 'Neplané zadání času. Čas zadejte ve fotmátu HH:mm',
    }),
    description: z
      .string()
      .max(200, { message: 'Pole může mít maximálně 200 znaků.' }),
  })
  .superRefine((val, ctx) => {
    const now = dayjs().set('hour', 0).set('minute', 0);
    const [startHour, startMinute] = val.startTime
      .split(':')
      .map((d) => parseInt(d));
    const startTime = now.set('hour', startHour).set('minute', startMinute);

    const [endHour, endMinute] = val.endTime.split(':').map((d) => parseInt(d));
    const endTime = now.set('hour', endHour).set('minute', endMinute);

    if (endTime.isSameOrBefore(startTime)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Konec akce musí být později než začátek akce.',
        path: ['endTime'],
      });
    }
  });

const CreateDayActivityForm = () => {
  const createActivity = useCreateActivity();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startTime: '',
      endTime: '',
      description: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const now = dayjs().set('hour', 0).set('minute', 0);
    const [startHour, startMinute] = values.startTime
      .split(':')
      .map((d) => parseInt(d));
    const startTime = now
      .set('hour', startHour)
      .set('minute', startMinute)
      .format('HH:mm');

    const [endHour, endMinute] = values.endTime
      .split(':')
      .map((d) => parseInt(d));
    const endTime = now
      .set('hour', endHour)
      .set('minute', endMinute)
      .format('HH:mm');

    createActivity.mutate({
      body: {
        startTime: startTime,
        endTime: endTime,
        description: values.description,
      },
    });
    form.reset();
  }

  return (
    <div className='w-full'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='startTime'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Začátek aktivity</FormLabel>
                <Input placeholder='09:30' {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='endTime'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Konec aktivity</FormLabel>
                <Input type='text' placeholder='10:00' {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Popis aktivity</FormLabel>
                <Input
                  type='text'
                  placeholder='Odpolední procházka'
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={createActivity.isPending} type='submit'>
            Uložit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateDayActivityForm;
