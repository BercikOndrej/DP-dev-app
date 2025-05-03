import passwdGenerator from 'generate-password-browser';
import {z} from 'zod';

const generatePassword = (): string => {
  let passwd: string;
  do {
     passwd = passwdGenerator.generate({
      numbers: true,
      uppercase: true,
      lowercase: true,
      length: 10,
    });
  } while (!validatePassword(passwd));
  return passwd;
}

function validatePassword(password: string): boolean {
  const schema = z
    .string()
    .min(8, {message: 'Heslo musí obsahovat minimálně 8 znaků.'})
    .max(15, {message: 'Heslo může obsahovat maximálně 15 znaků.'})
    .regex(/^(?=.*[A-Z])(?=.*\d).{8,}$/, {
      message:
        'Heslo musí obsahovat alespoň jedno velké písmeno a alespoň jednu číslici.',
    });
  const {error} = schema.safeParse(password);
  return !error;
}

export default generatePassword;
