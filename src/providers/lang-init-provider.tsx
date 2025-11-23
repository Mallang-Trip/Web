"use client";

import { useEffect } from "react";
import { useLangStore } from "@/stores/lang-store";

export function LangInitProvider() {
  const { initializeLanguage } = useLangStore();

  useEffect(() => {
    initializeLanguage();
  }, [initializeLanguage]);

  return null;
}
