"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ShimmeringText } from "@/components/ui/shadcn-io/shimmering-text";
import Loading from "@/components/loading";

function PaypleReturnPageInner() {
  const search = useSearchParams();

  useEffect(() => {
    const payNum = search.get("paymentNumber") || "";
    if (payNum) localStorage.setItem("payplePaymentNumber", payNum);

    if (
      payNum &&
      (window.opener as Window | null) &&
      window.opener.postMessage
    ) {
      window.opener.postMessage(
        { type: "PAYPLE_AUTH_RETURN", paymentNumber: payNum },
        window.location.origin,
      );
    }

    setTimeout(() => {
      window.close();
    }, 1500);
  }, [search]);

  return (
    <div className="flex min-h-dvh items-center justify-center">
      <div className="flex items-center gap-3 text-gray-700">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
        <ShimmeringText
          text="결제가 진행 중입니다. 잠시만 기다려주세요…"
          duration={0.7}
          wave={true}
          shimmeringColor="hsl(var(--primary))"
          className="text-xl font-semibold"
        />
      </div>
    </div>
  );
}

export default function PaypleReturnPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <Loading text="로딩 중..." />
        </div>
      }
    >
      <PaypleReturnPageInner />
    </Suspense>
  );
}
