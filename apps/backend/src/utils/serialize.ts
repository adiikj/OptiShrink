import type { CompressedFile, FileKind } from "../db/schema.js";

export interface PublicFile {
  id: string | null;
  kind: FileKind;
  fileName: string;
  url: string;
  originalBytes: number;
  compressedBytes: number;
  pageCount: number | null;
  createdAt: string;
}

export function serializeFile(file: CompressedFile): PublicFile {
  return {
    id: file.id,
    kind: file.kind,
    fileName: file.fileName,
    url: file.url,
    originalBytes: file.originalBytes,
    compressedBytes: file.compressedBytes,
    pageCount: file.pageCount,
    createdAt: file.createdAt.toISOString(),
  };
}

export function savedPercent(originalBytes: number, compressedBytes: number): number {
  if (originalBytes <= 0) return 0;
  return Math.max(0, Math.round(((originalBytes - compressedBytes) / originalBytes) * 1000) / 10);
}
