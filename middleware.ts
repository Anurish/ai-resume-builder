import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const pathname = req.nextUrl.pathname;

  const requiresAuth =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/resume") ||
    pathname.startsWith("/r");

  if (!requiresAuth) return NextResponse.next();

  // 1️⃣ Check Google / Credentials login via NextAuth
  const nextAuthSession = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: false, // required on localhost
  });

  // 2️⃣ Check manual login token (custom JWT)
  const manualToken = req.cookies.get("manual_token")?.value;

  // 3️⃣ If either exists → allow access
  if (nextAuthSession || manualToken) {
    return NextResponse.next();
  }

  // 4️⃣ Otherwise redirect to login
  return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: ["/dashboard/:path*", "/resume/:path*", "/r/:path*"],
};
