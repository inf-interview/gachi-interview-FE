import { NextResponse } from "next/server";
// import { auth } from "./auth";

export async function middleware() {
  // const session = await auth();
  // if (!session) {
  //   return NextResponse.redirect("http://localhost:3000");
  // }
}

export const config = {
  matcher: ["/interview/:path*", "/videos/:path*", "/community/:path*", "/my/:path*"],
};
