import type { Response } from "express";

export const sendError = (res: Response, statusCode: number, message: string) => {
  res.status(statusCode).json({
    error: {
      code: statusCode,
      message,
    },
  });
};
