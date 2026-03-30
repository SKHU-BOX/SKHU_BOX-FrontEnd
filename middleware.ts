import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const role = request.cookies.get("role")?.value || "student";
  const pathname = request.nextUrl.pathname;

  // 학생이 관리자 페이지 접근 시 → /dashboard로 리다이렉트
  if (role === "student" && pathname.startsWith("/admindashboard")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 관리자가 학생 페이지 접근 시 → /admindashboard로 리다이렉트
  if (role === "admin" && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/admindashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admindashboard/:path*"],
};
