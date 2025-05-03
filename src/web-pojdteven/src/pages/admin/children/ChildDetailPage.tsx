import ChildForm from '@/components/admin/children/ChildForm';
import PageLayout from '@/components/admin/PageLayout';
import TitleText from '@/components/TitleText';

const ChildDetailPage = () => {
  return (
    <PageLayout>
      <TitleText>Detaily o dítěti</TitleText>
      <ChildForm />
    </PageLayout>
  );
};

export default ChildDetailPage;
