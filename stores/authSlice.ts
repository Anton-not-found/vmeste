// stores/authSlice.ts
import { IUser } from "@/shared/types/user.types";
import { StateCreator } from "zustand";



 interface IRegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
  city?: string;
}

export interface IAuthState {
  user: IUser | null;
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface IAuthActions {
  register: (data: IRegisterData) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  setAccessToken: (token: string) => void;
  clearError: () => void;
  checkAuth: () => Promise<boolean>;
}

export type TAuthSlice = IAuthState & IAuthActions;

const initialState: IAuthState = {
  user: null,
  accessToken: null,
  isLoading: false,
  error: null,
};

export const createAuthSlice: StateCreator<
  { auth: TAuthSlice }, // тип всего стора
  [],
  [],
  { auth: TAuthSlice } // что возвращаем
> = (set, get) => ({
  auth: {
    ...initialState,

    register: async (data: IRegisterData) => {
      set((state) => ({
        auth: {
          ...state.auth,
          isLoading: true,
          error: null,
        },
      }));

      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
          set((state) => ({
            auth: {
              ...state.auth,
              error: result.error?.message || 'Registration failed',
              isLoading: false,
            },
          }));
          return false;
        }

        if (result.success && result.data) {
          set((state) => ({
            auth: {
              ...state.auth,
              user: result.data.user,
              accessToken: result.data.accessToken,
              isLoading: false,
            },
          }));
          return true;
        }

        set((state) => ({
          auth: {
            ...state.auth,
            isLoading: false,
          },
        }));
        return false;
      } catch (error) {
        set((state) => ({
          auth: {
            ...state.auth,
            error: 'Network error. Please try again.',
            isLoading: false,
          },
        }));
        return false;
      }
    },

    login: async (email: string, password: string) => {
      set((state) => ({
        auth: {
          ...state.auth,
          isLoading: true,
          error: null,
        },
      }));

      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const result = await response.json();

        if (!response.ok) {
          set((state) => ({
            auth: {
              ...state.auth,
              error: result.error?.message || 'Login failed',
              isLoading: false,
            },
          }));
          return false;
        }

        if (result.success && result.data) {
          set((state) => ({
            auth: {
              ...state.auth,
              user: result.data.user,
              accessToken: result.data.accessToken,
              isLoading: false,
            },
          }));
          return true;
        }

        set((state) => ({
          auth: {
            ...state.auth,
            isLoading: false,
          },
        }));
        return false;
      } catch (error) {
        set((state) => ({
          auth: {
            ...state.auth,
            error: 'Network error. Please try again.',
            isLoading: false,
          },
        }));
        return false;
      }
    },

    logout: async () => {
      try {
        await fetch('/api/auth/logout', { method: 'POST' });
      } catch (error) {
        console.error('Logout API error:', error);
      }
      set((state) => ({
        auth: {
          ...state.auth,
          user: null,
          accessToken: null,
          error: null,
        },
      }));
    },

    setAccessToken: (token: string) => {
      set((state) => ({
        auth: {
          ...state.auth,
          accessToken: token,
        },
      }));
    },

    clearError: () => {
      set((state) => ({
        auth: {
          ...state.auth,
          error: null,
        },
      }));
    },

    checkAuth: async () => {
      try {
        const response = await fetch('/api/auth/refresh', { method: 'POST' });
        const result = await response.json();

        if (result.success && result.data?.accessToken) {
          set((state) => ({
            auth: {
              ...state.auth,
              accessToken: result.data.accessToken,
            },
          }));
          return true;
        }
        return false;
      } catch {
        return false;
      }
    },
  },
});