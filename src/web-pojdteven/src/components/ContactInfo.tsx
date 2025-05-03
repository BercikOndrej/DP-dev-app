import { FaMapMarkerAlt } from 'react-icons/fa';
import { MAP_LINK } from '@/utils/constants';
import { IoIosMail } from 'react-icons/io';
import { PiPhoneFill } from 'react-icons/pi';
import SocialSiteLinks from '@/components/SocialSiteLinks';

const ContactInfo = () => {
  return (
    <div
      className='p-[20%] pl-[20%] lg:my-auto flex flex-col gap-4 font-title'
      data-aos='fade-right'
    >
      <h2 className='font-title text-2xl md:text-4xl mb-8 text-slate-950 dark:text-slate-50'>
        Kontakt
      </h2>
      <a
        className='flex flex-row items-center gap-4 group w-full'
        href={MAP_LINK}
        target='_blank'
      >
        <FaMapMarkerAlt
          className='text-slate-950 dark:text-slate-50 group-hover:text-green-500 group-hover:scale-125 duration-500 ease-linear'
          size={42}
        />
        <p className='flex-1 group-hover:text-green-500 duration-500 ease-linear'>
          Lošov 99, 783 65 Olomouc
        </p>
      </a>
      <a
        className='flex flex-row w-full items-center gap-4 group group-hover:text-green-500 duration-500 ease-linear'
        href='tel:+420608344710'
      >
        <PiPhoneFill
          className='text-slate-950 dark:text-slate-50 group-hover:text-green-500 group-hover:scale-125 duration-500 ease-linear'
          size={42}
        />
        <p className='flex-1 group-hover:text-green-500 duration-500 ease-linear'>
          +420 608 344 710
        </p>
      </a>
      <a
        className='flex flex-row w-full items-center gap-4 group'
        href='mailto:pojdteven@gmail.com'
      >
        <IoIosMail
          className='text-slate-950 dark:text-slate-50 group-hover:text-green-500 group-hover:scale-125 duration-500 ease-linear'
          size={42}
        />
        <p className='flex-1 group-hover:text-green-500 duration-500 ease-linear'>
          pojdteven@gmail.com
        </p>
      </a>
      <div className='flex flex-row w-full items-center gap-4 group'>
        <p className='text-slate-950 dark:text-slate-50 font-bold w-[42px] group-hover:scale-125 group-hover:text-green-500 text-center duration-500 ease-linear'>
          IČO:
        </p>
        <p className='flex-1'>01466291</p>
      </div>
      <SocialSiteLinks iconSize={42} />
    </div>
  );
};

export default ContactInfo;
