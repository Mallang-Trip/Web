import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match } from "path-to-regexp";

const getSession = async () => {
  return false; // 임시
};

// 인증이 필요한 페이지 리스트
const matchersForAuth = ["/admin{/*path}"];

// 미들웨어
export async function middleware(request: NextRequest) {
  // 인증이 필요한 페이지 접근 제어
  if (isMatch(request.nextUrl.pathname, matchersForAuth)) {
    return (await getSession())
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/signin", request.url));
  }
  return NextResponse.next();
}

// 미들웨어 호출 제외 (API 라우트, 정적 파일, 이미지 최적화 파일 ...)
export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};

// 경로 일치 확인
const isMatch = (pathname: string, urls: string[]) => {
  return urls.some((url) => !!match(url)(pathname));
};
