import { ContactInfo } from '@/client';
import { FaUserAlt } from 'react-icons/fa';
import { IoIosMail } from 'react-icons/io';
import { PiPhoneFill } from 'react-icons/pi';

interface Props {
  person: ContactInfo | undefined | void;
}

const iconStyle =
  'text-slate-950 dark:text-slate-50 group-hover/link:text-green-500 group-hover/link:scale-125 duration-500 ease-linear';
const paragraphStyle =
  'group-hover/link:text-green-500 duration-500 ease-linear';

const PersonInfo = ({ person }: Props) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-row gap-4 items-center'>
        <FaUserAlt size={28} className='text-slate-950 dark:text-slate-50' />
        <p>{person?.fullName}</p>
      </div>
      <a
        className='flex flex-row gap-4 items-center group/link'
        href={`mailto:${person?.email}`}
      >
        <IoIosMail size={28} className={iconStyle} />
        <p className={paragraphStyle}>{person?.email}</p>
      </a>
      <a
        className='flex flex-row gap-4 items-center group/link'
        href={`tel:${person?.phoneNumber}`}
      >
        <PiPhoneFill size={28} className={iconStyle} />
        <p className={paragraphStyle}>{person?.phoneNumber}</p>
      </a>
    </div>
  );
};

export default PersonInfo;
