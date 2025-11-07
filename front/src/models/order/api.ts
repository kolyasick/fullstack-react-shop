import type { Cart } from "../cart/api";
import type { User } from "../user/api";

export type Order = {
  id: string;
  updatedAt: Date;
  createdAt: Date;
  cartId: number;
  userId: number;
  username: string;
  email: string;
  comment: string | null;

  user?: User;
  cart?: Cart;
};

export type OrderRequest = Omit<
  Order,
  "createdAt" | "updatedAt" | "user" | "cart"
>;
