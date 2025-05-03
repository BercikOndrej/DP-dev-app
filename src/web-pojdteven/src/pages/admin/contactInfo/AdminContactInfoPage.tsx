import EditContactInfoForm from '@/components/admin/contactInfo/EditContactInfoForm';
import PageLayout from '@/components/admin/PageLayout';
import TitleText from '@/components/TitleText';
import { Skeleton } from '@/components/ui/skeleton';
import useContactInfo from '@/hooks/contactInfo/useContactInfo';
import createSkeletons from '@/utils/helpers/createSkeletons';

const AdminContactInfoPage = () => {
  const {
    data: adaptationProgramContactInfo,
    isLoading: adaptationProgramInfoIsLoading,
  } = useContactInfo(1);
  const { data: forestClubContactInfo, isLoading: forestClubInfoIsLoading } =
    useContactInfo(2);

  const skeletons = createSkeletons(3);

  return (
    <PageLayout>
      <TitleText>Editace kontaktních informací</TitleText>
      <div className='w-full'>
        <TitleText className='mb-4'>Lesní dětský klub</TitleText>
        {forestClubInfoIsLoading ? (
          <div className='w-full flex flex-col gap-8'>
            {skeletons.map((s) => (
              <Skeleton key={s} className='h-8 w-full' />
            ))}
            <Skeleton className='h-8 w-1/5' />
          </div>
        ) : (
          <EditContactInfoForm info={forestClubContactInfo} />
        )}
      </div>
      <div className='w-full'>
        <TitleText className='mt-16 mb-4'>Adaptační program</TitleText>
        {adaptationProgramInfoIsLoading ? (
          <div className='w-full flex flex-col gap-8'>
            {skeletons.map((s) => (
              <Skeleton key={s} className='h-8 w-full' />
            ))}
            <Skeleton className='h-8 w-1/5' />
          </div>
        ) : (
          <EditContactInfoForm info={adaptationProgramContactInfo} />
        )}
      </div>
    </PageLayout>
  );
};

export default AdminContactInfoPage;
