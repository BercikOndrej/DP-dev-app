import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FaUser } from 'react-icons/fa';
import LoginForm from './LoginForm';
import { useState } from 'react';
import PasswordForgottenForm from './PasswordForgottenForm';

const LoginDialog = () => {
  const [open, setOpen] = useState(false);
  const [isPasswordForgotten, setIsPasswordForgotten] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open);
        setIsPasswordForgotten(false);
      }}
    >
      <DialogTrigger asChild>
        <Button variant='outline' className='p-2 sm:p-4'>
          <FaUser />
          <div className='hidden sm:block'>Přihlásit se</div>
        </Button>
      </DialogTrigger>

      {!isPasswordForgotten ? (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Příhlášení</DialogTitle>
            <DialogDescription>
              Přihlašte se do svého profilu pomocí svého emailu a hesla
            </DialogDescription>
          </DialogHeader>
          <LoginForm />
          <DialogFooter className='text-sm'>
            <div>
              Zapomenuté heslo?{' '}
              <span
                onClick={() => setIsPasswordForgotten(true)}
                className='cursor-pointer text-green-500 dark:text-green-500'
              >
                Chci ho resetovat.
              </span>
            </div>
          </DialogFooter>
        </DialogContent>
      ) : (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Zapomněl jsem heslo</DialogTitle>
            <DialogDescription>
              Zadejte svou e-mailovou adresu použitou při registraci. Zašleme
              vám na ni pokyny ke změně hesla.
            </DialogDescription>
          </DialogHeader>
          <PasswordForgottenForm
            setOpen={setOpen}
            setIsPasswordForgotten={setIsPasswordForgotten}
          />
        </DialogContent>
      )}
    </Dialog>
  );
};

export default LoginDialog;
