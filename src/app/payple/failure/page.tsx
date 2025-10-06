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
import FailureIcon from "./_component/failure-icon";

const DEFAULT_ERROR_MESSAGE =
  "결제 진행 중 문제가 발생했습니다.\n잠시 후 다시 시도해주세요.";

export default function PaypleFailurePage() {
  const [message, setMessage] = useState<string>(DEFAULT_ERROR_MESSAGE);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get("message") || "";
    const normalized = (raw ? raw : DEFAULT_ERROR_MESSAGE).replace(
      /\\n/g,
      "\n",
    );
    setMessage(normalized);

    // 주소창에서 쿼리 제거 (뒤로 가기 시에도 파라미터가 남지 않도록 동일 히스토리 항목 교체)
    try {
      const cleanUrl = `${window.location.origin}/payple/failure`;
      window.history.replaceState(window.history.state, "", cleanUrl);
    } catch {}
  }, []);

  return (
    <div className="bg-background flex min-h-dvh items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="items-center justify-items-center border-b border-gray-200 text-center">
          <FailureIcon />
          <CardTitle className="text-xl">결제에 실패했습니다</CardTitle>
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
          >
            닫기
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
