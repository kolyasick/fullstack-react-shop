import { Request, Response } from "express";
import { sendError } from "../utils/sendError";
import { findAll, findBrands } from "../services/productService";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await findAll();

    if (!products) {
      return sendError(res, 404, "Продукты не найдены");
    }

    res.status(200).json(products);
  } catch (error: any) {
    sendError(res, 500, error.message || "Внутренняя ошибка сервера");
  }
};

export const getBrands = async (req: Request, res: Response) => {
  try {
    const brands = await findBrands();

    if (!brands) {
      return sendError(res, 404, "Бренды не найдены");
    }

    res.status(200).json(brands);
  } catch (error: any) {
    sendError(res, 500, error.message || "Внутренняя ошибка сервера");
  }
};
