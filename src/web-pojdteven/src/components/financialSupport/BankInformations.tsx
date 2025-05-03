import TitleText from '@/components/TitleText';
import { cn } from '@/lib/utils';
import { CreditCard, Landmark } from 'lucide-react';
import { FaPiggyBank } from 'react-icons/fa6';
import {useLocation} from 'react-router-dom';

interface Props {
  className?: string;
}

const iconSize = 30;

const staticData = [
  {
    icon: <FaPiggyBank size={iconSize} />,
    title: 'Bankovní spojení',
    text: '2400407618/2010 Fio banka, a.s.',
  },
  {
    icon: <Landmark size={iconSize} />,
    title: 'BIC/SWIFT',
    text: 'FIOBCZPPXXX',
  },
  {
    icon: <CreditCard size={iconSize} />,
    title: 'IBAN',
    text: 'CZ95 2010 0000 0024 0040 7618',
  },
];

const BankInformations = ({ className }: Props) => {
  const location = useLocation();

  return (
    <div
      className={cn(
        'flex flex-col xl:mx-auto m-[4vw] max-w-[1140px] items-center justify-between',
        className
      )}
    >
      <div className={`pt-8 ${location.pathname === '/clenska-sekce' ? 'pb-8' : ''}`}>
        <TitleText className={className}>Bankovní spojení</TitleText>
      </div>
      <div
        className={cn(
          'flex flex-col lg:flex-row gap-16 lg:gap-4 px-4 justify-between items-center lg:items-start w-full',
          className
        )}
      >
        {staticData.map((data) => (
          <div className='flex flex-col gap-4 items-center justify-between basis-1/3'>
            <div className='flex flex-row gap-4 items-center justify-center'>
              {data.icon}
              <span className='font-body font-semibold'>{data.title}</span>
            </div>
            <span className='font-title text-center'>{data.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BankInformations;
