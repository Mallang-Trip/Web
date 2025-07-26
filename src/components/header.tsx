"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";

export default function Header() {
  const { isAuthenticated, phoneNumber, logout } = useAuth();

  return (
    <header className="fixed top-0 right-0 left-0 z-50 h-16 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-screen-2xl items-center justify-between px-4">
        {/* 로고 */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            width={112}
            height={27}
            alt="말랑트립"
            className="h-7 w-auto"
          />
        </Link>

        {/* 오른쪽 메뉴 */}
        <div className="flex items-center gap-4">
          {/* 로그인 상태에 따른 버튼 표시 */}
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">{phoneNumber}</span>
              <Link href="/result">
                <Button variant="outline" size="sm">
                  예약 조회
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={logout}>
                로그아웃
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button variant="outline" size="sm">
                로그인
              </Button>
            </Link>
          )}

          {/* 언어 선택 드롭다운 */}
          <select
            defaultValue="ko"
            className="h-9 w-32 rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="ko">🇰🇷 한국어</option>
            <option value="en">🇺🇸 English</option>
            <option value="zh">🇨🇳 中문</option>
          </select>
        </div>
      </div>
    </header>
  );
}
