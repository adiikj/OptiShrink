export type FileKind = "image" | "pdf";
export type CompressionLevel = "low" | "medium" | "high";

export interface AuthUser {
  id: string;
  name: string;
  username: string;
  email: string;
  createdAt: string;
}

export interface CompressedFile {
  id: string | null;
  kind: FileKind;
  fileName: string;
  url: string;
  originalBytes: number;
  compressedBytes: number;
  pageCount: number | null;
  createdAt: string;
}

export interface StatsTotals {
  files: number;
  images: number;
  pdfs: number;
  originalBytes: number;
  compressedBytes: number;
  savedBytes: number;
  savedPercent: number;
}

export interface DailyStat {
  date: string;
  files: number;
  originalBytes: number;
  compressedBytes: number;
}

export interface KindStats {
  files: number;
  originalBytes: number;
  compressedBytes: number;
}

export interface Stats {
  totals: StatsTotals;
  kinds: {
    image: KindStats;
    pdf: KindStats;
  };
  daily: DailyStat[];
}

export interface ApiResponse<T> {
  success: boolean;
  status: number;
  message: string;
  data: T;
}

export interface ApiIssue {
  field?: string;
  message: string;
}
