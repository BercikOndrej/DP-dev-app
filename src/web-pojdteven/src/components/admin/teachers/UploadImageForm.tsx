import {Button} from '@/components/ui/button';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Skeleton} from '@/components/ui/skeleton';
import useTeachers from '@/hooks/teachers/useTeachers';
import {IMAGE_MAX_SIZE} from '@/utils/constants';
import {zodResolver} from '@hookform/resolvers/zod';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {useParams} from 'react-router-dom';
import {z} from 'zod';
import useUploadTeacherImage from '../../../hooks/teachers/useUploadTeacherImage';

const serverDomain = import.meta.env.VITE_SERVER_DOMAIN;
const defaultPicture = `${serverDomain}/static/default-profile-picture.webp`;

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

const UploadImageForm = () => {
  const params = useParams();
  const teacherId = params.id;
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  const { data: teachers, isLoading } = useTeachers();

  const userImg = teachers?.find((teacher) => teacher.id === teacherId)?.imagePath;
  const userImgUrl = userImg ? `${serverDomain}/${userImg}` : null;

  const uploadImage = useUploadTeacherImage();

  const form = useForm({
    resolver: zodResolver(formSchema),
    values: {
      image: undefined,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    uploadImage.mutate({
      path: {
        id: teacherId!,
      },
      body: { file: values.image },
    });
    form.reset();
  }

  if (isLoading) {
    return (
      <div className='w-full flex flex-col gap-8'>
        <Skeleton className='w-1/4 h-8' />
        <Skeleton className='w-[200px] h-[200px]' />
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
            name='image'
            render={({ field }) => (
              <FormItem className='w-1/4'>
                <FormLabel>Profilový obrázek</FormLabel>
                <FormControl>
                  <Input
                    type='file'
                    className='cursor-pointer'
                    onChange={(event) => {
                      field.onChange(event.target.files?.[0]);
                      handleFileChange(event);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='mt-4'>
            <img
              src={preview ?? userImgUrl ?? defaultPicture}
              alt='Náhled obrázku'
              width={200}
              height={200}
              className='rounded-md'
            />
          </div>
          <Button type='submit'>Nahrát</Button>
        </form>
      </Form>
    </div>
  );
};

export default UploadImageForm;
