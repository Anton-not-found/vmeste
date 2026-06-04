export interface IRegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
  city?: string;
}


export const authApi = {
  register: async (data: IRegisterData) => {
    return fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  },

  login: async (email: string, password: string) => {
    return fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  },

  logout: async () => {
    return fetch("/api/auth/logout", { method: "POST" });
  },

  refresh: async () => {
    return fetch("/api/auth/refresh", { method: "POST" });
  },
};