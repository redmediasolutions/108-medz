import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Allow coming-soon page itself
  if (pathname.startsWith("/coming-soon")) {
    return NextResponse.next();
  }

  // Block EVERYTHING else
  return NextResponse.redirect(
    new URL("/coming-soon", req.url)
  );
}

export const config = {
  matcher: "/((?!_next|favicon.ico).*)",
};