import { create } from "zustand";
import type { User } from "../models/user";

type UserStore = {
  user: User | null;
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
  setUser: (data: User | null) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoading: true,
  setIsLoading: (isLoading) => set(() => ({ isLoading })),

  setUser: (data) => set(() => ({ user: data })),
}));
