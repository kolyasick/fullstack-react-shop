import { Request, Response } from "express";
import { add, createCart, findCart, remove } from "../services/cartService";
import { sendError } from "../utils/sendError";

export const getCart = async (req: Request, res: Response) => {
  try {
    console.log(req.params);
    const { userId } = req.params as {
      userId: string;
    };
    const { initial } = req.query as { initial?: string };
    const cart = await findCart(userId, initial);

    if (!cart) {
      return sendError(res, 404, "Корзина не найдена");
    }

    res.status(200).json(cart);
  } catch (error: any) {
    console.log(error);
    sendError(res, 500, error.message || "Внутренняя ошибка сервера");
  }
};

export const addProductToCart = async (req: Request, res: Response) => {
  try {
    const { cartId } = req.params as {
      cartId: string;
    };
    const { productId } = req.body as { productId: number };

    const cartItem = await add(cartId, productId);

    if (!cartItem) {
      return sendError(res, 400, "Ошибка при добавлении товара в корзину");
    }

    res.status(200).json(cartItem);
  } catch (error: any) {
    console.log(error);
    sendError(res, 500, error.message || "Внутренняя ошибка сервера");
  }
};

export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const { cartId, productId } = req.params as {
      cartId: string;
      productId: string;
    };
    const { completely } = req.query as { completely: string };

    const cartItem = await remove(
      cartId,
      productId,
      Boolean(Number(completely))
    );

    if (!cartItem) {
      return sendError(res, 400, "Ошибка при удалении товара из корзины");
    }

    res.status(200).json(cartItem);
  } catch (error: any) {
    console.log(error);
    sendError(res, 500, error.message || "Внутренняя ошибка сервера");
  }
};
