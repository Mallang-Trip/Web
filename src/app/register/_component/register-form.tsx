"use client";

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
import { useEffect, useRef, useState } from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSendRegisterSms, useVerifyRegisterSms } from "@/hooks/use-auth-api";
import Link from "next/link";

export function RegisterForm() {
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

  const sendRegisterSms = useSendRegisterSms();
  const verifyRegisterSms = useVerifyRegisterSms();

  // OTP 보이면 포커스
  useEffect(() => {
    if (isOtpVisible && otpInputRef.current) {
      setTimeout(() => otpInputRef.current?.focus(), 100);
    }
  }, [isOtpVisible]);

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // 국제 전화번호 조합 (KR 정책: 010 → 10 으로 변환)
      const digitsOnly = formData.phoneNumber.replace(/\D/g, "");
      const normalizedLocal =
        formData.phonePrefix === "+82" && digitsOnly.startsWith("010")
          ? digitsOnly.slice(1)
          : digitsOnly;
      const fullPhone = `${formData.phonePrefix}${normalizedLocal}`;
      const res = await sendRegisterSms.mutateAsync({ phoneNumber: fullPhone });
      const transactionId = res?.txId as string;
      setTxId(transactionId);
      toast("인증번호가 전송되었습니다.", {
        description: `${formData.phonePrefix} ${formData.phoneNumber}`,
        icon: <CheckCircle className="text-green-500" />,
      });
      setIsOtpVisible(true);
    } catch (error: unknown) {
      const message = (error as { message?: string })?.message;
      toast.error("인증번호 전송 실패", {
        description: message || "다시 시도해주세요.",
        icon: <XCircle className="text-red-500" />,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await verifyRegisterSms.mutateAsync({
        txId,
        verificationCode: otpValue,
      });

      toast.success("회원가입이 완료되었습니다.", {
        description: "자동으로 로그인되었습니다.",
        icon: <CheckCircle className="text-green-500" />,
      });

      setTimeout(() => router.push("/"), 1200);
    } catch (error: unknown) {
      const message = (error as { message?: string })?.message;
      toast.error(message || "인증 실패", {
        description: "다시 확인해주세요.",
        icon: <XCircle className="text-red-500" />,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isPhoneValid = formData.phoneNumber.trim().length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>회원가입</CardTitle>
        <CardDescription>
          휴대폰 인증으로 회원가입을 진행해주세요.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <form className="grid gap-3" onSubmit={handleSend}>
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
            <Button
              type="submit"
              className="w-full"
              disabled={!isPhoneValid || isLoading}
            >
              {isLoading ? "전송 중..." : "인증번호 전송"}
            </Button>
          </form>

          {isOtpVisible && (
            <form className="grid gap-3" onSubmit={handleVerify}>
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
                    {isLoading ? "인증 중..." : "회원가입 완료"}
                  </Button>
                </div>
              </div>
            </form>
          )}
        </div>
        <div className="mt-4 text-center text-sm">
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className="underline underline-offset-4">
            로그인
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
