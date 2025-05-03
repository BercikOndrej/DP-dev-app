import {
  authControllerForgotPassword,
  authControllerResetPassword,
  userControllerLogin,
} from '@/client';
import { isAxiosError } from 'axios';

class AuthService {
  async login(email: string, password: string): Promise<string> {
    try {
      const response = await userControllerLogin({
        body: {
          email: email,
          password: password,
        },
      });
      if (isAxiosError(response)) {
        if ((response.error as any).error) {
          throw new Error((response.error as any).error.message);
        }
        throw new Error('Connection error - nelze se připojit k serveru.');
      }
      if (!response.data.token) {
        throw new Error('Chyba - neobdržena žádná odpověď.');
      }
      return response.data?.token;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Neočekávaná chyba.');
    }
  }

  async sendForgotPasswordRequest(email: string): Promise<{ error?: string }> {
    try {
      const { error } = await authControllerForgotPassword({
        body: {
          email: email,
        },
      });
      if (error) {
        return { error: (error as any).error.message };
      }
      return { error: undefined };
    } catch (error: any) {
      if (error.response && error.response.data.error) {
        return { error: error.response.data.error.message };
      }
      return { error: `Chyba připojení - nelze se připojit k serveru: ${error.message ?? 'Neočekávaný error'}.` };
    }
  }

  async sendResetPasswordRequest(
    password: string,
    token: string
  ): Promise<{ error?: string }> {
    try {
      const { error } = await authControllerResetPassword({
        path: {
          token: token,
        },
        body: {
          password: password,
        },
      });
      if (error) {
        return { error: (error as any).error.message };
      }
      return {};
    } catch (error: any) {
      if (error.response && error.response.data.error) {
        return { error: error.response.data.error.message };
      }
      return { error: `Chyba při zasílání žádosti o resetování hesla: ${error.message}.` };
    }
  }
}

export default new AuthService();
