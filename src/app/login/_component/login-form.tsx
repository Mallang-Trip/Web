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
import { track } from "@/lib/analytics";
import { useTranslation } from "@/hooks/use-translation";

export function LoginForm() {
  const { t } = useTranslation();
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
      toast.error(t.login.toast.invalidCountryCode, {
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

      toast(t.login.toast.codeSent, {
        description: `${formData.phonePrefix} ${formData.phoneNumber}`,
        icon: <CheckCircle className="text-green-500" />,
      });
      setIsOtpVisible(true);
      try {
        track("send_login_code");
      } catch {}
    } catch (error: unknown) {
      console.error("SMS 전송 실패:", error);
      const message = (error as { message?: string })?.message;
      const serverMessage = message || t.login.toast.codeSendFailedDescription;

      toast.error(t.login.toast.codeSendFailed, {
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
        throw new Error(t.login.toast.tokenError);
      }

      if (isNewUser) {
        // 신규 사용자: 약관 동의 후 로그인 진행
        setPendingAccessToken(accessToken);
        setPendingRefreshToken(refreshToken);
        setPendingPhoneNumber(fullPhoneNumber);
        setIsTermsOpen(true);
        toast.info(t.login.toast.firstTimeLogin);
      } else {
        // 기존 사용자: 즉시 로그인 처리
        loginWithTokens(accessToken, refreshToken, fullPhoneNumber);
        toast.success(t.login.toast.verificationSuccess, {
          description: t.login.toast.verificationSuccessDescription,
          icon: <CheckCircle className="text-green-500" />,
        });
        try {
          track("login", { method: "phone_otp" });
        } catch {}
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
      const title = err?.message || t.login.toast.verificationFailed;
      let description = t.login.toast.verificationFailedDescription;
      if (err?.status === 404) {
        description = t.login.toast.sessionNotFound;
      } else if (err?.status === 429) {
        description = t.login.toast.maxAttemptsExceeded;
      } else if (err?.status === 400) {
        description = t.login.toast.codeNotMatch;
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
      toast.error(t.login.toast.agreeToTerms, {
        description: t.login.toast.agreeToTermsDescription,
        icon: <XCircle className="text-red-500" />,
      });
      return;
    }
    if (!pendingAccessToken || !pendingRefreshToken || !pendingPhoneNumber) {
      toast.error(t.login.toast.cannotFindLoginInfo);
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
    toast.success(t.login.toast.signupAndLoginSuccess, {
      description: t.login.toast.signupAndLoginSuccessDescription,
      icon: <CheckCircle className="text-green-500" />,
    });
    try {
      track("sign_up", { method: "phone_otp" });
      track("login", { method: "phone_otp" });
    } catch {}
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
          <CardTitle>{t.login.page.title}</CardTitle>
          <CardDescription>{t.login.page.description}</CardDescription>
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
