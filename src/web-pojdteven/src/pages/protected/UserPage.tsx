import PageLayout from '@/components/admin/PageLayout';
import TitleText from '@/components/TitleText';
import ChangePasswordForm from '@/components/user/ChangePasswordForm';
import FormCard from '@/components/user/FormCard';
import UserAddressForm from '@/components/user/UserAddressForm';
import UserInfoForm from '@/components/user/UserInfoForm';
import getThemeColorByIndex from '@/utils/helpers/getThemeColorByIndex';

const UserPage = () => {
  return (
    <PageLayout className='text-white dark:text-white'>
      <FormCard className={getThemeColorByIndex(0, 'bg')}>
        <TitleText>Osobní informace</TitleText>
        <UserInfoForm />
      </FormCard>
      <FormCard className={getThemeColorByIndex(3, 'bg')}>
        <TitleText>Adresa</TitleText>
        <UserAddressForm />
      </FormCard>
      <FormCard className={getThemeColorByIndex(2, 'bg')}>
        <TitleText>Změna hesla</TitleText>
        <ChangePasswordForm />
      </FormCard>
    </PageLayout>
  );
};

export default UserPage;
