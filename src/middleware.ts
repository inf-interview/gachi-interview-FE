import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");

  if (!accessToken && request.url !== new URL("/", request.url).toString()) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (accessToken && request.url === new URL("/", request.url).toString()) {
    return NextResponse.redirect(new URL("/my?tab=videos", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/interview/:path*", "/videos/:path*", "/community/:path*", "/my/:path*", "/"],
};
