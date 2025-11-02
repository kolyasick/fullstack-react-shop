import { Request, Response } from "express";
import { createCart, findCart } from "../services/cartService";
import { sendError } from "../utils/sendError";

export const getCart = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params as { userId: string };
    const cartProducts = await findCart(userId);

    if (!cartProducts) {
      return sendError(res, 404, "Продукты в корзине не найдены");
    }

    res.status(200).json(cartProducts);
  } catch (error: any) {
    console.log(error);
    sendError(res, 500, error.message || "Внутренняя ошибка сервера");
  }
};

export const initializeCart = async (req: Request, res: Response) => {
  try {
    const cart = await createCart(req.userId!);

    if (!cart) {
      return sendError(res, 400, "Ошибка при создании корзины");
    }

    res.status(200).json(cart);
  } catch (error: any) {
    console.log(error);
    sendError(res, 500, error.message || "Внутренняя ошибка сервера");
  }
};
