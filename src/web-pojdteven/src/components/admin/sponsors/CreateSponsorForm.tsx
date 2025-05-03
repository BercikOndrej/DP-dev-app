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
import useCreateSponsor from '@/hooks/sponsors/useCreateSponsor';
import useUploadSponsorImage from '@/hooks/sponsors/useUploadSponsorImage';
import { IMAGE_MAX_SIZE } from '@/utils/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().max(80, { message: 'Pole může mít maximálně 80 znaků.' }),
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
    .or(z.undefined().refine(() => false, 'Vyplnění fotografie je povinné')),
});
const CreateSponsorForm = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const createSponsor = useCreateSponsor();
  const uploadImage = useUploadSponsorImage();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const sponsor = await createSponsor.mutateAsync({
      body: {
        name: values.name,
      },
    });
    uploadImage.mutate({
      path: {
        id: sponsor.id!,
      },
      body: { file: values.image },
    });
  }

  return (
    <div className='w-full'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Název</FormLabel>
                <FormControl>
                  <Input placeholder='Město Olomouc' {...field} />
                </FormControl>
                <FormDescription>
                  Pomocí tohoto označení budou fotky následně rozřazeny.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    onChange={(event) => {
                      field.onChange(event.target.files?.[0]);
                      handleFileChange(event);
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
          <Button disabled={createSponsor.isPending} type='submit'>
            Uložit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateSponsorForm;
