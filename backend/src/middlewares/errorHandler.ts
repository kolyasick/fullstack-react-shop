import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log("Global error handler caught:", err.message);

  res.status(err.status || 500).json({
    error: {
      code: err.status || 500,
      message: err.message || "Внутренняя ошибка сервера",
    },
  });
};
