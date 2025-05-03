import PageLayout from '@/components/admin/PageLayout';
import ParenhoodList from '@/components/admin/users/ParenhoodList';
import TitleText from '@/components/TitleText';

const UsersChildrenManagement = () => {
  return (
    <PageLayout>
      <TitleText className='mt-16'>Rodičovská správa</TitleText>
      <ParenhoodList />
    </PageLayout>
  );
};

export default UsersChildrenManagement;
