import ActionList from '@/components/ActionList';
import CreateActionForm from '@/components/admin/actions/CreateActionForm';
import PageLayout from '@/components/admin/PageLayout';
import TitleText from '@/components/TitleText';

const AdminActionPage = () => {
  return (
    <PageLayout>
      <div className='w-full'>
        <TitleText className='mb-4'>Vytvoření nové akce</TitleText>
        <CreateActionForm />
      </div>
      <div className='w-full'>
        <TitleText className='mb-8'>Akce</TitleText>
        <ActionList />
      </div>
    </PageLayout>
  );
};

export default AdminActionPage;
