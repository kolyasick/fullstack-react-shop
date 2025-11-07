import { Order } from "@prisma/client";
import prisma from "../lib/prisma";

type OrderRequest = Omit<Order, "createdAt" | "updatedAt">;

export const create = async (data: OrderRequest) => {
  const order = await prisma.order.create({
    data: {
      id: data.id,
      email: data.email,
      username: data.username,
      cartId: data.cartId,
      userId: data.userId,
      comment: data.comment,
    },
  });

  return order;
};
