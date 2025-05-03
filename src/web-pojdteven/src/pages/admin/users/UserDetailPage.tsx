import TitleText from '@/components/TitleText';
import UserForm from '../../../components/admin/users/UserForm';
import PageLayout from '@/components/admin/PageLayout';
const UserDetailPage = () => {
  return (
    <PageLayout>
      <TitleText>Detail uživatele</TitleText>
      <UserForm />
    </PageLayout>
  );
};

export default UserDetailPage;
