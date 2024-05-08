import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicPaths = ["/", "/login", "/register","/checkout"];
  const isPublicPath = publicPaths.includes(path);

  const privatePaths = ["/success", "/orders", "/orders/:id/"];
  const isPrivatePath = privatePaths.includes(path);

  const token = request.cookies.get("accessToken")?.value;

  if (isPublicPath && path != "/" && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (isPrivatePath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/login", "/register", "/checkout", "/success", "/orders", "/orders/:id/"],
};
