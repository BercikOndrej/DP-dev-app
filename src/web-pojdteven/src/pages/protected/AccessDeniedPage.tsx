import useAOS from '../../hooks/useAOS';
import useNavbarShrinks from '@/hooks/useNavbarShrinks';
import Navbar from '@/components/navMenu/Navbar';
import { MdLock } from 'react-icons/md';
import Footer from '../Footer';
import LoginDialog from '@/components/login/LoginDialog';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AccessDeniedPage = () => {
  useAOS();
  useNavbarShrinks();

  return (
    <div className='h-screen flex flex-col justify-between'>
      <Navbar />
      <div
        data-aos='fade-up'
        className='p-4 items-center flex flex-col gap-8 text-center font-body text-2xl'
      >
        <MdLock size={150} />
        <h2 className='font-title text-6xl'>Přístup odepřen</h2>
        <p>Pro přístup k této stránce se musíte nejprve přihlásit.</p>
        <div className='flex flex-row items-center justify-between gap-4'>
          <Button className='w-max mx-auto'>
            <Link to='/'>Zpět Domů</Link>
          </Button>
          <LoginDialog />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AccessDeniedPage;
