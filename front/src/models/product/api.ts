import type { Paggination } from "../../types/paggination";

export type Brand = {
  id: number;
  title: string;
};

export type Category = {
  id: number;
  title: string;
};

export type Review = {
  id: number;
  rate: number;
  text: string;
  updatedAt: Date;
  createdAt: Date;
  userId: number;
  productId: number;
};

export type Product = {
  id: number;
  uuid: string;
  title: string;
  price: number;
  rating: number;
  description: string;
  imageUrl: string;
  inStock: boolean;
  features: string;
  brandId: number;
  categoryId: number;

  brand?: Brand;
  category?: Category;
  reviewsCount: number;
  qtyInCart: number;
};

export type ProductWithReview = Omit<Product, "reviewsCount"> & {
  reviews: Review[];
};

export type ProductResponse = Paggination & { products: Product[] };
