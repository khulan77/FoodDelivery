import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
  : ["*"];

function withCors(request: NextRequest, response: NextResponse): NextResponse {
  const origin = request.headers.get("origin") ?? "";

  const allow =
    allowedOrigins.includes("*") || allowedOrigins.includes(origin)
      ? allowedOrigins.includes("*")
        ? "*"
        : origin
      : allowedOrigins[0];

  response.headers.set("Access-Control-Allow-Origin", allow);
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  response.headers.set("Access-Control-Max-Age", "86400");

  return response;
}

export function proxy(request: NextRequest) {
  if (request.method === "OPTIONS") {
    return withCors(request, new NextResponse(null, { status: 204 }));
  }

  return withCors(request, NextResponse.next());
}

export const config = {
  matcher: "/api/:path*",
};
