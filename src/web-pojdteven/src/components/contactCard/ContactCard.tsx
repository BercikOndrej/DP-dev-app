import { ContactInfo } from '@/client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import PersonInfo from './PersonInfo';

interface Props {
  person: ContactInfo | undefined | void;
}

const ContactCard = ({ person }: Props) => {
  return (
    <Card data-aos='fade-up'>
      <CardHeader>
        <CardTitle className='uppercase tracking-widest text-slate-950 dark:text-slate-50'>
          Kontaktní informace
        </CardTitle>
        <CardDescription>Kontaktní osoba</CardDescription>
      </CardHeader>
      <CardContent>
        <PersonInfo person={person} />
      </CardContent>
    </Card>
  );
};

export default ContactCard;
