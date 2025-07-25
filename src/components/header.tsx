"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 h-16 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-screen-2xl items-center justify-between px-4">
        {/* 로고 */}
        <div className="flex items-center">
          <Image
            src="/logo.png"
            width={112}
            height={27}
            alt="말랑트립"
            className="h-7 w-auto"
          />
        </div>

        {/* 오른쪽 메뉴 */}
        <div className="flex items-center gap-4">
          {/* 예약 조회 버튼 */}
          <Button variant="outline" size="sm">
            예약 조회
          </Button>

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
