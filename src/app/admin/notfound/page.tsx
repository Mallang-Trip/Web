"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/hooks/use-translation";

export default function AdminNotFoundPage() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 pt-16">
      <div className="mx-auto max-w-6xl px-6 py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold">{t.admin.notFound.title}</h1>
        <p className="mb-8 text-gray-600">{t.admin.notFound.description}</p>
        <div className="flex items-center justify-center gap-3">
          <Button onClick={() => router.replace("/")}>
            {t.admin.notFound.goHome}
          </Button>
        </div>
      </div>
    </div>
  );
}
