import useAuthStore from '@/stores/AuthStore';
import AccessDeniedPage from '../protected/AccessDeniedPage';
import { Role } from '@/enums';
import AdminPageLayout from './AdminPageLayout';
import ErrorPage from '../ErrorPage';
import { ERROR_MESSAGES } from '@/utils/constants';

const AdminRoutes = () => {
  const user = useAuthStore((store) => store.user);

  if (!user) {
    return <AccessDeniedPage />;
  }

  if (user.role !== Role.ADMIN) {
    return <ErrorPage errorMessage={ERROR_MESSAGES[403]} />;
  }

  return <AdminPageLayout />;
};

export default AdminRoutes;