import getThemeColorByIndex from '@/utils/helpers/getThemeColorByIndex';
import { FileDown } from 'lucide-react';

interface Props {
  name: string;
  link: string;
  index: number;
}

const DownloadFile = ({ name, link, index }: Props) => {
  return (
    <a
      href={link}
      target='_blank'
      className='justify-self-center text-center flex flex-col items-center justify-center gap-4 text-lg font-body hover:scale-125 ease-linear duration-300 hover:text-green-500 hover:dark:text-green-500'
    >
      <FileDown size={52} className={getThemeColorByIndex(index, 'text')} />
      <p>{name}</p>
    </a>
  );
};

export default DownloadFile;
