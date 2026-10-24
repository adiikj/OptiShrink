import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import type {
  ApiIssue,
  ApiResponse,
  AuthUser,
  CompressionLevel,
  CompressedFile,
  FileKind,
  Stats,
} from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

interface ApiErrorBody {
  message?: string;
  errors?: ApiIssue[];
}

export class ApiClientError extends Error {
  status?: number;
  issues?: ApiIssue[];

  constructor(message: string, status?: number, issues?: ApiIssue[]) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.issues = issues;
  }
}

const http = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 180_000,
});

let refreshPromise: Promise<void> | null = null;

async function refreshSession(): Promise<void> {
  refreshPromise ??= axios
    .post(`${API_URL}/user/refresh`, {}, { withCredentials: true, timeout: 15_000 })
    .then(() => undefined)
    .catch((error) => {
      window.dispatchEvent(new Event("optishrink:session-expired"));
      throw error;
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
}

function toApiError(error: AxiosError<ApiErrorBody>): ApiClientError {
  const status = error.response?.status;
  const body = error.response?.data;
  const message =
    body?.message ??
    (error.code === "ECONNABORTED"
      ? "The request took too long. Try a smaller file."
      : "Could not reach the studio. Check your connection and try again.");
  return new ApiClientError(message, status, body?.errors);
}

http.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorBody>) => {
    const config = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined;
    const url = config?.url ?? "";
    const mayRefresh =
      error.response?.status === 401 &&
      config &&
      !config._retry &&
      !url.includes("/user/login") &&
      !url.includes("/user/register") &&
      !url.includes("/user/refresh") &&
      !url.includes("/user/logout");

    if (mayRefresh) {
      config._retry = true;
      try {
        await refreshSession();
        return await http.request(config);
      } catch {
        // Fall through to the original error below.
      }
    }

    throw toApiError(error);
  },
);

export async function login(emailOrUsername: string, password: string): Promise<AuthUser> {
  const { data } = await http.post<ApiResponse<{ user: AuthUser }>>("/user/login", {
    emailOrUsername,
    password,
  });
  return data.data.user;
}

export async function register(input: {
  name: string;
  username: string;
  email: string;
  password: string;
}): Promise<AuthUser> {
  const { data } = await http.post<ApiResponse<{ user: AuthUser }>>("/user/register", input);
  return data.data.user;
}

export async function logout(): Promise<void> {
  await http.post("/user/logout");
}

export async function getProfile(): Promise<AuthUser> {
  const { data } = await http.get<ApiResponse<{ user: AuthUser }>>("/user/profile");
  return data.data.user;
}

export async function getStats(): Promise<Stats> {
  const { data } = await http.get<ApiResponse<Stats>>("/user/stats");
  return data.data;
}

export async function getHistory(kind?: FileKind): Promise<CompressedFile[]> {
  const { data } = await http.get<ApiResponse<{ files: CompressedFile[] }>>("/user/files", {
    params: kind ? { kind } : undefined,
  });
  return data.data.files;
}

export async function deleteHistoryFile(id: string): Promise<void> {
  await http.delete(`/user/files/${id}`);
}

type ProgressHandler = (percent: number) => void;

function uploadProgress(handler?: ProgressHandler) {
  return (event: { loaded: number; total?: number }) => {
    if (!handler || !event.total) return;
    handler(Math.min(99, Math.round((event.loaded / event.total) * 100)));
  };
}

export async function uploadImages(
  files: File[],
  level: CompressionLevel,
  onProgress?: ProgressHandler,
): Promise<CompressedFile[]> {
  const form = new FormData();
  form.append("compressionLevel", level);
  files.forEach((file) => form.append("images", file));

  const { data } = await http.post<ApiResponse<{ files: CompressedFile[] }>>(
    "/image/optimize-img",
    form,
    { onUploadProgress: uploadProgress(onProgress) },
  );
  return data.data.files;
}

export async function uploadPdf(
  file: File,
  level: CompressionLevel,
  onProgress?: ProgressHandler,
): Promise<CompressedFile> {
  const form = new FormData();
  form.append("compressionLevel", level);
  form.append("file", file);

  const { data } = await http.post<ApiResponse<{ file: CompressedFile }>>(
    "/pdf/compress-pdf",
    form,
    { onUploadProgress: uploadProgress(onProgress) },
  );
  return data.data.file;
}
