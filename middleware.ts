import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/:path*", "/login", "/register", "/"],
};

export async function middleware(request: NextRequest) {
  const session = await auth();
  const url = request.nextUrl;
  const user = session?.user;

  if (
    user &&
    (url.pathname.includes("/login") || url.pathname.includes("/register"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!session && url.pathname.includes("/(protected)")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}
