import { cn } from '@/lib/utils';
import getThemeColorByIndex from '@/utils/helpers/getThemeColorByIndex';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from '@/client';

interface Props {
  teacher: User;
  index: number;
}

const PublicTeacherCard = ({ teacher, index }: Props) => {
  const serverDomain = import.meta.env.VITE_SERVER_DOMAIN;
  const defaultProfilePicture = serverDomain + '/static/default-profile-picture.webp';

  return (
    <Card
      data-aos='fade-up'
      className={cn(
        getThemeColorByIndex(index, 'card'),
        'overflow-hidden border-0 mx-auto max-w-[400px]'
      )}
    >
      <CardHeader className='p-0'>
        <div className='overflow-hidden rounded-t-3xl z-10 h-[19rem]'>
          <img
            src={
              teacher.imagePath
                ? `${serverDomain}/${teacher.imagePath}`
                : defaultProfilePicture
            }
            alt='Profilové foto'
            className='group-hover:scale-110 object-cover transation transform duration-500'
          />
        </div>
        <CardTitle className='font-bold p-6 text-slate-50'>{`${
          teacher.academicTitle ?? ''
        } ${teacher.fullName}`}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className='text-slate-50 transition transform duration-500'>
          {teacher.description}
        </p>
      </CardContent>
    </Card>
  );
};

export default PublicTeacherCard;
