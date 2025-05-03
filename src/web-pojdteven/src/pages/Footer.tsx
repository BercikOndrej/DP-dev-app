import SocialSiteLinks from '@/components/SocialSiteLinks';
import { Separator } from '@/components/ui/separator';
import {Link} from 'react-router-dom';

const Footer = () => {
  return (
    <div className='flex flex-col items-center gap-4 md:flex-row md:justify-between p-8 bg-slate-50 dark:bg-slate-800 w-full bottom-0'>
      <div className='flex flex-col items-center gap-4 md:flex-row md:gap-2'>
        <p>Berčík Ondřej</p>
        <Separator
          orientation='vertical'
          className='hidden md:block h-6 w-[1px] bg-slate-950 dark:bg-slate-50'
        />
        <p>COPYRIGHT &#169; 2025 pojdteven.cz</p>
      </div>
      <div className='flex flex-row justify-end gap-4'>
        <Link className='underline' to='/privacy-policy'>Privacy Policy</Link>
        <SocialSiteLinks iconSize={28} />
      </div>
    </div>
  );
};

export default Footer;
