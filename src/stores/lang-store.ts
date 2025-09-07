"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type SupportedLanguage = "ko" | "en" | "zh";

type LangState = {
  currentLanguage: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
};

export const useLangStore = create<LangState>()(
  persist(
    (set) => ({
      currentLanguage: "ko",
      setLanguage: (lang) => set({ currentLanguage: lang }),
    }),
    {
      name: "lang-storage",
    },
  ),
);
