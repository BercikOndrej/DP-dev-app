import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { MENU_DATA } from '@/utils/constants';
import { cn } from '@/lib/utils';
import { NavLink } from 'react-router-dom';

const NavMenu = () => {
  const activeStyle =
    'bg-slate-100 text-green-500 dark:bg-slate-800 dark:text-green-500';
  return (
    <NavigationMenu>
      <NavigationMenuList className='hidden gap-1 xl:flex'>
        {MENU_DATA.map((data, index) => (
          <NavigationMenuItem key={index}>
            <NavLink
              to={data.link}
              className={({ isActive }) =>
                cn(
                  navigationMenuTriggerStyle(),
                  'lg:w-full w-full text-center',
                  isActive ? activeStyle : ''
                )
              }
            >
              {data.name}
            </NavLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavMenu;
