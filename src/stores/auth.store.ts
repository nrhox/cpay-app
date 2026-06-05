import { create } from "zustand";
import { users } from "../dummy/users";
import type { Role, User } from "../types";

interface AuthState {
  currentUser: User;
  login: (email: string) => void;
  logout: () => void;
  switchRole: (role: Role) => void;
}

const defaultUser = users[0];

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: defaultUser,
  login: (email) => {
    const user = users.find((item) => item.email === email) ?? defaultUser;
    set({ currentUser: user });
  },
  logout: () => set({ currentUser: defaultUser }),
  switchRole: (role) => {
    const user = users.find((item) => item.role === role) ?? defaultUser;
    set({ currentUser: user });
  },
}));

export const selectCurrentUser = (state: AuthState) => state.currentUser;
