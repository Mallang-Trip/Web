"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRef, useEffect } from "react";

interface OtpProps {
  otpValue: string;
  isLoading: boolean;
  onOtpChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function Otp({
  otpValue,
  isLoading,
  onOtpChange,
  onSubmit,
}: OtpProps) {
  const otpInputRef = useRef<HTMLInputElement>(null);

  // 컴포넌트 마운트 시 자동 포커스
  useEffect(() => {
    const timer = setTimeout(() => {
      otpInputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <form className="grid gap-3" onSubmit={onSubmit}>
      <Label htmlFor="otp">인증번호</Label>
      <div className="mt-1 flex gap-2">
        <InputOTP
          ref={otpInputRef}
          id="otp"
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS}
          value={otpValue}
          onChange={onOtpChange}
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
  );
}
