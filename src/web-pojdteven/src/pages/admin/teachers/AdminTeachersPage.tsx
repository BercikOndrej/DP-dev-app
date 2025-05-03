import TitleText from '@/components/TitleText';
import TeachersTable from '../../../components/admin/teachers/TeachersTable';
import CreateTeacherForm from '@/components/admin/teachers/CreateTeacherForm';
import PageLayout from '@/components/admin/PageLayout';

const AdminTeachersPage = () => {
  return (
    <PageLayout>
      <TeachersTable />
      <div className='w-full'>
        <TitleText className='mb-4'>Zaregistrování nového průvodce</TitleText>
        <CreateTeacherForm />
      </div>
    </PageLayout>
  );
};

export default AdminTeachersPage;
