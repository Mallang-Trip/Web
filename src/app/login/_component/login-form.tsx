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
import { useRouter, useSearchParams } from "next/navigation";
import { useSendLoginSms, useVerifyLoginSms } from "@/hooks/use-auth-api";

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

  const sendLoginSms = useSendLoginSms();
  const verifyLoginSms = useVerifyLoginSms();

  const handlePhoneSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 국제 전화번호 조합 (KR 정책: 010 → 10 으로 변환)
      const digitsOnly = formData.phoneNumber.replace(/\D/g, "");
      const normalizedLocal =
        formData.phonePrefix === "+82" && digitsOnly.startsWith("010")
          ? digitsOnly.slice(1)
          : digitsOnly;
      const fullPhoneNumber = `${formData.phonePrefix}${normalizedLocal}`;
      const res = await sendLoginSms.mutateAsync({
        phoneNumber: fullPhoneNumber,
      });
      const transactionId = res?.txId as string;

      setTxId(transactionId);

      toast("인증번호가 전송되었습니다.", {
        description: `${formData.phonePrefix} ${formData.phoneNumber}`,
        icon: <CheckCircle className="text-green-500" />,
      });
      setIsOtpVisible(true);
    } catch (error: unknown) {
      console.error("SMS 전송 실패:", error);
      const message = (error as { message?: string })?.message;
      const serverMessage = message || "인증번호 전송에 실패했습니다.";

      toast.error("인증번호 전송 실패", {
        description: serverMessage,
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
      // 국제 전화번호 조합 (KR 정책: 010 → 10 으로 변환)
      const digitsOnly = formData.phoneNumber.replace(/\D/g, "");
      const normalizedLocal =
        formData.phonePrefix === "+82" && digitsOnly.startsWith("010")
          ? digitsOnly.slice(1)
          : digitsOnly;
      const fullPhoneNumber = `${formData.phonePrefix}${normalizedLocal}`;
      await verifyLoginSms.mutateAsync({
        txId,
        verificationCode: otpValue,
        phoneNumber: fullPhoneNumber,
      });

      toast.success("인증이 완료되었습니다.", {
        description: "로그인이 성공적으로 완료되었습니다.",
        icon: <CheckCircle className="text-green-500" />,
      });

      // 원래 접근하려던 페이지로 리다이렉트 (없으면 메인 페이지)
      setTimeout(() => {
        const redirectTo = returnUrl || "/detail/vip";

        // returnUrl 정리
        if (typeof window !== "undefined") {
          localStorage.removeItem("returnUrl");
        }

        router.push(redirectTo);
      }, 1500);
    } catch (error: unknown) {
      console.error("인증 실패:", error);
      const err = error as { message?: string; status?: number } | undefined;
      const title = err?.message || "인증번호가 올바르지 않습니다.";
      let description = "다시 확인해주세요.";
      if (err?.status === 404) {
        description =
          "인증 세션을 찾을 수 없습니다. 인증번호를 다시 요청해주세요.";
      } else if (err?.status === 429) {
        description =
          "최대 시도 횟수를 초과했습니다. 새로운 인증번호를 요청해주세요.";
      } else if (err?.status === 400) {
        description = "인증코드가 일치하지 않습니다. 다시 입력해주세요.";
      }

      toast.error(title, {
        description,
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
              <Label htmlFor="phone">국제 전화번호 *</Label>
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
        </CardContent>
      </Card>
    </div>
  );
}
