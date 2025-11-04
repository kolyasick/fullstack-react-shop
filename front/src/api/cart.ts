import api from "../axios/config";
import { ACCESS_TOKEN_NAME } from "../constants/variables";
import type { Cart, CartProduct } from "../models/cart/api";

export function getCart(userUuid: string, initial: boolean) {
  const token = localStorage.getItem(ACCESS_TOKEN_NAME);
  return api.get<Cart>(`/cart/${userUuid}?initial=${initial ? 1 : 0}`, {
    headers: {
      Authorization: token ? "Bearer " + token : undefined,
    },
  });
}

export function addProductToCart(cartId: number, productId: number) {
  const token = localStorage.getItem(ACCESS_TOKEN_NAME);
  return api.post<CartProduct>(
    `/cart/${cartId}/products/add`,
    {
      productId,
    },
    {
      headers: {
        Authorization: token ? "Bearer " + token : undefined,
      },
    }
  );
}

export function removeProductFromCart(
  cartId: number,
  productId: number,
  completely: boolean
) {
  const token = localStorage.getItem(ACCESS_TOKEN_NAME);
  return api.delete<CartProduct>(
    `/cart/${cartId}/products/${productId}/remove${
      completely ? "?completely=1" : ""
    }`,
    {
      headers: {
        Authorization: token ? "Bearer " + token : undefined,
      },
    }
  );
}
