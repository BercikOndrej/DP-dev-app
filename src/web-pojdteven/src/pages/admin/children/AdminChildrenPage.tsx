import ChildForm from '@/components/admin/children/ChildForm';
import ChildrenTable from '@/components/admin/children/ChildrenTable';
import PageLayout from '@/components/admin/PageLayout';
import TitleText from '@/components/TitleText';

const AdminChildrenPage = () => {
  return (
    <PageLayout>
      <div className='w-full'>
        <TitleText className='mb-4'>Seznam dětí navštěvujících školku</TitleText>
        <ChildrenTable />
      </div>
      <div className='w-full mt-16'>
        <TitleText className='mb-4'>Zaregistrování nového dítěte</TitleText>
        <ChildForm />
      </div>
    </PageLayout>
  );
};

export default AdminChildrenPage;
