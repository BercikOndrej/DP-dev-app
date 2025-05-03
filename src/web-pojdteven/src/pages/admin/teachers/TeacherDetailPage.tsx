import PageLayout from '@/components/admin/PageLayout';
import CreateTeacherForm from '@/components/admin/teachers/CreateTeacherForm';
import UploadImageForm from '@/components/admin/teachers/UploadImageForm';
import TitleText from '@/components/TitleText';

const TeacherDetailPage = () => {
  return (
    <PageLayout>
      <div className='w-full'>
        <TitleText>Profilový obrázek průvodce</TitleText>
        <UploadImageForm />
      </div>
      <div className='w-full'>
        <TitleText className='mb-4'>Detaily o průvodci</TitleText>
        <CreateTeacherForm />
      </div>
    </PageLayout>
  );
};

export default TeacherDetailPage;
