import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/:path*", "/login", "/register", "/"],
};

export async function middleware(request: NextRequest) {
  const session = await auth();
  const user = session?.user;
  const url = request.nextUrl;

  const isAuthPage = url.pathname === "/login" || url.pathname === "/register";

  const isProtectedRoute = url.pathname.startsWith("/dashboard");

  // Block logged-in users from accessing auth pages
  if (user && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect unauthenticated users trying to access protected content
  if (!user && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect basic users (non-staff/admin) away from /dashboard
  if (user?.role === "USER" && isProtectedRoute) {
    return NextResponse.redirect(new URL("/event", request.url));
  }

  return NextResponse.next();
}
