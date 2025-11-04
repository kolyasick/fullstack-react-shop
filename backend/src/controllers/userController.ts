import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { sendError } from "../utils/sendError";

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.userId);

    if (!userId) {
      return sendError(res, 401, "Требуется авторизация");
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        uuid: true,
        username: true,
        email: true,
        createdAt: true,
      },
    });

    if (!user) {
      return sendError(res, 404, "Пользователь не найден");
    }

    res.status(200).json(user);
  } catch (error: any) {
    sendError(res, 500, error.message || "Внутренняя ошибка сервера");
  }
};
