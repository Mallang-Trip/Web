"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Combobox } from "@/components/ui/combobox";

interface PhoneNumberProps {
  phonePrefix: string;
  phoneNumber: string;
  isCustomPhonePrefix: boolean;
  isLoading: boolean;
  onPhonePrefixChange: (value: string) => void;
  onPhoneNumberChange: (value: string) => void;
  onCustomPhonePrefixToggle: (isCustom: boolean) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function PhoneNumber({
  phonePrefix,
  phoneNumber,
  isCustomPhonePrefix,
  isLoading,
  onPhonePrefixChange,
  onPhoneNumberChange,
  onCustomPhonePrefixToggle,
  onSubmit,
}: PhoneNumberProps) {
  const isPhoneNumberValid = phoneNumber.trim().length > 0;

  return (
    <form className="grid gap-3" onSubmit={onSubmit}>
      <Label htmlFor="phone">국제 전화번호 *</Label>
      <div className="mt-1 flex gap-2">
        <Combobox
          value={isCustomPhonePrefix ? "__custom__" : phonePrefix}
          onChange={(v) => {
            const value = v || "+82";
            if (value === "__custom__") {
              onCustomPhonePrefixToggle(true);
              onPhonePrefixChange("+");
            } else {
              onCustomPhonePrefixToggle(false);
              onPhonePrefixChange(value);
            }
          }}
          options={[
            { value: "+82", label: "🇰🇷 +82" },
            { value: "+86", label: "🇨🇳 +86" },
            { value: "+1", label: "🇺🇸 +1" },
            { value: "+81", label: "🇯🇵 +81" },
            { value: "+886", label: "🇹🇼 +886" },
            { value: "__custom__", label: "직접 입력" },
          ]}
          widthClassName="w-28"
          buttonClassName="h-9 text-sm"
          disabled={isLoading}
          modal
        />
        {isCustomPhonePrefix && (
          <Input
            type="text"
            value={phonePrefix}
            onChange={(e) =>
              onPhonePrefixChange(e.target.value.replace(/\s/g, ""))
            }
            placeholder="+82"
            className="h-9 w-20"
            aria-label="국가 번호 직접 입력"
          />
        )}
        <Input
          type="tel"
          value={phoneNumber}
          onChange={(e) => onPhoneNumberChange(e.target.value)}
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
  );
}
