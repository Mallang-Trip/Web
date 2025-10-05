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
import { getFirstEntryTarget } from "@/utils";
import { Combobox } from "@/components/ui/combobox";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuthStore } from "@/stores/auth-store";

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
  const [isCustomPhonePrefix, setIsCustomPhonePrefix] = useState(false);

  // 신규 사용자 최초 로그인: 약관 동의 다이얼로그 상태 및 동의 항목들
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [agreeAll, setAgreeAll] = useState(false);
  const [agreeService, setAgreeService] = useState(false);
  const [agreeTravel, setAgreeTravel] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeThirdparty, setAgreeThirdparty] = useState(false);
  const [pendingAccessToken, setPendingAccessToken] = useState<string | null>(
    null,
  );
  const [pendingRefreshToken, setPendingRefreshToken] = useState<string | null>(
    null,
  );
  const [pendingPhoneNumber, setPendingPhoneNumber] = useState<string | null>(
    null,
  );

  const otpInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl =
    searchParams.get("returnUrl") ||
    (typeof window !== "undefined" ? localStorage.getItem("returnUrl") : null);
  const firstEntryTarget =
    typeof window !== "undefined" ? getFirstEntryTarget() : "/";

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
  const { loginWithTokens } = useAuthStore();

  const handlePhoneSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!/^\+\d{1,3}$/.test(formData.phonePrefix)) {
      toast.error("국가 번호를 '+숫자' 형식으로 입력해주세요. 예: +82", {
        icon: <XCircle className="text-red-500" />,
      });
      return;
    }

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
      const result = await verifyLoginSms.mutateAsync({
        txId,
        verificationCode: otpValue,
        phoneNumber: fullPhoneNumber,
      });
      const api = result?.api as
        | {
            accessToken?: string;
            refreshToken?: string;
            isNewUser?: boolean;
          }
        | undefined;

      const accessToken = api?.accessToken || "";
      const refreshToken = api?.refreshToken || "";
      const isNewUser = Boolean(api?.isNewUser);

      if (!accessToken || !refreshToken) {
        throw new Error("토큰 정보를 확인할 수 없습니다.");
      }

      if (isNewUser) {
        // 신규 사용자: 약관 동의 후 로그인 진행
        setPendingAccessToken(accessToken);
        setPendingRefreshToken(refreshToken);
        setPendingPhoneNumber(fullPhoneNumber);
        setIsTermsOpen(true);
        toast.info("최초 로그인입니다. 약관 동의가 필요합니다.");
      } else {
        // 기존 사용자: 즉시 로그인 처리
        loginWithTokens(accessToken, refreshToken, fullPhoneNumber);
        toast.success("인증이 완료되었습니다.", {
          description: "로그인이 성공적으로 완료되었습니다.",
          icon: <CheckCircle className="text-green-500" />,
        });
        setTimeout(() => {
          const redirectTo = returnUrl || firstEntryTarget || "/";
          if (typeof window !== "undefined") {
            localStorage.removeItem("returnUrl");
          }
          router.push(redirectTo);
        }, 1200);
      }
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

  // 약관 동의 핸들러들 (예약 폼과 동일한 동작)
  const handleAgreeAllChange = (checked: boolean) => {
    setAgreeAll(checked);
    setAgreeService(checked);
    setAgreeTravel(checked);
    setAgreePrivacy(checked);
    setAgreeThirdparty(checked);
  };
  const handleIndividualAgreeChange = (field: string, checked: boolean) => {
    const next = {
      service: field === "agreeService" ? checked : agreeService,
      travel: field === "agreeTravel" ? checked : agreeTravel,
      privacy: field === "agreePrivacy" ? checked : agreePrivacy,
      third: field === "agreeThirdparty" ? checked : agreeThirdparty,
    };
    setAgreeService(next.service);
    setAgreeTravel(next.travel);
    setAgreePrivacy(next.privacy);
    setAgreeThirdparty(next.third);
    const allChecked =
      next.service && next.travel && next.privacy && next.third;
    setAgreeAll(allChecked);
  };

  const handleConfirmTerms = () => {
    const allChecked =
      agreeService && agreeTravel && agreePrivacy && agreeThirdparty;
    if (!allChecked) {
      toast.error("약관에 모두 동의해주세요.", {
        description: "[필수] 항목들을 확인 후 체크해주세요.",
        icon: <XCircle className="text-red-500" />,
      });
      return;
    }
    if (!pendingAccessToken || !pendingRefreshToken || !pendingPhoneNumber) {
      toast.error("로그인 정보를 확인할 수 없습니다.");
      return;
    }
    loginWithTokens(
      pendingAccessToken,
      pendingRefreshToken,
      pendingPhoneNumber,
    );
    setIsTermsOpen(false);
    setPendingAccessToken(null);
    setPendingRefreshToken(null);
    setPendingPhoneNumber(null);
    toast.success("회원가입 및 로그인 완료", {
      description: "약관 동의가 완료되어 로그인되었습니다.",
      icon: <CheckCircle className="text-green-500" />,
    });
    setTimeout(() => {
      const redirectTo = returnUrl || firstEntryTarget || "/";
      if (typeof window !== "undefined") {
        localStorage.removeItem("returnUrl");
      }
      router.push(redirectTo);
    }, 800);
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
                <Combobox
                  value={
                    isCustomPhonePrefix ? "__custom__" : formData.phonePrefix
                  }
                  onChange={(v) => {
                    const value = v || "+82";
                    if (value === "__custom__") {
                      setIsCustomPhonePrefix(true);
                      setFormData((prev) => ({ ...prev, phonePrefix: "+" }));
                    } else {
                      setIsCustomPhonePrefix(false);
                      setFormData((prev) => ({ ...prev, phonePrefix: value }));
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
                    value={formData.phonePrefix}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        phonePrefix: e.target.value.replace(/\s/g, ""),
                      }))
                    }
                    placeholder="+82"
                    className="h-9 w-20"
                    aria-label="국가 번호 직접 입력"
                  />
                )}
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

      {/* 신규 사용자 최초 로그인: 약관 동의 다이얼로그 */}
      <Dialog open={isTermsOpen} onOpenChange={setIsTermsOpen}>
        <DialogContent className="border-none bg-white">
          <DialogHeader>
            <DialogTitle>약관 동의</DialogTitle>
            <DialogDescription>
              서비스 이용을 위해 아래 필수 약관에 동의해 주세요.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-2 space-y-3">
            <div className="mb-3 flex items-center space-x-2">
              <input
                type="checkbox"
                id="loginAgreeAll"
                checked={agreeAll}
                onChange={(e) => handleAgreeAllChange(e.target.checked)}
                className="h-5 w-5 accent-blue-600"
              />
              <label
                htmlFor="loginAgreeAll"
                className="cursor-pointer text-base font-semibold"
              >
                아래 약관에 모두 동의합니다.
              </label>
            </div>

            <hr className="my-2 border-t border-gray-200" />

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="loginAgreeService"
                  checked={agreeService}
                  onChange={(e) =>
                    handleIndividualAgreeChange(
                      "agreeService",
                      e.target.checked,
                    )
                  }
                  className="h-4 w-4 accent-blue-600"
                  required
                />
                <label
                  htmlFor="loginAgreeService"
                  className="flex cursor-pointer items-center gap-1 text-sm"
                >
                  <span className="text-red-500">[필수]</span>
                  <Link
                    href="/policy/service"
                    target="_blank"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    말랑트립 투어 서비스 이용약관
                  </Link>
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="loginAgreeTravel"
                  checked={agreeTravel}
                  onChange={(e) =>
                    handleIndividualAgreeChange("agreeTravel", e.target.checked)
                  }
                  className="h-4 w-4 accent-blue-600"
                  required
                />
                <label
                  htmlFor="loginAgreeTravel"
                  className="flex cursor-pointer items-center gap-1 text-sm"
                >
                  <span className="text-red-500">[필수]</span>
                  <Link
                    href="/policy/travel"
                    target="_blank"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    말랑트립 투어 국내여행 표준약관
                  </Link>
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="loginAgreePrivacy"
                  checked={agreePrivacy}
                  onChange={(e) =>
                    handleIndividualAgreeChange(
                      "agreePrivacy",
                      e.target.checked,
                    )
                  }
                  className="h-4 w-4 accent-blue-600"
                  required
                />
                <label
                  htmlFor="loginAgreePrivacy"
                  className="flex cursor-pointer items-center gap-1 text-sm"
                >
                  <span className="text-red-500">[필수]</span>
                  <Link
                    href="/policy/privacy"
                    target="_blank"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    개인정보 수집·이용 동의
                  </Link>
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="loginAgreeThirdparty"
                  checked={agreeThirdparty}
                  onChange={(e) =>
                    handleIndividualAgreeChange(
                      "agreeThirdparty",
                      e.target.checked,
                    )
                  }
                  className="h-4 w-4 accent-blue-600"
                  required
                />
                <label
                  htmlFor="loginAgreeThirdparty"
                  className="flex cursor-pointer items-center gap-1 text-sm"
                >
                  <span className="text-red-500">[필수]</span>
                  <Link
                    href="/policy/thirdparty"
                    target="_blank"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    개인정보 제3자 제공 동의
                  </Link>
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              className="w-full"
              onClick={handleConfirmTerms}
              disabled={
                !(
                  agreeService &&
                  agreeTravel &&
                  agreePrivacy &&
                  agreeThirdparty
                )
              }
            >
              동의하고 계속하기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
