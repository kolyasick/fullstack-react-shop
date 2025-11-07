import api from "../axios/config";
import { ACCESS_TOKEN_NAME } from "../constants/variables";
import type { Order, OrderRequest } from "../models/order/api";

export const createOrder = (data: OrderRequest) => {
  const token = localStorage.getItem(ACCESS_TOKEN_NAME);
  return api.post<Order>(
    "/order",
    {
      ...data,
    },
    {
      headers: {
        Authorization: token ? "Bearer " + token : undefined,
      },
    }
  );
};
