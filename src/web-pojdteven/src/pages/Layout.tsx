import { Outlet } from 'react-router-dom';
import useAOS from '@/hooks/useAOS';
import useNavbarShrinks from '@/hooks/useNavbarShrinks';
import ScrollToTop from '@/utils/ScrollToTop';
import Footer from './Footer';
import NavBar from '@/components/navMenu/Navbar';

const Layout = () => {
  useAOS();
  useNavbarShrinks();

  return (
    <div className='flex flex-col justify-between min-h-screen'>
      <NavBar />
      <main className='flex-col grow '>
        <ScrollToTop />
        <Outlet />
      </main>
      <footer className='flex-none'>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
