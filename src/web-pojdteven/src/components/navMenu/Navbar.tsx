import { NavLink } from 'react-router-dom';
import DrawerMenu from './DrawerMenu';
import NavMenu from './NavMenu';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Separator } from '@/components/ui/separator';
import LoginDialog from '@/components/login/LoginDialog';
import useAuthStore from '@/stores/AuthStore';
import AccountDropddownMenu from '../login/AccountDropddownMenu';

const Navbar = () => {
  const serverDomain = import.meta.env.VITE_SERVER_DOMAIN;
  const logoPath = 'static/Logo.webp';
  const user = useAuthStore((store) => store.user);

  return (
    <div className='flex flex-col sticky w-full top-0 z-50 bg-white dark:bg-slate-950 duration-500 transition-all'>
      <div
        id='navbar'
        className='flex flex-row justify-between items-center gap-2 sm:gap-4 p-4 md:px-12 transition-all duration-500 ease-linear'
      >
        <NavLink to='/'>
          <img
            id='navbar-logo'
            src={`${serverDomain}/${logoPath}`}
            className='h-16 w-48 transition-all duration-500'
            alt='Pojdteven logo'
          />
        </NavLink>
        <NavMenu />
        <div className='flex flex-row items-center gap-4'>
          {user ? <AccountDropddownMenu /> : <LoginDialog />}
          <ModeToggle />
          <DrawerMenu />
        </div>
      </div>
      <Separator
        orientation='horizontal'
        className='h-[1px] bg-slate-200 dark:bg-slate-500'
      />
    </div>
  );
};

export default Navbar;
