import PageLayout from '@/components/admin/PageLayout';
import CreateSponsorForm from '@/components/admin/sponsors/CreateSponsorForm';
import SponsorsList from '@/components/sponsors/SponsorsList';
import TitleText from '@/components/TitleText';

const AdminSponsorsPage = () => {
  return (
    <PageLayout>
      <div className='w-full'>
        <TitleText className='mb-4'>Vytvoření sponzora</TitleText>
        <CreateSponsorForm />
      </div>
      <div className='w-full'>
        <TitleText className='mt-16'>Sponzoři</TitleText>
        <SponsorsList />
      </div>
    </PageLayout>
  );
};

export default AdminSponsorsPage;
