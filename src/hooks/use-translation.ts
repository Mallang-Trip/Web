"use client";

import { useLangStore } from "@/stores/lang-store";
import { translations } from "@/locales";

export function useTranslation() {
  const { currentLanguage } = useLangStore();

  // 지원하는 언어만 사용, 나머지는 한국어로 fallback
  const lang =
    currentLanguage === "ko" || currentLanguage === "en" || currentLanguage === "zh"
      ? currentLanguage
      : "ko";
  const t = translations[lang];

  return { t, lang: currentLanguage };
}
