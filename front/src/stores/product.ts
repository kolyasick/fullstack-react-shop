import { create } from "zustand";
import type { Product } from "../models/product/api";

type ProductStore = {
  products: Product[];

  setProducts: (products: Product[]) => void;
};

export const useProductStore = create<ProductStore>((set) => ({
  products: [],

  setProducts: (products) => set(() => ({ products })),
}));
