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
import { Skeleton } from '@/components/ui/skeleton';
import { PageType } from '@/enums';
import useCreateGeneralInfo from '@/hooks/generalInfo/useCreateGeneralInfo';
import useGeneralInfoById from '@/hooks/generalInfo/useGeneralInfoById';
import useNextPositionOfInfoOnPage from '@/hooks/generalInfo/useLastPositionOfInfoOnPage';
import useUpdateGeneralInfo from '@/hooks/generalInfo/useUpdateGeneralInfo';
import { zodResolver } from '@hookform/resolvers/zod';
import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface Props {
  infoId?: number;
  page: PageType;
}

const formSchema = z.object({
  title: z
    .string({ required_error: 'Toto pole je povinné.' })
    .max(80, { message: 'Pole může mít maximálně 80 znaků.' }),
  content: z
    .string({ required_error: 'Toto pole je povinné.' })
    .max(500, { message: 'Pole může mít maximálně 500 znaků.' }),
  position: z.coerce
    .number()
    .positive({ message: 'Pozice musí být kladné číslo' }),
});

const GeneralInfoForm = ({ infoId, page }: Props) => {
  const editorRef = useRef(null);
  const { data: info, isLoading } = useGeneralInfoById(infoId!);

  // Correct page setting
  page = (info?.page as PageType) || page;

  const { data: nextPosition } = useNextPositionOfInfoOnPage(page);

  const updateInfo = useUpdateGeneralInfo(infoId!);
  const createInfo = useCreateGeneralInfo();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      title: info?.title ?? '',
      content: info?.content ?? '',
      position: info?.position ?? nextPosition ?? 0,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (info) {
      updateInfo.mutate({
        path: {
          id: info.id!,
        },
        body: {
          ...values,
          page: info.page,
        },
      });
    } else {
      createInfo.mutate({
        body: {
          ...values,
          page: page,
        },
      });
    }
    form.reset();
  }

  if (isLoading) {
    return (
      <div className='w-full flex flex-col gap-8'>
        <div className='flex flex-col gap-4'>
          <Skeleton className='h-4 w-1/5' />
          <Skeleton className='h-8 w-full' />
        </div>
        <div className='flex flex-col gap-4'>
          <Skeleton className='h-4 w-1/5' />
          <Skeleton className='h-[300px] w-full' />
        </div>
        <div className='flex flex-col gap-4'>
          <Skeleton className='h-4 w-1/5' />
          <Skeleton className='h-8 w-full' />
        </div>
      </div>
    );
  }

  return (
    <div className='w-full'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titulek</FormLabel>
                <FormControl>
                  <Input placeholder='Název' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='content'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Obsah</FormLabel>
                <FormControl>
                  <Editor
                    apiKey={import.meta.env.VITE_TINY_MCE_API_KEY as string}
                    onInit={(editor: null) => (editorRef.current = editor)}
                    value={field.value}
                    init={{
                      height: 300,
                      menubar: false,
                      statusbar: false,
                      plugins: [
                        'lists',
                        'advlist',
                        'link',
                        'image',
                        'charmap',
                        'preview',
                        'anchor',
                      ],
                      toolbar:
                        'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist | ' +
                        'removeformat | help',
                      content_style:
                        'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    }}
                    onEditorChange={(content: string) =>
                      form.setValue('content', content, {
                        shouldValidate: true,
                      })
                    }
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='position'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pořadí</FormLabel>
                <FormControl>
                  <Input type='number' placeholder='0' {...field} />
                </FormControl>
                <FormDescription>
                  Tato hodnota určuje pořadí info bubliny (vzestupné pořadí) na
                  hlavních stránkách. Hodnotu zvolte vzhledem k ostatním
                  hodnotám jiných info bublin.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={updateInfo.isPending} type='submit'>
            Uložit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default GeneralInfoForm;
