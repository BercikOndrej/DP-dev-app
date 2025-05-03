import { FaFacebookSquare, FaInstagram } from 'react-icons/fa';

interface Props {
  iconSize: 14 | 28 | 42 | 56 | 70;
}

const SocialSiteLinks = ({ iconSize }: Props) => {
  return (
    <div className='w-max flex flex-row gap-4 text-slate-600 dark:text-slate-400'>
      <a
        href='https://www.instagram.com/pojdte_ven_lesni_klub/'
        title='Postupojte na náš Instagram'
        target='_blank'
        className='hover:text-green-500 hover:scale-125 duration-500 ease-linear'
      >
        <FaInstagram size={iconSize} />
      </a>
      <a
        href='https://www.facebook.com/pojdteven'
        target='_blank'
        title='Postupujte na náš Facebook'
        className='hover:text-green-500 hover:scale-125 duration-500 ease-linear'
      >
        <FaFacebookSquare size={iconSize} />
      </a>
    </div>
  );
};

export default SocialSiteLinks;
