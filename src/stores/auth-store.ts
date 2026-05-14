import { create } from "zustand";

interface AuthStore {
  isAuthenticated: boolean;
  userId: string | null;
  role: "member" | "admin" | "super_admin" | null;
  setAuth: (userId: string, role: "member" | "admin" | "super_admin") => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  userId: null,
  role: null,
  setAuth: (userId, role) => set({ isAuthenticated: true, userId, role }),
  clearAuth: () => set({ isAuthenticated: false, userId: null, role: null }),
}));
