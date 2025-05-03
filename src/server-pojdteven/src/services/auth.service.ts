import {UserServiceBindings} from '@loopback/authentication-jwt';
import {BindingScope, inject, injectable, service} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import crypto from 'crypto';
import dayjs from 'dayjs';
import locale from 'dayjs/locale/cs';
import isTodayPlugin from 'dayjs/plugin/isToday';
import objectPlugin from 'dayjs/plugin/toObject';
import weekdayPlugin from 'dayjs/plugin/weekday';
import {EmailService} from './email.service';
import {MyUserService} from './my-user.service';

dayjs.extend(weekdayPlugin);
dayjs.extend(objectPlugin);
dayjs.extend(isTodayPlugin);

@injectable({scope: BindingScope.TRANSIENT})
export class AuthService {
  constructor(
    // @repository(UserRepository) private userRepo: UserRepository,
    @inject(UserServiceBindings.USER_SERVICE)
    private userService: MyUserService,
    @service(EmailService) private emailService: EmailService,
  ) {}

  async fotgotPassword(email: string): Promise<void> {
    const user = await this.userService.findUser({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw HttpErrors.BadRequest(
        'Uživatel s toutu emailovou adresou nebyl nalezen.',
      );
    }

    // Crete random string
    const randomToken = crypto.randomBytes(256).toString('hex');

    const now = dayjs().locale({
      ...locale,
    });

    user.dateOfLastResetPasswordRequest = now.toDate();
    user.resetPasswordToken = randomToken;

    await this.userService.updateUserWithoutValidation(user.id, user);

    await this.emailService.sendEmailForPasswordReset(email, randomToken);
  }

  async resetPassword(token: string, password: string) {
    this.userService.validatePassword(password);
    const user = await this.userService.findUser({
      where: {
        resetPasswordToken: token,
      },
    });
    if (!user) {
      throw HttpErrors.NotFound(
        'Žádný uživatel pod tímto resetovacím tokenem nebyl nalezen.',
      );
    }

    if (user.resetPasswordToken !== token) {
      throw HttpErrors.BadRequest('Resetovací token není validní.');
    }

    const now = dayjs().locale({
      ...locale,
    });
    const userDate = dayjs(user.dateOfLastResetPasswordRequest);
    const dif = userDate.diff(now, 'minute');

    if (Math.abs(dif) > 10) {
      throw HttpErrors.BadRequest(
        'Platnost resetovacího linku vypršela (10 min).',
      );
    }
    await this.userService.savedNewPassword(user.id, password);

    user.resetPasswordToken = null;
    user.dateOfLastResetPasswordRequest = null;
    await this.userService.updateUserWithoutValidation(user.id, user);
  }
}
