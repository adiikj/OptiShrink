import fs from "node:fs";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import FormData from "form-data";
import { env } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";

export type CompressionLevel = "low" | "medium" | "high";

export interface CompressionResult {
  url: string;
  originalBytes: number;
  compressedBytes: number;
  pageCount?: number;
}

const imageProfiles: Record<
  CompressionLevel,
  { width: number; quality: number; crop: string; fetch_format: string }
> = {
  low: { width: 2560, quality: 82, crop: "limit", fetch_format: "auto" },
  medium: { width: 1920, quality: 68, crop: "limit", fetch_format: "auto" },
  high: { width: 1280, quality: 50, crop: "limit", fetch_format: "auto" },
};

const pdfProfiles: Record<
  CompressionLevel,
  {
    ImageOptimizationFormat: string;
    JPEGQuality: number;
    ResampleImages: boolean;
    ResamplingResolution: number;
    GrayscaleImages: boolean;
  }
> = {
  low: {
    ImageOptimizationFormat: "JPEG",
    JPEGQuality: 55,
    ResampleImages: true,
    ResamplingResolution: 170,
    GrayscaleImages: false,
  },
  medium: {
    ImageOptimizationFormat: "JPEG",
    JPEGQuality: 35,
    ResampleImages: true,
    ResamplingResolution: 130,
    GrayscaleImages: false,
  },
  high: {
    ImageOptimizationFormat: "JPEG",
    JPEGQuality: 20,
    ResampleImages: true,
    ResamplingResolution: 100,
    GrayscaleImages: true,
  },
};

function configureCloudinary(): void {
  if (!env.CLOUDINARY_NAME || !env.CLOUDINARY_API_KEY || !env.CLOUDINARY_API_SECRET) {
    throw new ApiError(503, "Image compression is not configured on this server.");
  }
  cloudinary.config({
    cloud_name: env.CLOUDINARY_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

export async function compressImage(
  filePath: string,
  level: CompressionLevel,
): Promise<CompressionResult> {
  configureCloudinary();

  const originalBytes = fs.statSync(filePath).size;
  const profile = imageProfiles[level];

  const result = await cloudinary.uploader.upload(filePath, {
    folder: "optishrink/images",
    resource_type: "image",
    transformation: [{ ...profile, flags: "progressive" }],
  });

  return {
    url: result.secure_url,
    originalBytes,
    compressedBytes: result.bytes,
  };
}

export async function compressPdf(
  filePath: string,
  level: CompressionLevel,
): Promise<CompressionResult> {
  if (!env.PDFCO_API_KEY) {
    throw new ApiError(503, "PDF compression is not configured on this server.");
  }

  const originalBytes = fs.statSync(filePath).size;
  const form = new FormData();
  form.append("file", fs.createReadStream(filePath));
  form.append("name", `optishrink-${Date.now()}.pdf`);

  const uploadResponse = await axios.post("https://api.pdf.co/v1/file/upload", form, {
    headers: { ...form.getHeaders(), "x-api-key": env.PDFCO_API_KEY },
    maxBodyLength: Infinity,
    maxContentLength: Infinity,
  });

  if (uploadResponse.data?.error) {
    throw new ApiError(502, uploadResponse.data.message || "The PDF could not be uploaded.");
  }

  const sourceUrl = uploadResponse.data?.url as string | undefined;
  if (!sourceUrl) {
    throw new ApiError(502, "The PDF service returned an unexpected response.");
  }

  const optimizeResponse = await axios.post(
    "https://api.pdf.co/v1/pdf/optimize",
    {
      url: sourceUrl,
      name: `optishrink-${Date.now()}.pdf`,
      async: false,
      profiles: JSON.stringify(pdfProfiles[level]),
    },
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": env.PDFCO_API_KEY,
      },
    },
  );

  if (optimizeResponse.data?.error) {
    throw new ApiError(502, optimizeResponse.data.message || "The PDF could not be compressed.");
  }

  const compressedUrl = optimizeResponse.data?.url as string | undefined;
  if (!compressedUrl) {
    throw new ApiError(502, "The PDF service returned an unexpected response.");
  }

  const compressedBytes = Number(optimizeResponse.data.fileSize ?? originalBytes);
  const pageCount = Number(optimizeResponse.data.pageCount ?? 0);

  return {
    url: compressedUrl,
    originalBytes,
    compressedBytes: Number.isFinite(compressedBytes) ? compressedBytes : originalBytes,
    pageCount: Number.isFinite(pageCount) && pageCount > 0 ? pageCount : undefined,
  };
}

export function removeTempFile(filePath: string | undefined): void {
  if (!filePath) return;
  fs.unlink(filePath, (error) => {
    if (error && error.code !== "ENOENT") {
      console.error("Failed to remove temporary upload:", error.message);
    }
  });
}
