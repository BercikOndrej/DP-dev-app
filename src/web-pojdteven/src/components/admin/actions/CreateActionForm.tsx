import { IMAGE_MAX_SIZE } from '@/utils/constants';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import useCreateAction from '@/hooks/actions/useCreateAction';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const formSchema = z.object({
  image: z
    .preprocess(
      // Převod na undefined pokud není File
      (val) => (val instanceof File ? val : undefined),
      z
        .instanceof(File)
        .refine(
          (image) => image.size < IMAGE_MAX_SIZE,
          'Velikost fotografie je příliš velká.'
        )
    )
    .or(z.undefined().refine(() => false, 'Vyplnění fotografie je povinné.')),
});
const CreateActionForm = () => {
  const [preview, setPreview] = useState<string | null>(null);

  const createAction = useCreateAction();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: undefined,
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    createAction.mutate({
      body: { file: values.image },
    });
  }

  return (
    <div className='w-full'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='image'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Foto</FormLabel>
                <FormControl>
                  <Input
                    type='file'
                    placeholder='Nahrát obrázek'
                    onChange={(e) => {
                      field.onChange(e.target.files?.[0]);
                      handleFileChange(e);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Maximální velikost fotografie je 10 Mb.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {preview && (
            <div className='mt-4'>
              <img
                src={preview}
                alt='Náhled obrázku'
                width={200}
                height={200}
                className='rounded-md'
              />
            </div>
          )}
          <Button disabled={createAction.isPending} type='submit'>
            Uložit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateActionForm;
