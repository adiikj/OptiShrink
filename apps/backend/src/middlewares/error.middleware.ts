import type { ErrorRequestHandler, RequestHandler } from "express";
import multer from "multer";
import { ZodError } from "zod";
import { isProduction } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";

export const notFoundHandler: RequestHandler = (req, res) => {
  res.status(404).json({
    success: false,
    status: 404,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

export const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  if (res.headersSent) {
    next(error);
    return;
  }

  if (error instanceof ApiError) {
    res.status(error.statusCode).json({
      success: false,
      status: error.statusCode,
      message: error.message,
      errors: error.errors.length > 0 ? error.errors : undefined,
    });
    return;
  }

  if (error instanceof ZodError) {
    res.status(422).json({
      success: false,
      status: 422,
      message: "Please check the highlighted fields.",
      errors: error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
    return;
  }

  if (error instanceof multer.MulterError) {
    const message =
      error.code === "LIMIT_FILE_SIZE"
        ? "Each file must be 20 MB or smaller."
        : error.code === "LIMIT_FILE_COUNT" || error.code === "LIMIT_UNEXPECTED_FILE"
          ? "Too many files were uploaded."
          : "The upload could not be processed.";
    res.status(400).json({ success: false, status: 400, message });
    return;
  }

  if (!isProduction) {
    console.error(error);
  }

  res.status(500).json({
    success: false,
    status: 500,
    message: "Something went wrong on our side. Please try again.",
  });
};
