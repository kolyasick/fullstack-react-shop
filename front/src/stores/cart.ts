import { create } from "zustand";
import type { Cart } from "../models/cart/api";
import { addProductToCart, getCart, removeProductFromCart } from "../api/cart";

type CartStore = {
  isOpen: boolean;
  cart: Cart | null;

  toggleCart: (val: boolean) => void;
  fetchCart: (userId: string, inital: boolean) => Promise<void>;
  setCart: (cart: Cart | null) => void;

  addToCart: (productId: number) => Promise<void>;
  removeFromCart: (productId: number, completely: boolean) => Promise<void>;
};

export const useCartStore = create<CartStore>((set, get) => ({
  isOpen: false,
  cart: null,

  toggleCart: (val) => set(() => ({ isOpen: val })),
  setCart: (cart) => set(() => ({ cart })),

  fetchCart: async (userId, inital) => {
    const { data: cart } = await getCart(userId, inital);
    set(() => ({ cart }));
  },

  addToCart: async (productId) => {
    const { cart } = get();
    if (!cart) return;
    const { data } = await addProductToCart(cart.id, productId);
    set((state) => {
      if (!state.cart) return state;

      return {
        cart: {
          ...state.cart,
          length: state.cart.length + 1,
          amount: state.cart.amount + data.product.price,
          items: state.cart.items?.map((p) =>
            p.productId === productId ? { ...p, qty: p.qty + 1 } : p
          ),
        },
      };
    });
  },

  removeFromCart: async (productId, completely) => {
    const { cart } = get();
    if (!cart) return;

    const { data } = await removeProductFromCart(
      cart.id,
      productId,
      completely
    );

    set((state) => {
      if (!state.cart) return state;

      if (completely) {
        const itemToRemove = state.cart.items?.find(
          (item) => item.productId === productId
        );
        const itemsAfterRemoval =
          state.cart.items?.filter((item) => item.productId !== productId) ||
          [];

        return {
          cart: {
            ...state.cart,
            length: Math.max(
              0,
              (state.cart.length || 0) - (itemToRemove?.qty || 1)
            ),
            amount: Math.max(0, cart.amount - data.qty * data.product.price),
            items: itemsAfterRemoval,
          },
        };
      } else {
        return {
          cart: {
            ...state.cart,
            length: state.cart.length - 1,
            amount: Math.max(0, cart.amount - data.product.price),
            items: state.cart.items
              ?.map((p) =>
                p.productId === productId ? { ...p, qty: p.qty - 1 } : p
              )
              .filter((c) => c.qty > 0),
          },
        };
      }
    });
  },
}));
