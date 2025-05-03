import CreateDayActivityForm from '@/components/admin/dayActivities/CreateDayActivityForm';
import PageLayout from '@/components/admin/PageLayout';
import SchoolDayTimeline from '@/components/SchoolDayTimeline';
import TitleText from '@/components/TitleText';

const AdminDayActivitiesPage = () => {
  return (
    <PageLayout>
      <div className='w-full'>
        <TitleText className='mb-4'>Aktivity dne</TitleText>
        <SchoolDayTimeline />
      </div>
      <div className='w-full mt-16'>
        <TitleText className='mb-4'>Vytvoření nové aktivity</TitleText>
        <CreateDayActivityForm />
      </div>
    </PageLayout>
  );
};

export default AdminDayActivitiesPage;
