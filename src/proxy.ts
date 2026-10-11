
import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  // User has no session cookie
  if (!sessionCookie) {
    const signInUrl = new URL("/sign-in", request.url);

    const callbackURL =
      request.nextUrl.pathname +
      request.nextUrl.search;

    signInUrl.searchParams.set(
      "callbackURL",
      callbackURL
    );

    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/product/:path*",
    "/profile/:path*",
  ],
};
