"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSendLoginSms, useVerifyLoginSms } from "@/hooks/use-auth-api";
import { getFirstEntryTarget } from "@/utils";
import { useAuthStore } from "@/stores/auth-store";
import PhoneNumber from "./phone-number";
import Otp from "./otp";
import NewAgreeDialog from "./new-agree-dialog";

export function LoginForm() {
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

  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl =
    searchParams.get("returnUrl") ||
    (typeof window !== "undefined" ? localStorage.getItem("returnUrl") : null);
  const firstEntryTarget =
    typeof window !== "undefined" ? getFirstEntryTarget() : "/";

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

  // 약관 동의 핸들러들
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

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>로그인</CardTitle>
          <CardDescription>
            전화번호 인증으로 로그인을 진행해주세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <PhoneNumber
              phonePrefix={formData.phonePrefix}
              phoneNumber={formData.phoneNumber}
              isCustomPhonePrefix={isCustomPhonePrefix}
              isLoading={isLoading}
              onPhonePrefixChange={(value) =>
                setFormData((prev) => ({ ...prev, phonePrefix: value }))
              }
              onPhoneNumberChange={(value) =>
                setFormData((prev) => ({ ...prev, phoneNumber: value }))
              }
              onCustomPhonePrefixToggle={setIsCustomPhonePrefix}
              onSubmit={handlePhoneSubmit}
            />

            {isOtpVisible && (
              <Otp
                otpValue={otpValue}
                isLoading={isLoading}
                onOtpChange={setOtpValue}
                onSubmit={handleOtpSubmit}
              />
            )}
          </div>
        </CardContent>
      </Card>

      {/* 신규 사용자 최초 로그인: 약관 동의 다이얼로그 */}
      <NewAgreeDialog
        isOpen={isTermsOpen}
        onOpenChange={setIsTermsOpen}
        agreeAll={agreeAll}
        agreeService={agreeService}
        agreeTravel={agreeTravel}
        agreePrivacy={agreePrivacy}
        agreeThirdparty={agreeThirdparty}
        onAgreeAllChange={handleAgreeAllChange}
        onIndividualAgreeChange={handleIndividualAgreeChange}
        onConfirm={handleConfirmTerms}
      />
    </div>
  );
}
