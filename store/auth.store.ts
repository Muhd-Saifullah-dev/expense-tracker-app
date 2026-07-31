import { create } from "zustand";

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;

  setAuthUser: (user: User) => void;
  clearAuth: () => void;

  setInitialized: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isInitialized: false,


  // Login / Signup ke baad
  setAuthUser: (user) =>
    set({
      user,
      isAuthenticated: true,
    }),


  // Logout ke baad
  clearAuth: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),


  // App start pe token check complete
  setInitialized: () =>
    set({
      isInitialized: true,
    }),
}));