import { Request, Response } from "express";
import { sendError } from "../utils/sendError";
import jwt from "jsonwebtoken";

import {
  findAll,
  findBrands,
  findCategories,
} from "../services/productService";

type ProductQuery = {
  q: string;
  brand: string;
  category: string;
  priceFrom: string;
  priceTo: string;
  stock: "ALL" | "OUT_OF_STOCK" | "STOCK";
  rating: string;
};
export const getProducts = async (req: Request, res: Response) => {
  try {
    const query = req.query as ProductQuery;

    let userId: number | null = null;
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      userId = null;
    } else {
      const token = authHeader.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as {
        id: number;
      };
      userId = decoded.id;
    }

    const products = await findAll(query, userId);

    if (!products) {
      return sendError(res, 404, "Продукты не найдены");
    }

    res.status(200).json(products);
  } catch (error: any) {
    console.log(error);
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

export const getCategories = async (req: Request, res: Response) => {
  try {
    const brands = await findCategories();

    if (!brands) {
      return sendError(res, 404, "Категории не найдены");
    }

    res.status(200).json(brands);
  } catch (error: any) {
    sendError(res, 500, error.message || "Внутренняя ошибка сервера");
  }
};
