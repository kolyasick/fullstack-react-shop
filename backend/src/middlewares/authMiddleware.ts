import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";
import { sendError } from "../utils/sendError";

const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET!;

declare module "express" {
  interface Request {
    userId?: string;
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return sendError(res, 401, "Токен отсутствует или некорректен");
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as { id: number };

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return sendError(res, 401, "Пользователь не найден");
    }

    req.userId = decoded.id.toString();

    next();
  } catch (error: any) {
    if (error.name === "JsonWebTokenError") {
      return sendError(res, 401, "Неверный токен");
    }

    if (error.name === "TokenExpiredError") {
      return sendError(res, 401, "Токен истек");
    }

    return sendError(res, 500, "Внутренняя ошибка сервера");
  }
};
