"use client";

import { useEffect } from "react";
import { captureFirstEntryIfNeeded } from "@/utils";

export function FirstEntryProvider() {
  useEffect(() => {
    captureFirstEntryIfNeeded();
  }, []);

  return null;
}
