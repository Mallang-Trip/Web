"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AdminNotFoundPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 pt-16">
      <div className="mx-auto max-w-6xl px-6 py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold">접근 권한이 없습니다</h1>
        <p className="mb-8 text-gray-600">
          요청하신 페이지에 접근할 수 없습니다.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button onClick={() => router.replace("/")}>홈으로 이동</Button>
        </div>
      </div>
    </div>
  );
}
