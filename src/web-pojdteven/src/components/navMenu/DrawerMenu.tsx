import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { CgMenuRight } from 'react-icons/cg';
import { MENU_DATA } from '@/utils/constants';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

const DrawerMenu = () => {
  return (
    <Drawer>
      <DrawerTrigger className='xl:hidden' aria-label="Drawer">
        <CgMenuRight className='w-8 h-8 text-green-500' />
      </DrawerTrigger>
      <DrawerContent className='flex flex-col justify-center items-start'>
        <DrawerDescription className='hidden'>
          Navigation menu
        </DrawerDescription>
        <DrawerTitle className='hidden'>Navigation Menu</DrawerTitle>
        {MENU_DATA.map((data, index) => (
          <div className='w-full px-4' key={index}>
            <Link to={data.link} className='w-full'>
              <DrawerClose className='p-2 w-full items-center justify-center rounded-md font-medium transition-colors hover:bg-slate-100 hover:text-green-500 dark:hover:text-green-500 dark:hover:bg-slate-800 transform duration-500'>
                {data.name}
              </DrawerClose>
            </Link>
            <div className='px-4'>
              <Separator />
            </div>
          </div>
        ))}
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerMenu;
