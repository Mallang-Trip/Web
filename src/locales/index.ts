import ko from "./ko";
import en from "./en";

export const translations = {
  ko,
  en,
} as const;

export type SupportedLanguage = keyof typeof translations;
export type TranslationKeys = typeof translations.ko;

export default translations;
