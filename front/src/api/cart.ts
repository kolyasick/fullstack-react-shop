import api from "../axios/config";
import { ACCESS_TOKEN_NAME } from "../constants/variables";
import type { Cart } from "../models/cart/api";

export function getCart(userId: number) {
  const token = localStorage.getItem(ACCESS_TOKEN_NAME);
  return api.get<Cart>(`/cart/${userId}`, {
    headers: {
      Authorization: token ? "Bearer " + token : undefined,
    },
  });
}

export function initalizeCart() {
  const token = localStorage.getItem(ACCESS_TOKEN_NAME);

  return api.post<Cart>("/cart/initalize", {
    headers: {
      Authorization: token ? "Bearer " + token : undefined,
    },
  });
}
