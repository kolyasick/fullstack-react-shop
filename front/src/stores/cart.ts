import { create } from "zustand";
import type { Cart, CartProduct } from "../models/cart/api";
import { addProductToCart, removeProductFromCart } from "../api/cart";

type CartStore = {
  isOpen: boolean;
  cart: Cart | null;

  toggleCart: (val: boolean) => void;
  setCart: (cart: Cart | null) => void;

  addToCart: (productId: number) => Promise<CartProduct>;
  removeFromCart: (
    productId: number,
    completely: boolean
  ) => Promise<CartProduct>;
};

export const useCartStore = create<CartStore>((set, get) => ({
  isOpen: false,
  cart: null,

  toggleCart: (val) => set(() => ({ isOpen: val })),
  setCart: (cart) => set(() => ({ cart })),

  addToCart: async (productId) => {
    const { cart } = get();
    const { data } = await addProductToCart(cart!.id, productId);

    return data;
  },

  removeFromCart: async (productId, completely) => {
    const { cart } = get();

    const { data } = await removeProductFromCart(
      cart!.id,
      productId,
      completely
    );

    return data;
  },
}));
