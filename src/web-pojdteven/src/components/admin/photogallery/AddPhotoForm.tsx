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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PhotoTag } from '@/enums';
import useCreatePhoto from '@/hooks/photos/useCreatePhoto';
import { IMAGE_MAX_SIZE } from '@/utils/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  tag: z.nativeEnum(PhotoTag, {
    message: 'Neplatné označení pro fotky. Vyberte prosím označení fotky.',
  }),
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

const AddPhotoForm = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const addPhoto = useCreatePhoto();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tag: undefined,
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
    addPhoto.mutate({
      query: {
        tag: values.tag,
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
            name='tag'
            render={({ field }) => (
              <FormItem className='w-max'>
                <FormLabel>Kategorie</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Vyberte označení fotky' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='ForestClub'>
                      Lesní dětský klub
                    </SelectItem>
                    <SelectItem value='AdaptationProgram'>
                      Adaptační program
                    </SelectItem>
                    <SelectItem value='Places'>Prostory školky</SelectItem>
                  </SelectContent>
                </Select>
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
          <Button disabled={addPhoto.isPending} type='submit'>
            Uložit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddPhotoForm;
