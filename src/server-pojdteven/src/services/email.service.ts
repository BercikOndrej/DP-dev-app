import { BindingScope, injectable } from '@loopback/core';
import { HttpErrors } from '@loopback/rest';
import config from 'config';
import { Dayjs } from 'dayjs';
import sgMail from '@sendgrid/mail';
import getNewUserHtmlEmail from '../utils/getNewUserHtmlEmail';
import getTeacherChangeInfoHtmlEmail from '../utils/getTeacherChangeInfoHtmlEmail';
import getResetPasswordHtmlEmail from '../utils/getPasswordHtmlEmail';

sgMail.setApiKey(config.get('email.sendGrid_api_key') as string);
const emailUser = config.get('email.user') as string;

@injectable({ scope: BindingScope.TRANSIENT })
export class EmailService {
  constructor() {}

  async sendEmailForPasswordReset(email: string, token: string) {
    try {
      const msg = {
        to: email,
        from: emailUser,
        subject: 'Resetování hesla - Lesní dětský klub pojďte ven',
        text: 'Resetování hesla\n\nDobrý den,\nTento email byl zaslán na základě Vaší žádosti o resetování hesla.\n\nResetovat heslo\n\nPokud jste nežádal/a o resetování hesla, doporučujeme vám zkontrolovat Váš účet.\nVáš tým Lesního dětského klubu Pojďte ven',
        html: getResetPasswordHtmlEmail(token),
      };
      await sgMail.send(msg);
      console.info(`Message to ${email} was succefuly sent!`);
    } catch (error) {
      console.log(error);
      throw HttpErrors.InternalServerError('Zaslání emailu bylo neúspěšné.');
    }
  }

  async sendGeneratedPasswordToNewUser(email: string, password: string) {
    try {
      const msg = {
        to: email,
        from: emailUser,
        subject: 'Registrace - Lesní dětský klub pojďte ven',
        text: 'Registrace nového uživatele\n\nDobrý den,\nTento email Vám byl zaslán na základě nové registrace uživatele.\n\nVaše nové přihlašovací údaje:\n\nEmail: ...\nHeslo: ...\n\nHeslo si můžete po přihlášení samozřejmě změnit dle Vaší libosti.\n\nVáš tým Lesního dětského klubu Pojďte ven',
        html: getNewUserHtmlEmail(email, password),
      };
      await sgMail.send(msg);
      console.info(`Message to ${email} was succefuly sent!`);
    } catch (error) {
      console.log(error);
      throw HttpErrors.InternalServerError(
        'Zaslání emailu novému uživately bylo neúspěšné.',
      );
    }
  }

  async sendEmailOfAttendanceChangeToUsers(
    userEmails: string[],
    originTeacher: string,
    nextTeacher: string,
    date: Dayjs,
  ) {
    if (!userEmails || userEmails.length < 1) {
      return;
    }
    const datum = date.format('D. M. YYYY');
    try {
      const msg = {
        to: userEmails,
        from: emailUser,
        subject: 'Změna průvodce',
        text: `Hlásíme změnu průvodce!\n\nDobrý den,\nTento email Vám byl zaslán za účelem oznámení, že naposlední chvíli měníme obsazení průvodců na den ${datum}\n\nPůvodní průvodce: ${originTeacher}\n\nNový průvodce: ${nextTeacher}\n\n
        Váš tým Lesního dětského klubu Pojďte ven`,
        html: getTeacherChangeInfoHtmlEmail(originTeacher, nextTeacher, date),
      };
      await sgMail.send(msg);
      console.info(`Messages to ${userEmails} was succefuly sent!`);
    } catch (error) {
      console.log(error);
      throw HttpErrors.InternalServerError(
        'Zaslání emailu uživatelům daného dne nebylo úspěšné.',
      );
    }
  }
}
