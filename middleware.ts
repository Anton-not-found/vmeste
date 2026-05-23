import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/register", "/login", "/api-doc", "/api/auth"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // Получаем refreshToken из cookie (если есть)
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const isAuthenticated = !!refreshToken;

  if (!isAuthenticated && !isPublicRoute) {
    const url = new URL("/register", request.url);
    return NextResponse.redirect(url);
  }

  if (isAuthenticated && (pathname === "/register" || pathname === "/login")) {
    const url = new URL("/", request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
