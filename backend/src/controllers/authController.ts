import { Request, Response } from "express";
import { registerUser, loginUser, refreshTokens, logoutUser } from "../services/authService";
import { sendError } from "../utils/sendError";
import { registerValidationSchema } from "../validation/authValidation";

export const register = async (req: Request, res: Response) => {
  try {
    const { error, value } = registerValidationSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return sendError(res, 400, errors.join(", "));
    }

    const { username, email, password } = value;

    const result = await registerUser({ username, email, password }, res);

    res.status(201).json({
      message: "Пользователь успешно зарегистрирован",
      user: result.user,
      accessToken: result.accessToken,
    });
  } catch (error: any) {
    const statusCode = error.status || 500;
    const message = error.message || "Внутренняя ошибка сервера";

    sendError(res, statusCode, message);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, 400, "Email и пароль обязательны");
    }

    const result = await loginUser({ email, password }, res);

    res.status(200).json({
      message: "Успешный вход",
      user: result.user,
      accessToken: result.accessToken,
    });
  } catch (error: any) {
    const statusCode = error.status || 500;
    const message = error.message || "Внутренняя ошибка сервера";

    sendError(res, statusCode, message);
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return sendError(res, 400, "Refresh токен отсутствует в cookie");
    }

    const result = await refreshTokens(refreshToken, res);

    res.status(200).json({
      user: result.user,
      accessToken: result.accessToken,
    });
  } catch (error: any) {
    const statusCode = error.status || 500;
    const message = error.message || "Внутренняя ошибка сервера";

    sendError(res, statusCode, message);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return sendError(res, 400, "Refresh токен отсутствует в cookie");
    }

    await logoutUser(refreshToken);

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      message: "Выход успешен",
    });
  } catch (error: any) {
    const statusCode = error.status || 500;
    const message = error.message || "Внутренняя ошибка сервера";

    sendError(res, statusCode, message);
  }
};
