import type { AuthUser } from "../db/schema.js";

declare global {
  namespace Express {
    interface Request {
      user: AuthUser | null;
    }
  }
}

export {};
