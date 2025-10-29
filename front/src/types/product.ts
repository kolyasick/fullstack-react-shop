export type Brand = {
  id: number;
  title: string;
};

export type Category = {
  id: number;
  title: string;
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
};
