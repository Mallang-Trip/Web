"use client";

import { useEffect } from "react";
import Script from "next/script";
import { useLangStore } from "@/stores/lang-store";

export default function CustomerService() {
  const { currentLanguage } = useLangStore();

  // 언어 변경 시 이미 로드된 위젯을 즉시 토글(표시/숨김)
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const applyToggle = () => {
      const api = (
        globalThis as unknown as {
          Tawk_API?: { showWidget?: () => void; hideWidget?: () => void };
        }
      )?.Tawk_API;
      if (!api) return false;
      if (currentLanguage === "en") {
        if (typeof api.showWidget === "function") api.showWidget();
      } else {
        if (typeof api.hideWidget === "function") api.hideWidget();
      }
      return true;
    };

    // 즉시 시도 후, API 미존재 시 짧게 폴링하여 반영
    if (!applyToggle()) {
      intervalId = setInterval(() => {
        if (applyToggle() && intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
      }, 300);
      // 최대 5초까지만 폴링
      timeoutId = setTimeout(() => {
        if (intervalId) clearInterval(intervalId);
        intervalId = null;
        timeoutId = null;
      }, 5000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [currentLanguage]);

  return (
    <>
      {currentLanguage === "en" ? (
        <Script
          id="tawk-embed"
          strategy="afterInteractive"
          src="https://embed.tawk.to/68b6dea7b4883d192503aeca/1j455bg1m"
          onLoad={() => {
            const api = (
              globalThis as unknown as {
                Tawk_API?: { showWidget?: () => void };
              }
            )?.Tawk_API;
            if (api && typeof api.showWidget === "function") api.showWidget();
          }}
        />
      ) : null}

      {currentLanguage === "ko" ? (
        <a
          href={
            process.env.NEXT_PUBLIC_KAKAO_CHANNEL_URL || "https://pf.kakao.com/"
          }
          target="_blank"
          rel="noopener noreferrer"
          aria-label="카카오톡 고객센터 열기"
          className="fixed right-6 bottom-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#FEE500] shadow-lg ring-1 ring-[#FEE500] transition hover:brightness-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-8 w-8 text-black"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 3C6.477 3 2 6.507 2 10.83c0 2.49 1.558 4.687 3.946 6.098-.152.58-.552 2.108-.632 2.432-.1.403.148.397.313.289.129-.084 2.05-1.39 2.888-1.96.718.106 1.46.162 2.222.162 5.523 0 10-3.507 10-7.83C20.737 6.507 17.523 3 12 3z" />
          </svg>
        </a>
      ) : null}
    </>
  );
}
