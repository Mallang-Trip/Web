"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const Loading = () => {
  return (
    <div className="flex min-h-dvh items-center justify-center">
      <div className="flex items-center gap-3 text-gray-700">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
        <span>결제가 진행 중입니다. 잠시만 기다려주세요…</span>
      </div>
    </div>
  );
};

function PaypleReturnContent() {
  const search = useSearchParams();

  useEffect(() => {
    const payNum = search.get("paymentNumber") || "";
    try {
      if (payNum) {
        localStorage.setItem("payplePaymentNumber", payNum);
      }
    } catch {}
    try {
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
    } catch {}
    setTimeout(() => {
      try {
        window.close();
      } catch {}
    }, 1000);
  }, [search]);

  return <Loading />;
}

export default function PaypleReturnPage() {
  return (
    <Suspense fallback={<Loading />}>
      <PaypleReturnContent />
    </Suspense>
  );
}
