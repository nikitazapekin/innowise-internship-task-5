import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  login: string;
  password: string;
  isAuthenticated: boolean;
  setCredentials: (login: string, password: string) => void;
  clearCredentials: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      login: "",
      password: "",
      isAuthenticated: false,

      setCredentials: (login: string, password: string) =>
        set({ login, password, isAuthenticated: true }),

      clearCredentials: () => set({ login: "", password: "", isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
