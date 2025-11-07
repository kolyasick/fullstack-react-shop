import { Request, Response } from "express";
import { sendError } from "../utils/sendError";
import { create } from "../services/orderService";
import { Order } from "@prisma/client";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const body = req.body as Omit<Order, "createdAt" | "updatedAt">;

    const order = await create(body);
    if (!order) {
      return sendError(res, 400, "Ошибка при создании заказа");
    }

    res.status(200).json(order);
  } catch (error: any) {
    console.log(error);
    sendError(res, 500, error.message || "Внутренняя ошибка сервера");
  }
};
