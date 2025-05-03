import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import usePaymentDataStore from '@/stores/PaymentDataStore';
import useQrCodeDrawerStore from '@/stores/QrCodeDrawerStore';
import { QrCode } from 'lucide-react';

const PaymentForm = () => {
  const setData = usePaymentDataStore((store) => store.setData);
  const setOpen = useQrCodeDrawerStore((store) => store.setOpen);

  const formSchema = z.object({
    amount: z
      .number({ required_error: 'Prosím vyberte částku' })
      .positive({ message: 'Částka musí být pozitivní' }),
    message: z
      .string()
      .max(60, { message: 'Zpráva musí mít maximálně 60 znaků' })
      .regex(/^[^*]*$/, { message: "Zpráva nesmí obsahovat znak '*'" })
      .optional(),
  });

  // Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // Define submit event
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setData(data);
    setOpen(true);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-4 pt-4'
      >
        <FormField
          control={form.control}
          name='amount'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Částka</FormLabel>
              <Select onValueChange={(value) => field.onChange(Number(value))}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Vyberte částku...' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='100'>100 Kč</SelectItem>
                  <SelectItem value='300'>300 Kč</SelectItem>
                  <SelectItem value='500'>500 Kč</SelectItem>
                  <SelectItem value='1000'>1 000 Kč</SelectItem>
                  <SelectItem value='1500'>1 500 Kč</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='message'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zpráva pro příjemce</FormLabel>
              <FormControl>
                <Textarea placeholder='Zpráva...' {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-max'>
          <QrCode />
          Vygenerovat QR kód
        </Button>
      </form>
    </Form>
  );
};

export default PaymentForm;
