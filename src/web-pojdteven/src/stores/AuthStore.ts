import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { jwtDecode } from 'jwt-decode';
import authService from '@/services/AuthService';

interface UserProfile {
  id: string;
  email: string;
  role: string;
  fullName: string;
}

interface AuthResponse {
  success: boolean;
  error?: Error;
}

interface AuthStore {
  token?: string | null;
  user?: UserProfile | null;
  login: (email: string, password: string) => Promise<AuthResponse>;
  logout: () => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: undefined,
      user: undefined,
      login: async (email, password): Promise<AuthResponse> => {
        try {
          const token = await authService.login(email, password);
          const user = jwtDecode<UserProfile>(token);
          set((store) => ({ ...store, token: token, user: user }));
          return { success: true };
        } catch (error: any) {
          set((store) => ({ ...store, token: null, user: null }));
          return { success: false, error: error as Error };
        }
      },
      logout: () => set((store) => ({ ...store, token: null, user: null })),
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;
