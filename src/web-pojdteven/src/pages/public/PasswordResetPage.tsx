import PasswordResetForm from '@/components/login/PasswordResetForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useParams } from 'react-router-dom';

const PasswordResetPage = () => {
  const params = useParams<{ token?: string }>();
  const token = params.token;
  return (
    <div className='h-[80vh] w-auto flex flex-col m-auto items-center justify-center'>
      <Card className='mx-[10%] max-w-[400px]'>
        <CardHeader>
          <CardTitle>Resetování hesla</CardTitle>
          <CardDescription>
            Zadejte prosím Vaše nové heslo a následně jej potvrďte.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PasswordResetForm token={token ?? ''} />
        </CardContent>
      </Card>
    </div>
  );
};

export default PasswordResetPage;
