import { randomUUID } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import multer, { type FileFilterCallback } from "multer";
import type { Request } from "express";
import { ApiError } from "../utils/ApiError.js";

export const MAX_UPLOAD_BYTES = 20 * 1024 * 1024;

const uploadDir = path.join(process.cwd(), "public", "temp");
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${randomUUID()}${extension}`);
  },
});

const imageMimeTypes: Record<string, true> = {
  "image/jpeg": true,
  "image/png": true,
  "image/webp": true,
  "image/gif": true,
};

function imageFilter(_req: Request, file: Express.Multer.File, cb: FileFilterCallback): void {
  if (!imageMimeTypes[file.mimetype]) {
    cb(new ApiError(415, "Only JPG, PNG, WebP, and GIF images are supported."));
    return;
  }
  cb(null, true);
}

function pdfFilter(_req: Request, file: Express.Multer.File, cb: FileFilterCallback): void {
  if (file.mimetype !== "application/pdf") {
    cb(new ApiError(415, "Only PDF files are supported."));
    return;
  }
  cb(null, true);
}

export const imageUpload = multer({
  storage,
  fileFilter: imageFilter,
  limits: { fileSize: MAX_UPLOAD_BYTES, files: 20 },
});

export const pdfUpload = multer({
  storage,
  fileFilter: pdfFilter,
  limits: { fileSize: MAX_UPLOAD_BYTES, files: 1 },
});
