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
import { useState } from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";
import { CheckCircle, XCircle } from "lucide-react";

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

  const handlePhoneSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    toast("인증번호가 전송되었습니다.", {
      description: `${formData.phonePrefix} ${formData.phoneNumber}`,
      icon: <CheckCircle className="text-green-500" />,
    });
    setIsOtpVisible(true);
  };

  const handleOtpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("OTP:", otpValue);
    toast.error("인증번호가 올바르지 않습니다.", {
      description: "다시 확인해주세요.",
      icon: <XCircle className="text-red-500" />,
    });
  };

  // 전화번호 입력 여부 확인
  const isPhoneNumberValid = formData.phoneNumber.trim().length > 0;

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>본인 인증</CardTitle>
          <CardDescription>
            전화번호로 본인 인증을 진행해주세요.
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
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={!isPhoneNumberValid}
                >
                  인증번호 전송
                </Button>
              </div>
            </form>

            {isOtpVisible && (
              <form className="grid gap-3" onSubmit={handleOtpSubmit}>
                <Label htmlFor="otp">인증번호</Label>
                <div className="mt-1 flex gap-2">
                  <InputOTP
                    id="otp"
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS}
                    value={otpValue}
                    onChange={(value) => setOtpValue(value)}
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
                      disabled={otpValue.length !== 6}
                    >
                      인증하기
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
