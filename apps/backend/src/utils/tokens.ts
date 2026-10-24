import { createHash } from "node:crypto";
import type { CookieOptions, Response } from "express";
import jwt, { type SignOptions } from "jsonwebtoken";
import { env, isProduction } from "../config/env.js";

interface AccessPayload {
  sub: string;
}

const cookieBase: CookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  path: "/",
};

const unitMs: Record<string, number> = {
  s: 1000,
  m: 60 * 1000,
  h: 60 * 60 * 1000,
  d: 24 * 60 * 60 * 1000,
};

function durationToMs(value: string, fallback: number): number {
  const match = /^(\d+)([smhd])$/.exec(value.trim());
  if (!match) return fallback;
  return Number(match[1]) * unitMs[match[2]];
}

const ACCESS_MAX_AGE = durationToMs(env.ACCESS_TOKEN_EXPIRY, 15 * 60 * 1000);
const REFRESH_MAX_AGE = durationToMs(env.REFRESH_TOKEN_EXPIRY, 30 * 24 * 60 * 60 * 1000);

export function signAccessToken(userId: string): string {
  return jwt.sign({}, env.ACCESS_TOKEN_SECRET, {
    subject: userId,
    expiresIn: env.ACCESS_TOKEN_EXPIRY as SignOptions["expiresIn"],
  });
}

export function signRefreshToken(userId: string): string {
  return jwt.sign({}, env.REFRESH_TOKEN_SECRET, {
    subject: userId,
    expiresIn: env.REFRESH_TOKEN_EXPIRY as SignOptions["expiresIn"],
  });
}

export function verifyAccessToken(token: string): AccessPayload {
  const payload = jwt.verify(token, env.ACCESS_TOKEN_SECRET);
  if (typeof payload === "string" || !payload.sub) {
    throw new Error("Malformed access token");
  }
  return { sub: payload.sub };
}

export function verifyRefreshToken(token: string): AccessPayload {
  const payload = jwt.verify(token, env.REFRESH_TOKEN_SECRET);
  if (typeof payload === "string" || !payload.sub) {
    throw new Error("Malformed refresh token");
  }
  return { sub: payload.sub };
}

export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export function setAuthCookies(res: Response, accessToken: string, refreshToken: string): void {
  res.cookie("accessToken", accessToken, { ...cookieBase, maxAge: ACCESS_MAX_AGE });
  res.cookie("refreshToken", refreshToken, { ...cookieBase, maxAge: REFRESH_MAX_AGE });
}

export function clearAuthCookies(res: Response): void {
  res.clearCookie("accessToken", cookieBase);
  res.clearCookie("refreshToken", cookieBase);
}
