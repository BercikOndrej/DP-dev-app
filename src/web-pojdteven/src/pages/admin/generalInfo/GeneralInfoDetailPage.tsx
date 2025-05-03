import GeneralInfoForm from '@/components/admin/generalInfo/GeneralInfoForm';
import PageLayout from '@/components/admin/PageLayout';
import TitleText from '@/components/TitleText';
import { PageType } from '@/enums';
import { useParams } from 'react-router-dom';

const GeneralInfoDetailPage = () => {
  const params = useParams();

  return (
    <PageLayout>
      <TitleText>Editace informací</TitleText>
      <GeneralInfoForm infoId={Number(params.id)} page={PageType.FOREST_CLUB} />
    </PageLayout>
  );
};

export default GeneralInfoDetailPage;
