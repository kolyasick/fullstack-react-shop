import api from "../axios/config";
import { ACCESS_TOKEN_NAME } from "../constants/variables";
import type { Brand, Category, ProductResponse } from "../models/product/api";

export function getProducts(queryString?: string) {
  const token = localStorage.getItem(ACCESS_TOKEN_NAME);

  return api.get<ProductResponse>(`/products${queryString}`, {
    headers: {
      Authorization: token ? "Bearer " + token : undefined,
    },
  });
}

export function getBrands() {
  return api.get<Brand[]>("/products/brands");
}

export function getCategories() {
  return api.get<Category[]>("/products/categories");
}
