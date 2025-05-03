import Navbar from '@/components/navMenu/Navbar';
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';
import Footer from './Footer';
import { Button } from '@/components/ui/button';
import { ERROR_MESSAGES } from '@/utils/constants';
import useAOS from '@/hooks/useAOS';
import useNavbarShrinks from '@/hooks/useNavbarShrinks';

interface Props {
  errorMessage?: string;
}

const ErrorPage = ({ errorMessage }: Props) => {
  useAOS();
  useNavbarShrinks();

  const error = useRouteError();
  const isRouteError = isRouteErrorResponse(error);
  return (
    <div className='h-screen flex flex-col justify-between'>
      <Navbar />
      <div
        className='p-4 items-center flex flex-col gap-8 text-center font-bold text-2xl font-body'
        data-aos='fade-up'
      >
        <h2 className='text-red-500 text-8xl font-title'>Oops!</h2>
        {isRouteError && <p>{ERROR_MESSAGES[error.status]}</p>}
        {isRouteError && <p>Kód chyby: {error.status}</p>}
        {errorMessage && <p>{errorMessage}</p>}
        {!isRouteError && !errorMessage && (
          <p>Objevila se neočekáváná chyba při vykreslování stránky.</p>
        )}
        <Button className='w-max mx-auto'>
          <Link to='/'>Zpět Domů</Link>
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default ErrorPage;
