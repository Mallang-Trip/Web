"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { track } from "@/lib/analytics";
import { useTranslation } from "@/hooks/use-translation";
import { XCircle } from "lucide-react";
import { GA_EVENTS } from "@/lib/analytics-events";

export default function PaypalCancelPage() {
  const { t } = useTranslation();
  const [message, setMessage] = useState<string>(
    "Your payment has been canceled.",
  );

  useEffect(() => {
    // 저장된 결제번호 삭제
    try {
      sessionStorage.removeItem("paypalPaymentNumber");
    } catch {}

    const params = new URLSearchParams(window.location.search);
    const raw = params.get("message") || "";
    const normalized = (raw ? raw : "Your payment has been canceled.").replace(
      /\\n/g,
      "\n",
    );
    setMessage(normalized);

    // 주소창에서 쿼리 제거
    try {
      const cleanUrl = `${window.location.origin}/paypal/cancel`;
      window.history.replaceState(window.history.state, "", cleanUrl);
    } catch {}

    try {
      track("payment_cancel", {
        provider: "paypal",
        message: normalized.slice(0, 200),
      });
    } catch {}
  }, []);

  return (
    <div className="bg-background flex min-h-dvh items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="items-center justify-items-center border-b border-gray-200 text-center">
          <XCircle className="h-16 w-16 text-yellow-500" />
          <CardTitle className="text-xl">Cancellation of payment</CardTitle>
          <CardDescription className="whitespace-pre-line">
            {message}
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-center">
          <Button
            onClick={() => {
              try {
                window.close();
              } catch {}
            }}
            className="px-6"
            gaEvent={GA_EVENTS.CLOSE_PAYPAL_CANCELLATION}
          >
            {t.payple.failure.closeButton}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
