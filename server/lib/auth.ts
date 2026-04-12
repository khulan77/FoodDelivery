import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const ACCESS_SECRET = process.env.JWT_SECRET!;

export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: "7d" });
};

export const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: "7d" });
};

export const generateResetToken = (userId: string): string => {
  return jwt.sign({ userId }, ACCESS_SECRET, { expiresIn: "10m" });
};

export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, ACCESS_SECRET) as TokenPayload;
};

export const getAuthUser = (request: NextRequest): TokenPayload => {
  const authHeader = request.headers.get("Authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    throw { status: 401, message: "No token provided" } as AuthError;
  }

  const token = authHeader.slice(7);

  try {
    return verifyToken(token);
  } catch {
    throw { status: 401, message: "Invalid or expired access token" } as AuthError;
  }
};

export const requireAdmin = (request: NextRequest): TokenPayload => {
  const user = getAuthUser(request);

  if (user.role !== "admin") {
    throw { status: 403, message: "Forbidden: Admin access required" } as AuthError;
  }

  return user;
};

export const handleApiError = (error: unknown) => {
  const err = error as Partial<AuthError>;
  if (typeof err?.status === "number" && typeof err?.message === "string") {
    return NextResponse.json({ error: err.message }, { status: err.status });
  }
  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
};
