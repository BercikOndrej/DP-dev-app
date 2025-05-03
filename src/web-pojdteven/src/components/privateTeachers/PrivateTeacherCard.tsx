import {User} from '@/client';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {cn} from '@/lib/utils';
import getThemeColorByIndex from '@/utils/helpers/getThemeColorByIndex';
import PersonInfo from '../contactCard/PersonInfo';

interface Props {
  teacher: User;
  index: number;
}

const PrivateTeacherCard = ({ teacher, index }: Props) => {
  const serverDomain = import.meta.env.VITE_SERVER_DOMAIN;
  const defaultProfilePicture = serverDomain + '/static/default-profile-picture.webp';

  return (
    <Card
      data-aos='fade-up'
      className={cn(
        getThemeColorByIndex(index, 'card'),
        'overflow-hidden border-0 mx-auto flex flex-row'
      )}
    >
      <CardHeader className='p-0 sm:flex flex-row hidden'>
        <div className='overflow-hidden rounded-lt-3xl z-10'>
          <img
            src={
              teacher.imagePath
                ? `${serverDomain}/${teacher.imagePath}`
                : defaultProfilePicture
            }
            sizes='200'
            alt='Profilové foto'
            className='group-hover:scale-110 object-cover h-full transation transform duration-500 max-h-52'
          />
        </div>
      </CardHeader>
      <div>
        <CardTitle className='font-bold p-6 text-slate-50'>
          {`${teacher.academicTitle ?? ''} ${teacher.fullName}`}
        </CardTitle>
        <CardContent className='text-slate-50'>
          <PersonInfo
            person={{
              id: Number(teacher.id),
              email: teacher.email,
              phoneNumber: teacher.phoneNumber!,
              fullName: teacher.fullName!,
            }}
          />
        </CardContent>
      </div>
    </Card>
  );
};

export default PrivateTeacherCard;
