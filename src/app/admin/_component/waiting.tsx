"use client";

import Loading from "@/components/loading";
import { useTranslation } from "@/hooks/use-translation";

interface WaitingProps {
  hasHydrated: boolean;
}

export default function Waiting({ hasHydrated }: WaitingProps) {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Loading
        text={
          !hasHydrated
            ? t.admin.waiting.loadingData
            : t.admin.waiting.checkingAuth
        }
      />
    </div>
  );
}
