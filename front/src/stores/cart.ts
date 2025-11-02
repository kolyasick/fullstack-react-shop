import { create } from "zustand";
import type { Cart, CartProduct } from "../types/cart";
import api from "../axios/config";
import { ACCESS_TOKEN_NAME } from "../constants/app";

type CartStore = {
  isOpen: boolean;
  cart: Cart | null;

  toggleCart: (val: boolean) => void;
  setCart: (cart: Cart | null) => void;
  setCartItems: (cartItems: CartProduct[]) => void;
  fetchCart: (userId: number) => Promise<void>;
};

export const useCartStore = create<CartStore>((set) => ({
  isOpen: false,
  cart: null,

  toggleCart: (val) => set(() => ({ isOpen: val })),
  setCart: (cart) => set(() => ({ cart })),
  setCartItems: (cartItems) =>
    set((state) => ({
      cart: state.cart ? { ...state.cart, items: cartItems } : null,
    })),
  
  fetchCart: async (userId) => {
    const token = localStorage.getItem(ACCESS_TOKEN_NAME);
    const { data: cart } = await api.get(`/cart/${userId}`, {
      headers: {
        Authorization: token ? "Bearer " + token : undefined,
      },
    });
    set(() => ({ cart }));
  },
}));
