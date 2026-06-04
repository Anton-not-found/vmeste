import { apiClient } from "@/lib";

export interface IRegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
  city?: string;
}

export const authApi = {
  register: async (data: IRegisterData) => {
    return apiClient.post("/api/auth/register", data);
  },

  login: async (email: string, password: string) => {
    return apiClient.post("/api/auth/login", { email, password });
  },

  logout: async () => {
    return apiClient.post("/api/auth/logout");
  },

  refresh: async () => {
    return apiClient.post("/api/auth/refresh");
  },
};
