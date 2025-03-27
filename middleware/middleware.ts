import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// src/lib/auth.ts (middleware part)
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const host = request.nextUrl.origin;

  if (!token && request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL(`${host}/login`, request.url));
  }

  return NextResponse.next();
}