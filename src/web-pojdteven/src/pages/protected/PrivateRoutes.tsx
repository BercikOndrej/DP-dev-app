import useAuthStore from '@/stores/AuthStore';
import Layout from '../Layout';
import AccessDeniedPage from './AccessDeniedPage';

const PrivateRoutes = () => {
  const user = useAuthStore((store) => store.user);

  if (!user) {
    return <AccessDeniedPage />;
  }

  return <Layout />;
};

export default PrivateRoutes;
