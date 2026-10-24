import { timingSafeEqual } from "node:crypto";
import type { Request, Response } from "express";
import { eq, or, sql } from "drizzle-orm";
import { z } from "zod";
import { db } from "../db/index.js";
import { users, type User } from "../db/schema.js";
import { ApiError } from "../utils/ApiError.js";
import { sendSuccess } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { hashPassword, verifyPassword } from "../utils/password.js";
import {
  clearAuthCookies,
  hashToken,
  setAuthCookies,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../utils/tokens.js";

const registerSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters.").max(80),
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters.")
    .max(30)
    .regex(/^[a-zA-Z0-9_]+$/, "Use only letters, numbers, and underscores."),
  email: z.string().trim().toLowerCase().email("Enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(72, "Password must be 72 characters or fewer."),
});

const loginSchema = z.object({
  emailOrUsername: z.string().trim().min(1, "Enter your email or username."),
  password: z.string().min(1, "Enter your password."),
});

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,72}$/;

const publicUser = (user: User) => ({
  id: user.id,
  name: user.name,
  username: user.username,
  email: user.email,
  createdAt: user.createdAt.toISOString(),
});

function isUniqueViolation(error: unknown): error is { code: string } {
  return typeof error === "object" && error !== null && "code" in error && error.code === "23505";
}

function tokensMatch(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export const register = asyncHandler(async (req: Request, res: Response) => {
  const input = registerSchema.parse(req.body);
  const username = input.username.toLowerCase();
  const email = input.email.toLowerCase();

  if (!passwordRegex.test(input.password)) {
    throw new ApiError(422, "Password must include at least one letter and one number.", [
      { field: "password", message: "Include at least one letter and one number." },
    ]);
  }

  const [existing] = await db
    .select({ email: users.email, username: users.username })
    .from(users)
    .where(or(eq(sql`lower(${users.email})`, email), eq(sql`lower(${users.username})`, username)))
    .limit(1);

  if (existing) {
    const field = existing.email.toLowerCase() === email ? "email" : "username";
    throw new ApiError(409, `That ${field} is already registered.`, [
      { field, message: `That ${field} is already registered.` },
    ]);
  }

  const passwordHash = await hashPassword(input.password);

  try {
    const [created] = await db
      .insert(users)
      .values({ name: input.name, username, email, passwordHash })
      .returning();

    return sendSuccess(res, 201, { user: publicUser(created) }, "Your account is ready.");
  } catch (error) {
    if (isUniqueViolation(error)) {
      throw new ApiError(409, "An account with that email or username already exists.");
    }
    throw error;
  }
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const input = loginSchema.parse(req.body);
  const identifier = input.emailOrUsername.toLowerCase();

  const [user] = await db
    .select()
    .from(users)
    .where(
      or(
        eq(sql`lower(${users.email})`, identifier),
        eq(sql`lower(${users.username})`, identifier),
      ),
    )
    .limit(1);

  if (!user || !(await verifyPassword(input.password, user.passwordHash))) {
    throw new ApiError(401, "Email or username and password do not match.");
  }

  const accessToken = signAccessToken(user.id);
  const refreshToken = signRefreshToken(user.id);

  await db
    .update(users)
    .set({ refreshTokenHash: hashToken(refreshToken), updatedAt: new Date() })
    .where(eq(users.id, user.id));

  setAuthCookies(res, accessToken, refreshToken);
  return sendSuccess(res, 200, { user: publicUser(user) }, "Welcome back.");
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies?.refreshToken as string | undefined;
  if (!token) {
    clearAuthCookies(res);
    throw new ApiError(401, "Your session has expired. Please sign in again.");
  }

  let userId: string;
  try {
    userId = verifyRefreshToken(token).sub;
  } catch {
    clearAuthCookies(res);
    throw new ApiError(401, "Your session has expired. Please sign in again.");
  }

  const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  if (!user?.refreshTokenHash || !tokensMatch(hashToken(token), user.refreshTokenHash)) {
    clearAuthCookies(res);
    throw new ApiError(401, "Your session has expired. Please sign in again.");
  }

  const accessToken = signAccessToken(user.id);
  const refreshToken = signRefreshToken(user.id);

  await db
    .update(users)
    .set({ refreshTokenHash: hashToken(refreshToken), updatedAt: new Date() })
    .where(eq(users.id, user.id));

  setAuthCookies(res, accessToken, refreshToken);
  return sendSuccess(res, 200, { user: publicUser(user) }, "Session refreshed.");
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  let userId = req.user?.id;

  if (!userId) {
    const token = req.cookies?.refreshToken as string | undefined;
    if (token) {
      try {
        userId = verifyRefreshToken(token).sub;
      } catch {
        userId = undefined;
      }
    }
  }

  if (userId) {
    await db
      .update(users)
      .set({ refreshTokenHash: null, updatedAt: new Date() })
      .where(eq(users.id, userId));
  }

  clearAuthCookies(res);
  return sendSuccess(res, 200, null, "You have been signed out.");
});

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new ApiError(401, "Authentication required");
  }

  return sendSuccess(res, 200, {
    user: {
      ...req.user,
      createdAt: req.user.createdAt.toISOString(),
    },
  });
});
