import PageLayout from '@/components/admin/PageLayout';
import UserForm from '@/components/admin/users/UserForm';
import UsersTable from '@/components/admin/users/UsersTable';
import TitleText from '@/components/TitleText';

const AdminUsersPage = () => {
  return (
    <PageLayout>
      <UsersTable />
      <div className='w-full'>
        <TitleText className='mb-4'>Vytvoření nového uživatele</TitleText>
        <UserForm />
      </div>
    </PageLayout>
  );
};

export default AdminUsersPage;
