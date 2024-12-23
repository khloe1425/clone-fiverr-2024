import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/manage"];
const unAuthPaths = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;
  if (unAuthPaths.some((path) => pathname.startsWith(path)) && accessToken) {
    const url = new URL("/", request.url);
    return NextResponse.redirect(url);
  }
  // const refreshToken = request.cookies.get("refreshToken")?.value;
  // if (
  //   protectedPaths.some((path) => pathname.startsWith(path) && !refreshToken)
  // ) {
  //   const url = new URL("/logout", request.url);
  //   url.searchParams.set(
  //     "refreshToken",
  //     request.cookies.get("refreshToken")?.value || ""
  //   );
  //   return NextResponse.redirect(url);
  // }
  // if (unAuthPaths.some((path) => pathname.startsWith(path) && refreshToken)) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }
  // if (
  //   protectedPaths.some(
  //     (path) => pathname.startsWith(path) && !accessToken && refreshToken
  //   )
  // ) {
  // }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/register", "/manage/:path*"],
};
