import { Sponsor } from '@/client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Role } from '@/enums';
import useDeleteSponsor from '@/hooks/sponsors/useDeleteSponsor';
import useAuthStore from '@/stores/AuthStore';
import { PhotoView } from 'react-photo-view';
import { useLocation } from 'react-router-dom';
import DataDeleteDialog from '../admin/DataDeleteDialog';

interface Props {
  sponsor: Sponsor;
}
const SponsorCard = ({ sponsor }: Props) => {
  const serverDomain = import.meta.env.VITE_SERVER_DOMAIN;
  const location = useLocation();
  const user = useAuthStore((store) => store.user);
  const deleteSponsor = useDeleteSponsor();

  return (
    <Card
      className='group hover:bg-slate-100 hover:dark:bg-slate-700'
      data-aos='fade-up'
    >
      <CardHeader>
        {user?.role === Role.ADMIN &&
          location.pathname == '/admin/sponsors' && (
            <div className='items-center absolute hidden group-hover:flex top-4 right-4 z-50'>
              <DataDeleteDialog
                onDelete={() => {
                  deleteSponsor.mutate({
                    path: {
                      id: sponsor.id!,
                    },
                  });
                }}
              />
            </div>
          )}
        <div className='w-72 h-72 flex items-center overflow-hidden group'>
          <PhotoView src={`${serverDomain ?? ''}/${sponsor.imagePath}`}>
            <img
              className='object-fill self-center group-hover:scale-110 duration-500 ease-linear'
              src={`${serverDomain ?? ''}/${sponsor.imagePath}`}
              alt='Obrázek sponzora'
            />
          </PhotoView>
        </div>
      </CardHeader>
      <CardContent>
        <p className='text-center'>{sponsor.name}</p>
      </CardContent>
    </Card>
  );
};

export default SponsorCard;
