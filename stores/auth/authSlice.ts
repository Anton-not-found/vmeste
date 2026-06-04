import { IUser } from "@/shared/types/user.types";
import { StateCreator } from "zustand";
import { authApi, IRegisterData } from "./authApi";

// interface IRegisterData {
//   email: string;
//   password: string;
//   firstName: string;
//   lastName?: string;
//   city?: string;
// }

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

export const authSlice: StateCreator<
  { auth: TAuthSlice },
  [],
  [],
  { auth: TAuthSlice }
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
        const response = await authApi.register(data);
        const result = response.data; // axios автоматически парсит JSON

        // if (!response.ok) {
        //   set((state) => ({
        //     auth: {
        //       ...state.auth,
        //       error: result.error?.message || "Registration failed",
        //       isLoading: false,
        //     },
        //   }));
        //   return false;
        // }

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
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.error?.message ||
          "Network error. Please try again.";
        set((state) => ({
          auth: {
            ...state.auth,
            error: errorMessage,
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
        const response = await authApi.login(email, password);
        const result = await response.data;

        // if (!response.ok) {
        //   set((state) => ({
        //     auth: {
        //       ...state.auth,
        //       error: result.error?.message || "Login failed",
        //       isLoading: false,
        //     },
        //   }));
        //   return false;
        // }

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
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.error?.message ||
          "Network error. Please try again.";
        set((state) => ({
          auth: {
            ...state.auth,
            error: errorMessage,
            isLoading: false,
          },
        }));
        return false;
      }
    },

    logout: async () => {
      try {
        await authApi.logout();
      } catch (error) {
        console.error("Logout API error:", error);
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
        const response = await authApi.refresh();
        const result = await response.data();

        if (result.success && result.data?.accessToken) {
          set((state) => ({
            auth: {
              ...state.auth,
              accessToken: result.data.accessToken,
              user: result.data.user,
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
