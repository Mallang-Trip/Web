"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ShimmeringText } from "@/components/ui/shadcn-io/shimmering-text";
import Loading from "@/components/loading";
import { track } from "@/lib/analytics";
import { useTranslation } from "@/hooks/use-translation";

function PaypalReturnPageInner() {
  const { t } = useTranslation();
  const search = useSearchParams();

  useEffect(() => {
    // PayPal은 token (orderId)과 PayerID를 반환합니다
    const orderId = search.get("token") || "";
    const payerId = search.get("PayerID") || "";
    const paymentNumber = sessionStorage.getItem("paypalPaymentNumber") || "";

    if (orderId && (window.opener as Window | null) && window.opener.postMessage) {
      window.opener.postMessage(
        {
          type: "PAYPAL_AUTH_RETURN",
          orderId,
          payerId,
          paymentNumber,
          success: true,
        },
        window.location.origin,
      );
    }

    setTimeout(() => {
      window.close();
    }, 1500);

    try {
      track("payment_return", {
        provider: "paypal",
        hasOrderId: !!orderId,
        hasPayerId: !!payerId,
      });
    } catch {}
  }, [search]);

  return (
    <div className="flex min-h-dvh items-center justify-center">
      <div className="flex items-center gap-3 text-gray-700">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
        <ShimmeringText
          text={t.payple.return.processingMessage}
          duration={0.7}
          wave={true}
          shimmeringColor="hsl(var(--primary))"
          className="text-xl font-semibold"
        />
      </div>
    </div>
  );
}

function PaypalReturnPageWrapper() {
  const { t } = useTranslation();

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <Loading text={t.payple.return.loadingText} />
        </div>
      }
    >
      <PaypalReturnPageInner />
    </Suspense>
  );
}

export default function PaypalReturnPage() {
  return <PaypalReturnPageWrapper />;
}
