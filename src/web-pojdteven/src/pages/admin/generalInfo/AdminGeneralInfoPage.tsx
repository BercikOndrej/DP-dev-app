import GeneralInfoForm from '@/components/admin/generalInfo/GeneralInfoForm';
import PageLayout from '@/components/admin/PageLayout';
import GeneralInfoCards from '@/components/GeneralInfoCards';
import TitleText from '@/components/TitleText';
import { PageType } from '@/enums';

interface Props {
  page: PageType;
}

const AdminGeneralInfoPage = ({ page }: Props) => {
  return (
    <PageLayout>
      <div className='w- full'>
        <TitleText className='mb-4'>
          {page === PageType.FOREST_CLUB
            ? 'Informace o lesním dětském klubu'
            : 'Informace o adaptačním programu'}
        </TitleText>
        <GeneralInfoCards pageType={page} />
      </div>
      <div className='w-full'>
        <TitleText className='mb-4'>Vytvoření nových informací</TitleText>
        <GeneralInfoForm page={page} />
      </div>
    </PageLayout>
  );
};

export default AdminGeneralInfoPage;
