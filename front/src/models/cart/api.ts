import type { Product } from "../product/api";

export type Cart = {
  id: number;
  amount: number;
  userId: number;

  length: number;
  items: CartProduct[];
};

export type CartProduct = {
  id: number;
  qty: number;
  productId: number;
  cartId: number;

  updatedAt: Date;
  createdAt: Date;

  product: Product;
};
