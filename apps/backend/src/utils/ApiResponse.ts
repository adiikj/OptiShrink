import type { Response } from "express";

export function sendSuccess<T>(
  res: Response,
  status: number,
  data: T,
  message = "Success",
): Response {
  return res.status(status).json({
    success: true,
    status,
    message,
    data,
  });
}
