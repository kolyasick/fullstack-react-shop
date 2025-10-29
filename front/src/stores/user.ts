import { create } from "zustand";
import type { User } from "../types/user";

type UserStore = {
  user: User | null;
  setUser: (data: User | null) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,

  setUser: (data) => set(() => ({ user: data })),
}));
