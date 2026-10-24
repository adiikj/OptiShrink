import type { NextFunction, Request, Response } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { users, type AuthUser } from "../db/schema.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyAccessToken } from "../utils/tokens.js";

const userColumns = {
  id: users.id,
  name: users.name,
  username: users.username,
  email: users.email,
  createdAt: users.createdAt,
};

function readToken(req: Request): string | null {
  const cookieToken = req.cookies?.accessToken as string | undefined;
  if (cookieToken) return cookieToken;

  const header = req.header("Authorization");
  if (header?.startsWith("Bearer ")) {
    return header.slice("Bearer ".length).trim();
  }
  return null;
}

async function findUserById(id: string): Promise<AuthUser | null> {
  const [user] = await db.select(userColumns).from(users).where(eq(users.id, id)).limit(1);
  return user ?? null;
}

export const requireAuth = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    const token = readToken(req);
    if (!token) {
      throw new ApiError(401, "Authentication required");
    }

    let userId: string;
    try {
      userId = verifyAccessToken(token).sub;
    } catch {
      throw new ApiError(401, "Your session has expired. Please sign in again.");
    }

    const user = await findUserById(userId);
    if (!user) {
      throw new ApiError(401, "Your session is no longer valid.");
    }

    req.user = user;
    next();
  },
);

export const optionalAuth = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    const token = readToken(req);
    if (!token) {
      req.user = null;
      return next();
    }

    try {
      const userId = verifyAccessToken(token).sub;
      req.user = await findUserById(userId);
    } catch {
      req.user = null;
    }

    next();
  },
);
