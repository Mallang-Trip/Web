import ko from "./ko";
import en from "./en";
import zh from "./zh";

export const translations = {
  ko,
  en,
  zh,
} as const;

export type SupportedLanguage = keyof typeof translations;
export type TranslationKeys = typeof translations.ko;

export default translations;
