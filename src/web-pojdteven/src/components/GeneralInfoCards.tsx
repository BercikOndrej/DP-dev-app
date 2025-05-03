import { PageType, Role } from '@/enums';
import useDeleteGeneralInfo from '@/hooks/generalInfo/useDeleteGeneralInfo';
import useGeneralInfo from '@/hooks/generalInfo/useGeneralInfo';
import { cn } from '@/lib/utils';
import useAuthStore from '@/stores/AuthStore';
import createSkeletons from '@/utils/helpers/createSkeletons';
import getThemeColorByIndex from '@/utils/helpers/getThemeColorByIndex';
import { Edit2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import DataDeleteDialog from './admin/DataDeleteDialog';
import SocialSiteLinks from './SocialSiteLinks';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Skeleton } from './ui/skeleton';

interface Props {
  pageType: PageType;
}
const GeneralInfoCards = ({ pageType }: Props) => {
  const { data: info, isLoading } = useGeneralInfo(pageType);
  const location = useLocation();
  const user = useAuthStore((store) => store.user);
  const skeletons = createSkeletons(4);
  const isRenderingOnAdminPage =
    location.pathname.startsWith('/admin/generalInfo') &&
    user?.role === Role.ADMIN;

  const deleteInfo = useDeleteGeneralInfo();

  return (
    <div className='flex flex-col gap-4 text-slate-50'>
      {isLoading &&
        skeletons.map((skeleton) => (
          <Card key={skeleton} data-aos='fade-up'>
            <CardHeader>
              <Skeleton className='w-1/4 h-6' />
            </CardHeader>
            <CardContent>
              <div className='flex flex-col gap-4'>
                <Skeleton className='w-full h-4' />
                <Skeleton className='w-full h-4' />
              </div>
            </CardContent>
          </Card>
        ))}
      {info?.map((info, index) => (
        <Card
          key={index}
          data-aos='fade-up'
          className={cn('border-0 group', getThemeColorByIndex(index, 'card'))}
        >
          <CardHeader className='flex flex-row justify-between items-center'>
            <CardTitle className='opacity-50 text-slate-50 dark:text-slate-50'>
              {info.title}
            </CardTitle>
            {isRenderingOnAdminPage && (
              <div className='flex flex-row gap-2 items-center md:hidden group-hover:flex'>
                <span className='font-title text-slate-50 dark:text-slate-50 text-xl'>{info.position}</span>
                <Link
                  className='flex items-center rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-800/80 p-2'
                  to={`/admin/generalInfo/${info.id}`}
                >
                  <Edit2 />
                </Link>
                <DataDeleteDialog
                  onDelete={() =>
                    deleteInfo.mutate({
                      path: {
                        id: info.id!,
                      },
                    })
                  }
                />
              </div>
            )}
          </CardHeader>
          <CardContent
            className='editor text-slate-50 dark:text-slate-50'
            dangerouslySetInnerHTML={{ __html: info.content ?? '' }}
          />
        </Card>
      ))}
      {!isRenderingOnAdminPage && (
        <div data-aos='fade-up'>
          <SocialSiteLinks iconSize={42} />
        </div>
      )}
    </div>
  );
};

export default GeneralInfoCards;
