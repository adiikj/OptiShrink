import type { Request, Response } from "express";
import { and, desc, eq, gte, sql } from "drizzle-orm";
import { z } from "zod";
import { db } from "../db/index.js";
import { compressedFiles } from "../db/schema.js";
import { ApiError } from "../utils/ApiError.js";
import { sendSuccess } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { savedPercent, serializeFile } from "../utils/serialize.js";

const querySchema = z.object({
  kind: z.enum(["image", "pdf"]).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50),
});

const idSchema = z.string().uuid();

export const listFiles = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const query = querySchema.parse(req.query);

  const rows = await db
    .select()
    .from(compressedFiles)
    .where(
      and(
        eq(compressedFiles.userId, userId),
        query.kind ? eq(compressedFiles.kind, query.kind) : undefined,
      ),
    )
    .orderBy(desc(compressedFiles.createdAt))
    .limit(query.limit);

  return sendSuccess(
    res,
    200,
    { files: rows.map(serializeFile) },
    "Compression history loaded.",
  );
});

export const deleteFile = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const fileId = idSchema.parse(req.params.id);

  const [deleted] = await db
    .delete(compressedFiles)
    .where(and(eq(compressedFiles.id, fileId), eq(compressedFiles.userId, userId)))
    .returning({ id: compressedFiles.id });

  if (!deleted) {
    throw new ApiError(404, "That file is not in your history.");
  }

  return sendSuccess(res, 200, { id: deleted.id }, "File removed from history.");
});

export const getStats = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.id;

  const totalsRows = await db
    .select({
      kind: compressedFiles.kind,
      count: sql<number>`count(*)::int`,
      originalBytes: sql<string>`coalesce(sum(${compressedFiles.originalBytes}), 0)::bigint`,
      compressedBytes: sql<string>`coalesce(sum(${compressedFiles.compressedBytes}), 0)::bigint`,
    })
    .from(compressedFiles)
    .where(eq(compressedFiles.userId, userId))
    .groupBy(compressedFiles.kind);

  const totals = {
    files: 0,
    images: 0,
    pdfs: 0,
    originalBytes: 0,
    compressedBytes: 0,
    savedBytes: 0,
    savedPercent: 0,
  };

  const kinds = {
    image: { files: 0, originalBytes: 0, compressedBytes: 0 },
    pdf: { files: 0, originalBytes: 0, compressedBytes: 0 },
  };

  for (const row of totalsRows) {
    const original = Number(row.originalBytes);
    const compressed = Number(row.compressedBytes);
    totals.files += row.count;
    totals.originalBytes += original;
    totals.compressedBytes += compressed;
    kinds[row.kind].files = row.count;
    kinds[row.kind].originalBytes = original;
    kinds[row.kind].compressedBytes = compressed;
    if (row.kind === "image") totals.images += row.count;
    if (row.kind === "pdf") totals.pdfs += row.count;
  }

  totals.savedBytes = Math.max(0, totals.originalBytes - totals.compressedBytes);
  totals.savedPercent = savedPercent(totals.originalBytes, totals.compressedBytes);

  const since = new Date();
  since.setUTCHours(0, 0, 0, 0);
  since.setUTCDate(since.getUTCDate() - 13);

  const dailyRows = await db
    .select({
      day: sql<string>`to_char(${compressedFiles.createdAt} at time zone 'UTC', 'YYYY-MM-DD')`,
      files: sql<number>`count(*)::int`,
      originalBytes: sql<string>`coalesce(sum(${compressedFiles.originalBytes}), 0)::bigint`,
      compressedBytes: sql<string>`coalesce(sum(${compressedFiles.compressedBytes}), 0)::bigint`,
    })
    .from(compressedFiles)
    .where(and(eq(compressedFiles.userId, userId), gte(compressedFiles.createdAt, since)))
    .groupBy(sql`1`)
    .orderBy(sql`1`);

  const byDay = new Map(dailyRows.map((row) => [row.day, row]));
  const daily = Array.from({ length: 14 }, (_, index) => {
    const date = new Date(since);
    date.setUTCDate(since.getUTCDate() + index);
    const key = date.toISOString().slice(0, 10);
    const row = byDay.get(key);
    return {
      date: key,
      files: row?.files ?? 0,
      originalBytes: Number(row?.originalBytes ?? 0),
      compressedBytes: Number(row?.compressedBytes ?? 0),
    };
  });

  return sendSuccess(res, 200, { totals, kinds, daily }, "Statistics loaded.");
});
