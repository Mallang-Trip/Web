"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import { useLangStore } from "@/stores/lang-store";
import { Combobox } from "@/components/ui/combobox";
import { getFirstEntryTarget } from "@/utils";

export default function Header() {
  const [logoHref, setLogoHref] = useState<string>("/");
  const { isAuthenticated, phoneNumber, logout } = useAuth(logoHref);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentLanguage, setLanguage } = useLangStore();

  useEffect(() => {
    // 클라이언트에서 첫 접속 타겟을 읽어 로고 이동 경로로 사용
    const target = getFirstEntryTarget();
    setLogoHref(target || "/");
  }, []);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-screen-2xl px-4">
        {/* 메인 헤더 */}
        <div className="flex h-16 items-center justify-between">
          {/* 로고 */}
          <Link href={logoHref} className="flex items-center">
            <Image
              src="/logo.png"
              width={112}
              height={27}
              alt="말랑트립"
              className="h-7 w-auto"
              priority
              loading="eager"
              fetchPriority="high"
            />
          </Link>

          {/* 데스크톱 메뉴 */}
          <div className="hidden items-center gap-4 md:flex">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">{phoneNumber}</span>
                {(phoneNumber === "+821049259550" ||
                  phoneNumber === "+821025264159" ||
                  phoneNumber === "+821033273496") && (
                  <Link href="/admin">
                    <Button variant="outline" size="sm">
                      관리자
                    </Button>
                  </Link>
                )}
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

            {/* 언어 선택 (Combobox) */}
            <Combobox
              value={currentLanguage}
              onChange={(v) => setLanguage((v || "ko") as "ko" | "en" | "zh")}
              options={[
                { value: "ko", label: "🇰🇷 한국어" },
                { value: "en", label: "🇺🇸 English" },
                // { value: "zh", label: "🇨🇳 中문" },
              ]}
              widthClassName="w-32"
              buttonClassName="h-9 text-sm"
            />
          </div>

          {/* 모바일 햄버거 메뉴 버튼 */}
          <div className="flex items-center gap-2 md:hidden">
            {/* 언어 선택 (모바일 Combobox) */}
            <Combobox
              value={currentLanguage}
              onChange={(v) => setLanguage((v || "ko") as "ko" | "en" | "zh")}
              options={[
                { value: "ko", label: "🇰🇷 한국어" },
                { value: "en", label: "🇺🇸 English" },
                // { value: "zh", label: "🇨🇳 中문" },
              ]}
              widthClassName="w-24"
              buttonClassName="h-8 text-xs px-2"
            />

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-md p-2 hover:bg-gray-100"
              aria-label="메뉴 열기"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* 모바일 드롭다운 메뉴 */}
        {isMobileMenuOpen && (
          <div className="border-t border-gray-200 py-4 md:hidden">
            {isAuthenticated ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    로그인됨: {phoneNumber}
                  </span>
                </div>
                <div className="space-y-2">
                  <Link
                    href="/result"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block"
                  >
                    <Button variant="outline" className="w-full justify-start">
                      <svg
                        className="mr-2 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      예약 조회
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <svg
                      className="mr-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    로그아웃
                  </Button>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block"
              >
                <Button variant="outline" className="w-full justify-start">
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  로그인
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
