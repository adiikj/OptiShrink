import type { Request, Response } from "express";
import { z } from "zod";
import { db } from "../db/index.js";
import { compressedFiles, type CompressedFile, type FileKind } from "../db/schema.js";
import {
  compressImage,
  compressPdf,
  removeTempFile,
  type CompressionResult,
} from "../services/compression.service.js";
import { ApiError } from "../utils/ApiError.js";
import { sendSuccess } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { serializeFile, type PublicFile } from "../utils/serialize.js";

const levelSchema = z.enum(["low", "medium", "high"]);
const MAX_BATCH = 20;

function readLevel(req: Request): z.infer<typeof levelSchema> {
  return levelSchema.parse(req.body.compressionLevel ?? req.body.level ?? "medium");
}

function uploadedFiles(req: Request): Express.Multer.File[] {
  if (Array.isArray(req.files)) return req.files;
  if (req.files && typeof req.files === "object") {
    return Object.values(req.files).flat();
  }
  return req.file ? [req.file] : [];
}

async function saveFile(
  userId: string | undefined,
  kind: FileKind,
  fileName: string,
  result: { url: string; originalBytes: number; compressedBytes: number; pageCount?: number },
): Promise<PublicFile> {
  if (!userId) {
    return {
      id: null,
      kind,
      fileName,
      url: result.url,
      originalBytes: result.originalBytes,
      compressedBytes: result.compressedBytes,
      pageCount: result.pageCount ?? null,
      createdAt: new Date().toISOString(),
    };
  }

  const [row] = await db
    .insert(compressedFiles)
    .values({
      userId,
      kind,
      fileName,
      url: result.url,
      originalBytes: result.originalBytes,
      compressedBytes: result.compressedBytes,
      pageCount: result.pageCount ?? null,
    })
    .returning();

  return serializeFile(row);
}

export const compressImages = asyncHandler(async (req: Request, res: Response) => {
  const files = uploadedFiles(req);

  if (files.length === 0) {
    throw new ApiError(400, "Choose at least one image to compress.");
  }
  if (files.length > MAX_BATCH) {
    files.forEach((file) => removeTempFile(file.path));
    throw new ApiError(400, `You can compress up to ${MAX_BATCH} images at a time.`);
  }

  const level = readLevel(req);
  const compressed: Array<{ fileName: string; result: CompressionResult }> = [];

  try {
    for (const file of files) {
      const result = await compressImage(file.path, level);
      compressed.push({ fileName: file.originalname, result });
    }
  } finally {
    files.forEach((file) => removeTempFile(file.path));
  }

  const results: PublicFile[] = [];
  for (const entry of compressed) {
    results.push(await saveFile(req.user?.id, "image", entry.fileName, entry.result));
  }

  return sendSuccess(
    res,
    200,
    { files: results },
    results.length === 1 ? "Image compressed." : "Images compressed.",
  );
});

export const compressPdfFile = asyncHandler(async (req: Request, res: Response) => {
  const file = req.file;

  if (!file) {
    throw new ApiError(400, "Choose a PDF to compress.");
  }

  const level = readLevel(req);

  try {
    const result = await compressPdf(file.path, level);
    const saved = await saveFile(req.user?.id, "pdf", file.originalname, result);
    return sendSuccess(res, 200, { file: saved }, "PDF compressed.");
  } finally {
    removeTempFile(file.path);
  }
});
