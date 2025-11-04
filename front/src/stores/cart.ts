import { create } from "zustand";
import type { Cart, CartProduct } from "../models/cart/api";
import { getCart } from "../api/cart";

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
    const { data: cart } = await getCart(userId);
    set(() => ({ cart }));
  },
}));
