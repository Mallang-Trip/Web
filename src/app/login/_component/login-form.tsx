"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useRef, useEffect } from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";
import { CheckCircle, XCircle } from "lucide-react";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebase";
import { useAuthStore } from "@/stores/auth-store";
import { useRouter, useSearchParams } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [formData, setFormData] = useState({
    phonePrefix: "+82",
    phoneNumber: "",
  });
  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [txId, setTxId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const otpInputRef = useRef<HTMLInputElement>(null);
  const { login } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl =
    searchParams.get("returnUrl") ||
    (typeof window !== "undefined" ? localStorage.getItem("returnUrl") : null);

  // OTP 입력란이 보일 때 자동 포커스
  useEffect(() => {
    if (isOtpVisible && otpInputRef.current) {
      setTimeout(() => {
        otpInputRef.current?.focus();
      }, 100); // 약간의 지연을 주어 렌더링 완료 후 포커스
    }
  }, [isOtpVisible]);

  const handlePhoneSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const requestPhoneAuth = httpsCallable(functions, "requestPhoneAuth");
      const fullPhoneNumber = `${formData.phonePrefix}${formData.phoneNumber}`;

      const result = await requestPhoneAuth({ phone: fullPhoneNumber });
      const { txId: transactionId } = result.data as { txId: string };

      setTxId(transactionId);

      toast("인증번호가 전송되었습니다.", {
        description: `${formData.phonePrefix} ${formData.phoneNumber}`,
        icon: <CheckCircle className="text-green-500" />,
      });
      setIsOtpVisible(true);
    } catch (error: any) {
      console.error("SMS 전송 실패:", error);

      let errorMessage = "인증번호 전송에 실패했습니다.";
      if (error.code === "functions/invalid-argument") {
        errorMessage = "전화번호 형식이 올바르지 않습니다.";
      } else if (error.code === "functions/unavailable") {
        errorMessage = "SMS 전송 서비스를 사용할 수 없습니다.";
      }

      toast.error(errorMessage, {
        description: "다시 시도해주세요.",
        icon: <XCircle className="text-red-500" />,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const verifyPhoneSignup = httpsCallable(functions, "verifyPhoneSignup");

      const result = await verifyPhoneSignup({
        txId: txId,
        code: otpValue,
      });

      const { userToken } = result.data as { userToken: string };

      // Auth Store에 로그인 정보 저장
      const fullPhoneNumber = `${formData.phonePrefix}${formData.phoneNumber}`;
      login(userToken, fullPhoneNumber);

      toast.success("인증이 완료되었습니다.", {
        description: "로그인이 성공적으로 완료되었습니다.",
        icon: <CheckCircle className="text-green-500" />,
      });

      // 원래 접근하려던 페이지로 리다이렉트 (없으면 메인 페이지)
      setTimeout(() => {
        const redirectTo = returnUrl || "/";

        // returnUrl 정리
        if (typeof window !== "undefined") {
          localStorage.removeItem("returnUrl");
        }

        router.push(redirectTo);
      }, 1500);
    } catch (error: any) {
      console.error("인증 실패:", error);

      let errorMessage = "인증번호가 올바르지 않습니다.";
      if (error.code === "functions/not-found") {
        errorMessage = "유효하지 않은 인증 요청입니다.";
      } else if (error.code === "functions/permission-denied") {
        errorMessage = "인증번호가 일치하지 않습니다.";
      } else if (error.code === "functions/invalid-argument") {
        errorMessage = "인증 정보가 올바르지 않습니다.";
      }

      toast.error(errorMessage, {
        description: "다시 확인해주세요.",
        icon: <XCircle className="text-red-500" />,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 전화번호 입력 여부 확인
  const isPhoneNumberValid = formData.phoneNumber.trim().length > 0;

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>로그인</CardTitle>
          <CardDescription>
            전화번호 인증으로 로그인을 진행해주세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <form className="grid gap-3" onSubmit={handlePhoneSubmit}>
              <Label htmlFor="phone">국제 전화번호 (Phone)</Label>
              <div className="mt-1 flex gap-2">
                <select
                  value={formData.phonePrefix}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      phonePrefix: e.target.value,
                    }))
                  }
                  className="h-9 w-28 rounded-md border border-gray-300 px-3 py-2 text-sm"
                  disabled={isLoading}
                >
                  <option value="+82">🇰🇷 +82</option>
                  <option value="+86">🇨🇳 +86</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+81">🇯🇵 +81</option>
                  <option value="+886">🇹🇼 +886</option>
                </select>
                <Input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      phoneNumber: e.target.value,
                    }))
                  }
                  placeholder="'-' 제외 숫자만 입력"
                  required
                  className="flex-1"
                  disabled={isLoading}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={!isPhoneNumberValid || isLoading}
                >
                  {isLoading ? "전송 중..." : "인증번호 전송"}
                </Button>
              </div>
            </form>

            {isOtpVisible && (
              <form className="grid gap-3" onSubmit={handleOtpSubmit}>
                <Label htmlFor="otp">인증번호</Label>
                <div className="mt-1 flex gap-2">
                  <InputOTP
                    ref={otpInputRef}
                    id="otp"
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS}
                    value={otpValue}
                    onChange={(value) => setOtpValue(value)}
                    disabled={isLoading}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  <div className="flex-1">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={otpValue.length !== 6 || isLoading}
                    >
                      {isLoading ? "인증 중..." : "인증하기"}
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </div>
          <div className="mt-4 text-center text-sm">
            문제가 발생했나요?{" "}
            <a href="#" className="underline underline-offset-4">
              문의하기
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
