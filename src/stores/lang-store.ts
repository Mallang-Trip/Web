"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type SupportedLanguage = "ko" | "en" | "zh";

type LangState = {
  currentLanguage: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  initializeLanguage: () => void;
};

/**
 * 브라우저 언어 감지
 */
function detectBrowserLanguage(): SupportedLanguage {
  if (typeof window === "undefined") return "ko";

  const browserLang = navigator.language || (navigator as any).userLanguage;

  // 한국어 감지
  if (browserLang.startsWith("ko")) return "ko";

  // 영어 감지
  if (browserLang.startsWith("en")) return "en";

  // 중국어 감지
  if (browserLang.startsWith("zh")) return "zh";

  // 기본값은 영어 (한국 외 국가)
  return "en";
}

export const useLangStore = create<LangState>()(
  persist(
    (set, get) => ({
      currentLanguage: "ko",
      setLanguage: (lang) => {
        set({ currentLanguage: lang });
        // 쿠키에도 저장 (서버에서 접근 가능하도록)
        if (typeof document !== "undefined") {
          document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=31536000; SameSite=Lax`;
        }
      },
      initializeLanguage: () => {
        // localStorage에 저장된 언어가 없으면 브라우저 언어로 초기화
        const storedLang = get().currentLanguage;
        if (!storedLang || storedLang === "ko") {
          const detectedLang = detectBrowserLanguage();
          set({ currentLanguage: detectedLang });
          // 쿠키에도 저장
          if (typeof document !== "undefined") {
            document.cookie = `NEXT_LOCALE=${detectedLang}; path=/; max-age=31536000; SameSite=Lax`;
          }
        } else {
          // 쿠키 동기화
          if (typeof document !== "undefined") {
            document.cookie = `NEXT_LOCALE=${storedLang}; path=/; max-age=31536000; SameSite=Lax`;
          }
        }
      },
    }),
    {
      name: "lang-storage",
    },
  ),
);
