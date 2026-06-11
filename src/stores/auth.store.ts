import { create } from "zustand";
import type { IUser } from "../types/user";

interface AuthState {
  currentUser: IUser | null;
  setUser: (user: IUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: null,
  setUser: (user: IUser) => {
    set({ currentUser: user });
  },
  logout: () => set({ currentUser: null }),
}));

export const selectCurrentUser = (state: AuthState) => state.currentUser;
