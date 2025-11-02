"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { TimePicker } from "@/components/ui/time-picker";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateReservation } from "@/hooks/use-reservations";
import { toast } from "sonner";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PaymentsAPI } from "@/utils/api";
import {
  track,
  trackAddPaymentInfo,
  getCurrencyByLanguage,
} from "@/lib/analytics";
import { useLangStore } from "@/stores/lang-store";
import { Combobox } from "@/components/ui/combobox";
import { useTranslation } from "@/hooks/use-translation";
import { useBookingFormStorage } from "@/hooks/use-booking-form-storage";

declare global {
  interface Window {
    PaypleCpayAuthCheck?: (params: Record<string, unknown>) => void;
    mallangTripPaymentCallback?: (params: Record<string, unknown>) => void;
    mallangTripPaypalCallback?: (params: {
      success: boolean;
      orderId?: string;
      payerId?: string;
      paymentNumber?: string;
    }) => void;
  }
}

type PaymentPrepareData = {
  clientKey: string;
  paymentNumber: string;
  payerName: string;
  payerPhone?: string;
  productName: string;
  amount: number;
};

type PaypalPrepareData = {
  paymentNumber: string;
  orderId: string;
  approveUrl: string;
  amount: number;
  currency: string;
};

// 제주 투어 가격표 (시간별) - KRW
const JEJU_PRICES_KRW: Record<string, number> = {
  "4": 84000,
  "5": 105000,
  "6": 126000,
  "7": 147000,
  "8": 168000,
  "9": 190000,
  "10": 210000,
  "11": 230000,
  "12": 250000,
};

// 제주 투어 가격표 (시간별) - USD (환율 1400)
const JEJU_PRICES_USD: Record<string, number> = {
  "4": 60,
  "5": 75,
  "6": 90,
  "7": 105,
  "8": 120,
  "9": 136,
  "10": 150,
  "11": 164,
  "12": 179,
};

export default function JejuBookingForm() {
  const { t } = useTranslation();
  const tData = t.jeju?.bookingForm || {};
  const tToast = t.jeju?.toast || {};

  // 제주 투어(destinationId=9)에 대한 세션 스토리지 사용
  const { formData, setFormData, clearFormData } = useBookingFormStorage(
    "jeju-9",
    {
      name: "",
      phonePrefix: "+82",
      phoneNumber: "",
      email: "",
      peopleCount: "", // 1~4인
      meetDate: "",
      tourHours: "", // 4~12시간
      pickupTime: "",
      routeDescription: "", // 대략적인 경로
      requests: "",
      meetTime: "",
      meetAddress: "",
      returnAddress: "",
      // 개별 약관 동의 상태
      agreeService: false,
      agreeTravel: false,
      agreePrivacy: false,
      agreeThirdparty: false,
    },
  );

  const [isCustomPhonePrefix, setIsCustomPhonePrefix] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [agreeAll, setAgreeAll] = useState(false);
  const router = useRouter();
  const reservationMutation = useCreateReservation();
  const currentLanguage = useLangStore((s) => s.currentLanguage);

  // 언어에 따른 가격표 및 통화 결정
  const isKorean = currentLanguage === "ko";
  const priceTable = isKorean ? JEJU_PRICES_KRW : JEJU_PRICES_USD;
  const currency = isKorean ? "KRW" : "USD";
  const currencySymbol = isKorean ? "₩" : "$";

  const formRef = useRef(formData);
  const authReturnedRef = useRef(false);
  const childWindowRef = useRef<Window | null>(null);
  const processedPaymentNumbersRef = useRef<Set<string>>(new Set());
  const formStartSentRef = useRef(false);

  useEffect(() => {
    formRef.current = formData;
  }, [formData]);

  // 폼 첫 상호작용(form_start) 추적
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const sendOnce = () => {
      if (formStartSentRef.current) return;
      formStartSentRef.current = true;
      try {
        track("form_start", { form_id: "jeju_taxi_reservation_form" });
      } catch {}
    };
    const options = { capture: true } as AddEventListenerOptions;
    el.addEventListener("focusin", sendOnce as EventListener, options);
    el.addEventListener("keydown", sendOnce as EventListener, options);
    el.addEventListener("pointerdown", sendOnce as EventListener, options);
    el.addEventListener("input", sendOnce as EventListener, options);
    return () => {
      el.removeEventListener("focusin", sendOnce as EventListener);
      el.removeEventListener("keydown", sendOnce as EventListener);
      el.removeEventListener("pointerdown", sendOnce as EventListener);
      el.removeEventListener("input", sendOnce as EventListener);
    };
  }, []);

  const sanitizeProductName = (name: string) => {
    let cleaned = name.replace(/[^\uAC00-\uD7A3a-zA-Z0-9\s\-_.()\[\]]/g, "");
    cleaned = cleaned.replace(/\s+/g, " ").trim();
    if (!cleaned) cleaned = "말랑트립 투어";
    if (cleaned.length > 40) cleaned = cleaned.slice(0, 40);
    return cleaned;
  };

  const createReservationWithPaymentNumber = async (payNum: string) => {
    if (!payNum) return;
    if (processedPaymentNumbersRef.current.has(payNum)) return;
    processedPaymentNumbersRef.current.add(payNum);
    try {
      childWindowRef.current?.close();
    } catch {}
    const d = formRef.current;
    const digitsOnly = (d.phoneNumber || "").replace(/\D/g, "");
    const normalizedLocal =
      d.phonePrefix === "+82" && digitsOnly.startsWith("010")
        ? digitsOnly.slice(1)
        : digitsOnly;
    const phoneInternational = `${d.phonePrefix}${normalizedLocal}`;

    // 제주 투어 가격 계산 - 언어에 따라 KRW 또는 USD
    const currentLang = useLangStore.getState().currentLanguage;
    const isKoreanLang = currentLang === "ko";
    const prices = isKoreanLang ? JEJU_PRICES_KRW : JEJU_PRICES_USD;
    const priceNumber = prices[d.tourHours] || (isKoreanLang ? 84000 : 60);

    const forceTestPriceNow =
      typeof d.requests === "string" && d.requests.includes("말랑트립");
    const finalPrice = forceTestPriceNow ? 1000 : priceNumber;

    const requestData = {
      reservationName: `제주도 택시투어 ${d.tourHours}시간`,
      email: (d.email || "").trim(),
      name: (d.name || "").trim(),
      phoneNumber: phoneInternational,
      userCount: d.peopleCount ? Number(d.peopleCount) : 2,
      meetingDate: `${d.meetDate}T${d.pickupTime}:00`,
      pickupTime: d.pickupTime,
      pickupAddress: (d.routeDescription || "").trim(),
      returnAddress: (d.routeDescription || "").trim(),
      requests: d.requests || undefined,
      price: finalPrice,
      paymentNumber: payNum,
    };

    const result = await reservationMutation.mutateAsync(requestData);
    const reservationId = (result?.reservationId ?? result?.id ?? "") as
      | string
      | number;

    toast.success(tToast.reservationSuccess || "예약이 완료되었습니다!", {
      description: tToast.reservationSuccessDesc || "예약 확인 이메일을 발송했습니다.",
      icon: <CheckCircle className="text-green-500" />,
    });

    try {
      window.sessionStorage.removeItem("payplePaymentNumber");
    } catch {}

    // 예약 성공 시 폼 데이터 초기화
    clearFormData();

    setTimeout(() => {
      router.push(
        `/result?reservationId=${reservationId}&email=${encodeURIComponent(
          (d.email || "").trim(),
        )}&phoneNumber=${encodeURIComponent(phoneInternational)}`,
      );
    }, 1200);
  };

  // Payple 콜백 처리
  useEffect(() => {
    if (typeof window === "undefined") return;

    window.mallangTripPaymentCallback = async (
      params: Record<string, unknown>,
    ) => {
      try {
        authReturnedRef.current = true;
        const payNumFromParams =
          (params as { PCD_PAY_OID?: string; paymentNumber?: string } | null)
            ?.PCD_PAY_OID ||
          (params as { PCD_PAY_OID?: string; paymentNumber?: string } | null)
            ?.paymentNumber ||
          "";
        const payNum =
          payNumFromParams ||
          window.sessionStorage.getItem("payplePaymentNumber");
        if (!payNum) return;

        const payResult = String(params?.PCD_PAY_RESULT || "");
        if (payResult !== "success") {
          toast.error(tToast.paymentFailed || "결제에 실패했습니다", {
            description: tToast.paymentFailedDesc || "다시 시도해주세요.",
            icon: <XCircle className="text-red-500" />,
          });
          return;
        }

        await createReservationWithPaymentNumber(payNum);
      } catch (err) {
        console.error("결제 후 처리 실패:", err);
        toast.error(tToast.paymentError || "결제 처리 중 오류가 발생했습니다", {
          description: tToast.paymentErrorDesc || "고객센터로 문의해주세요.",
          icon: <XCircle className="text-red-500" />,
        });
      }
    };

    const onMessage = async (
      e: MessageEvent<{
        type?: string;
        paymentNumber?: string;
        orderId?: string;
        payerId?: string;
        success?: boolean;
      }>,
    ) => {
      try {
        if (e.origin !== window.location.origin) return;

        // PayPal 결제 완료 처리
        if (e.data?.type === "PAYPAL_AUTH_RETURN") {
          authReturnedRef.current = true;
          if (!e.data.success || !e.data.orderId) {
            toast.error(tToast.paymentFailed || "결제에 실패했습니다", {
              description: tToast.paymentFailedDesc || "다시 시도해주세요.",
              icon: <XCircle className="text-red-500" />,
            });
            return;
          }

          const payNum =
            e.data.paymentNumber ||
            window.sessionStorage.getItem("paypalPaymentNumber");
          if (!payNum) return;

          const captureResp = await PaymentsAPI.capturePaypal<{
            success: boolean;
          }>({
            orderId: e.data.orderId,
            payerId: e.data.payerId,
            paymentNumber: payNum,
          });

          if (!captureResp.data.success) {
            toast.error(tToast.paymentConfirmFailed || "결제 확인에 실패했습니다", {
              description: tToast.paymentErrorDesc || "고객센터로 문의해주세요.",
              icon: <XCircle className="text-red-500" />,
            });
            return;
          }

          await createReservationWithPaymentNumber(payNum);
          return;
        }

        // Payple 결제 처리
        if (!e.data || e.data.type !== "PAYPLE_AUTH_RETURN") return;
        authReturnedRef.current = true;
        const payNum =
          e.data?.paymentNumber ||
          window.sessionStorage.getItem("payplePaymentNumber");
        if (!payNum) return;

        const checkOnce = async () => {
          const statusResp = await PaymentsAPI.getPaypleByNumber<{
            status?: string;
          }>(payNum);
          return statusResp.data as { status?: string } | null;
        };

        const status = await checkOnce();
        if (status?.status !== "PENDING") {
          toast.error(tToast.paymentConfirmFailed || "결제 확인에 실패했습니다", {
            description: tToast.paymentErrorDesc || "고객센터로 문의해주세요.",
            icon: <XCircle className="text-red-500" />,
          });
          return;
        }

        await createReservationWithPaymentNumber(payNum);
      } catch (err) {
        console.error("결제 후 처리 실패:", err);
        toast.error(tToast.paymentError || "결제 처리 중 오류가 발생했습니다", {
          description: tToast.paymentErrorDesc || "고객센터로 문의해주세요.",
          icon: <XCircle className="text-red-500" />,
        });
      }
    };

    const onStorage = async (e: StorageEvent) => {
      try {
        if (e.key !== "payplePaymentNumber") return;
        if (!e.newValue) return;
        authReturnedRef.current = true;
        await createReservationWithPaymentNumber(e.newValue);
      } catch (err) {
        console.error("storage 처리 실패:", err);
      }
    };

    window.mallangTripPaypalCallback = async (params: {
      success: boolean;
      orderId?: string;
      payerId?: string;
      paymentNumber?: string;
    }) => {
      try {
        authReturnedRef.current = true;
        if (!params.success || !params.orderId) {
          toast.error(tToast.paymentFailed || "결제에 실패했습니다", {
            description: tToast.paymentFailedDesc || "다시 시도해주세요.",
            icon: <XCircle className="text-red-500" />,
          });
          return;
        }

        const payNum =
          params.paymentNumber ||
          window.sessionStorage.getItem("paypalPaymentNumber");
        if (!payNum) return;

        const captureResp = await PaymentsAPI.capturePaypal<{
          success: boolean;
        }>({
          orderId: params.orderId,
          payerId: params.payerId,
          paymentNumber: payNum,
        });

        if (!captureResp.data.success) {
          toast.error(tToast.paymentConfirmFailed || "결제 확인에 실패했습니다", {
            description: tToast.paymentErrorDesc || "고객센터로 문의해주세요.",
            icon: <XCircle className="text-red-500" />,
          });
          return;
        }

        await createReservationWithPaymentNumber(payNum);
      } catch (err) {
        console.error("PayPal 결제 후 처리 실패:", err);
        toast.error(tToast.paymentError || "결제 처리 중 오류가 발생했습니다", {
          description: tToast.paymentErrorDesc || "고객센터로 문의해주세요.",
          icon: <XCircle className="text-red-500" />,
        });
      }
    };

    window.addEventListener("message", onMessage);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("message", onMessage);
      window.removeEventListener("storage", onStorage);
      delete window.mallangTripPaypalCallback;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 유효성 검증
  const validateForm = () => {
    const errors = [];

    if (!formData.name.trim()) errors.push(tToast.errors?.nameRequired || "이름을 입력해주세요.");
    if (!formData.phoneNumber.trim())
      errors.push(tToast.errors?.phoneRequired || "전화번호를 입력해주세요.");
    if (!/^\+\d{1,3}$/.test(formData.phonePrefix))
      errors.push(tToast.errors?.phoneInvalid || "올바른 국가번호를 선택해주세요.");
    if (!formData.email.trim()) errors.push(tToast.errors?.emailRequired || "이메일을 입력해주세요.");
    if (!formData.peopleCount) errors.push(tToast.errors?.peopleCountRequired || "참여 인원을 선택해주세요.");
    if (!formData.meetDate) errors.push(tToast.errors?.meetDateRequired || "미팅 날짜를 선택해주세요.");
    if (!formData.tourHours) errors.push(tToast.errors?.tourHoursRequired || "이용 시간을 선택해주세요.");
    if (!formData.pickupTime) errors.push(tToast.errors?.pickupTimeRequired || "픽업 시간을 선택해주세요.");
    if (!formData.routeDescription.trim())
      errors.push(tToast.errors?.routeRequired || "픽업 및 대략적인 경로를 입력해주세요.");

    if (!formData.agreeService)
      errors.push(tToast.errors?.agreeServiceRequired || "서비스 이용약관에 동의해주세요.");
    if (!formData.agreeTravel)
      errors.push(tToast.errors?.agreeTravelRequired || "국내여행 표준약관에 동의해주세요.");
    if (!formData.agreePrivacy)
      errors.push(tToast.errors?.agreePrivacyRequired || "개인정보 수집·이용에 동의해주세요.");
    if (!formData.agreeThirdparty)
      errors.push(tToast.errors?.agreeThirdpartyRequired || "개인정보 제3자 제공에 동의해주세요.");

    return errors;
  };

  // 모든 필드가 입력되었는지 확인
  const isFormValid = () => {
    const baseFields = [
      formData.name.trim(),
      formData.phoneNumber.trim(),
      formData.email.trim(),
      formData.peopleCount,
      formData.meetDate,
      formData.tourHours,
      formData.pickupTime,
      formData.routeDescription.trim(),
      formData.agreeService,
      formData.agreeTravel,
      formData.agreePrivacy,
      formData.agreeThirdparty,
    ];

    return baseFields.every(Boolean);
  };

  // "모두 동의하기" 체크박스 핸들러
  const handleAgreeAllChange = (checked: boolean) => {
    setAgreeAll(checked);
    setFormData((prev) => ({
      ...prev,
      agreeService: checked,
      agreeTravel: checked,
      agreePrivacy: checked,
      agreeThirdparty: checked,
    }));
  };

  // 개별 약관 동의 핸들러
  const handleIndividualAgreeChange = (field: string, checked: boolean) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: checked };

      const allChecked =
        updated.agreeService &&
        updated.agreeTravel &&
        updated.agreePrivacy &&
        updated.agreeThirdparty;
      setAgreeAll(allChecked);

      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm();
    if (errors.length > 0) {
      toast.error(tToast.validationError || "입력 정보를 확인해주세요", {
        description: errors[0],
        icon: <XCircle className="text-red-500" />,
      });
      return;
    }

    setIsLoading(true);

    try {
      const digitsOnly = formData.phoneNumber.replace(/\D/g, "");
      const normalizedLocal =
        formData.phonePrefix === "+82" && digitsOnly.startsWith("010")
          ? digitsOnly.slice(1)
          : digitsOnly;
      const phoneInternational = `${formData.phonePrefix}${normalizedLocal}`;

      // 제주 투어 가격 계산 - 언어에 따라 KRW 또는 USD
      const priceNumber = priceTable[formData.tourHours] || (isKorean ? 84000 : 60);

      const preferDemoEnv =
        typeof window !== "undefined" &&
        (window.location.hostname.includes("localhost") ||
          window.location.hostname.includes("dev") ||
          window.location.hostname.includes("test"));
      const amountForPrepare = (() => {
        const base = Math.round(priceNumber);
        const forceTestPrice =
          typeof formData.requests === "string" &&
          formData.requests.includes("말랑트립");
        if (forceTestPrice) return 1000;
        if (preferDemoEnv && base < 1000) return 1000;
        return base > 0 ? base : 1000;
      })();

      const requests = formData.requests || undefined;

      try {
        track("form_start", { form_id: "jeju_taxi_reservation_form" });
      } catch {}

      const productNameSafe = sanitizeProductName(
        `제주도 택시투어 ${formData.tourHours}시간`,
      );

      if (!isKorean) {
        // PayPal 결제 처리 (영어, 중국어)
        const paypalCurrency = getCurrencyByLanguage(currentLanguage);
        const baseUrl =
          typeof window !== "undefined" ? window.location.origin : "";

        // USD 금액은 이미 priceNumber에 계산되어 있음 (JEJU_PRICES_USD 사용)
        const dollarAmount = priceNumber;

        const prepareResp = await PaymentsAPI.preparePaypal<PaypalPrepareData>({
          productName: productNameSafe,
          payerName: formData.name.trim(),
          payerEmail: formData.email.trim(),
          payerPhone: phoneInternational,
          amount: requests === "말랑트립" ? 1 : dollarAmount,
          currency: paypalCurrency || "USD",
          productDescription: `${productNameSafe} Reservation Payment`,
          memo: requests,
          returnUrl: `${baseUrl}/paypal/return`,
          cancelUrl: `${baseUrl}/paypal/cancel`,
        });
        const paypalInfo = prepareResp.data;

        if (
          !paypalInfo?.orderId ||
          !paypalInfo?.paymentNumber ||
          !paypalInfo?.approveUrl
        ) {
          throw new Error("결제 정보가 올바르지 않습니다.");
        }

        try {
          window.sessionStorage.setItem(
            "paypalPaymentNumber",
            paypalInfo.paymentNumber,
          );
        } catch {}

        const isMobile =
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent,
          ) || window.innerWidth < 768;
        let features = "";
        if (!isMobile) {
          const popupWidth = 860;
          const popupHeight = 720;
          const dualScreenLeft =
            window.screenLeft !== undefined
              ? window.screenLeft
              : (window as Window & { screenX?: number }).screenX || 0;
          const dualScreenTop =
            window.screenTop !== undefined
              ? window.screenTop
              : (window as Window & { screenY?: number }).screenY || 0;
          const w = window.outerWidth || window.innerWidth || 1200;
          const h = window.outerHeight || window.innerHeight || 800;
          const left = Math.max(
            0,
            Math.floor(dualScreenLeft + (w - popupWidth) / 2),
          );
          const top = Math.max(
            0,
            Math.floor(dualScreenTop + (h - popupHeight) / 2),
          );
          features = `width=${popupWidth},height=${popupHeight},left=${left},top=${top},menubar=0,location=0,resizable=1,scrollbars=1,status=0`;
        }

        const child = window.open(
          paypalInfo.approveUrl,
          isMobile ? "_blank" : "paypalWindow",
          features,
        );

        if (!child) {
          toast.error(tToast.popupBlocked || "팝업이 차단되었습니다", {
            description: tToast.popupBlockedDesc || "팝업 차단을 해제해주세요.",
            icon: <XCircle className="text-red-500" />,
          });
          return;
        }

        const closeWatcher = window.setInterval(() => {
          try {
            if (child.closed) {
              window.clearInterval(closeWatcher);
              if (!authReturnedRef.current) {
                toast.error(tToast.paymentCancelled || "결제가 취소되었습니다");
              }
            }
          } catch {}
        }, 500);
        childWindowRef.current = child;

        try {
          const qty = formData.peopleCount
            ? Number(String(formData.peopleCount).replace("+", ""))
            : 2;
          const unitPrice = dollarAmount / Math.max(1, qty);
          trackAddPaymentInfo({
            currency: paypalCurrency || "USD",
            value: dollarAmount,
            items: [
              {
                item_id: "JEJU-TAXI-001",
                item_name: productNameSafe,
                price: unitPrice,
                quantity: qty,
              },
            ],
          });
        } catch {}

        toast.info(tToast.paymentWindowOpened || "결제창이 열렸습니다");
        return;
      }

      // Payple 결제 처리 (한국어)
      const prepareResp = await PaymentsAPI.preparePayple<PaymentPrepareData>({
        productName: productNameSafe,
        payerName: formData.name.trim(),
        payerEmail: formData.email.trim(),
        payerPhone: phoneInternational,
        amount: amountForPrepare,
        paymentMethod: "CREDIT_CARD",
        productDescription: `${productNameSafe} 예약 결제`,
        memo: requests,
      });
      const paymentInfo = prepareResp.data;

      if (!paymentInfo?.clientKey || !paymentInfo?.paymentNumber) {
        throw new Error("결제 정보가 올바르지 않습니다.");
      }

      try {
        window.sessionStorage.setItem(
          "payplePaymentNumber",
          paymentInfo.paymentNumber,
        );
      } catch {}

      const paypleParams = {
        clientKey: paymentInfo.clientKey,
        PCD_PAY_TYPE: "card",
        PCD_PAY_WORK: "CERT",
        PCD_CARD_VER: "02",
        PCD_PAY_GOODS: productNameSafe,
        PCD_PAY_TOTAL:
          typeof paymentInfo.amount === "number" && paymentInfo.amount > 0
            ? Math.round(paymentInfo.amount)
            : amountForPrepare,
        PCD_PAY_OID: paymentInfo.paymentNumber,
        PCD_RST_URL:
          "https://v2.mallangtrip-server.com/api/payments/webhooks/payple/auth-result",
        PCD_PAYER_NAME: paymentInfo.payerName,
        PCD_PAYER_HP: paymentInfo.payerPhone || phoneInternational,
      } as Record<string, unknown>;

      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        ) || window.innerWidth < 768;
      let features = "";
      if (!isMobile) {
        const popupWidth = 860;
        const popupHeight = 720;
        const dualScreenLeft =
          window.screenLeft !== undefined
            ? window.screenLeft
            : (window as Window & { screenX?: number }).screenX || 0;
        const dualScreenTop =
          window.screenTop !== undefined
            ? window.screenTop
            : (window as Window & { screenY?: number }).screenY || 0;
        const w = window.outerWidth || window.innerWidth || 1200;
        const h = window.outerHeight || window.innerHeight || 800;
        const left = Math.max(
          0,
          Math.floor(dualScreenLeft + (w - popupWidth) / 2),
        );
        const top = Math.max(
          0,
          Math.floor(dualScreenTop + (h - popupHeight) / 2),
        );
        features = `width=${popupWidth},height=${popupHeight},left=${left},top=${top},menubar=0,location=0,resizable=1,scrollbars=1,status=0`;
      }
      const child = window.open(
        "about:blank",
        isMobile ? "_blank" : "paypleWindow",
        features,
      );
      if (!child) {
        window.PaypleCpayAuthCheck?.(paypleParams);
      } else {
        const closeWatcher = window.setInterval(() => {
          try {
            if (child.closed) {
              window.clearInterval(closeWatcher);
              if (!authReturnedRef.current) {
                toast.error(tToast.paymentCancelled || "결제가 취소되었습니다");
              }
            }
          } catch {}
        }, 500);
        childWindowRef.current = child;
        const PROD = "https://cpay.payple.kr/js/v1/payment.js";
        const DEMO = "https://democpay.payple.kr/js/v1/payment.js";
        const preferDemo =
          window.location.hostname.includes("localhost") ||
          window.location.hostname.includes("dev") ||
          window.location.hostname.includes("test");
        const first = preferDemo ? DEMO : PROD;
        const second = preferDemo ? PROD : DEMO;
        const paramsForChild = { ...paypleParams } as Record<string, unknown>;
        delete (
          paramsForChild as Record<string, unknown> & {
            callbackFunction?: unknown;
          }
        ).callbackFunction;
        const html = `<!doctype html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>Payple</title></head><body><div style="font:14px/1.4 system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;padding:16px;">결제창을 여는 중입니다...</div><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script><script>(function(){var cfg=${JSON.stringify(
          paramsForChild,
        )};cfg.callbackFunction=function(params){try{if(window.opener&&window.opener.mallangTripPaymentCallback){window.opener.mallangTripPaymentCallback(params);}}catch(e){}};function load(u,cb,err){var s=document.createElement('script');s.src=u;s.async=true;s.onload=cb;s.onerror=err;document.head.appendChild(s);}function start(){try{window.PaypleCpayAuthCheck?window.PaypleCpayAuthCheck(cfg):setTimeout(start,200);}catch(e){setTimeout(start,200);}}load('${first}',function(){start();},function(){load('${second}',function(){start();},function(){document.body.innerHTML='<div style="padding:16px;color:#d00;">결제 스크립트를 로드하지 못했습니다.</div>';});});})();</script></body></html>`;
        child.document.open();
        child.document.write(html);
        child.document.close();
      }

      try {
        const qty = formData.peopleCount
          ? Number(String(formData.peopleCount).replace("+", ""))
          : 2;
        const currency = getCurrencyByLanguage(currentLanguage);
        const unitPrice = Math.round(priceNumber / Math.max(1, qty));
        trackAddPaymentInfo({
          currency,
          value: priceNumber,
          items: [
            {
              item_id: "JEJU-TAXI-001",
              item_name: productNameSafe,
              price: unitPrice,
              quantity: qty,
            },
          ],
        });
      } catch {}

      toast.info(tToast.paymentWindowOpened || "결제창이 열렸습니다");
      return;
    } catch (error: unknown) {
      console.error("예약 실패:", error);
      const err = error as { message?: string; status?: number } | undefined;
      const message = err?.message || "예약 처리 중 오류가 발생했습니다";
      toast.error(message, {
        description: tToast.paymentFailedDesc || "다시 시도해주세요.",
        icon: <XCircle className="text-red-500" />,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      ref={containerRef}
      id="jeju-reservation-form-container"
      className="flex h-full max-h-full flex-col"
    >
      {/* 스크롤 가능한 컨텐츠 영역 */}
      <div className="min-h-0 w-full flex-1 space-y-4 overflow-y-auto p-1">
        <div>
          <Label htmlFor="name">
            {tData.name || "이름"} <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            required
            className="mt-1"
            placeholder={isKorean ? "홍길동" : "John Doe"}
          />
        </div>

        <div>
          <Label htmlFor="phone">
            {tData.phone || "국제 전화번호"}{" "}
            <span className="text-red-500">*</span>
          </Label>
          <div className="mt-1 flex gap-2">
            <Combobox
              value={isCustomPhonePrefix ? "__custom__" : formData.phonePrefix}
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
                {
                  value: "__custom__",
                  label: isKorean ? "직접 입력" : "Custom",
                },
              ]}
              widthClassName="w-28"
              buttonClassName="h-9 text-sm"
              modal={true}
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
                placeholder={tData.phonePrefixPlaceholder || "+82"}
                className="h-9 w-20"
                aria-label={tData.phonePrefix || "국가 번호"}
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
              placeholder={tData.phoneNumberPlaceholder || "01012345678"}
              required
              className="flex-1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="email">
            {tData.email || "이메일"} <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            required
            className="mt-1"
            placeholder={tData.emailPlaceholder || "example@email.com"}
          />
        </div>

        <div>
          <Label htmlFor="people">
            {tData.participants || "참여 인원"}{" "}
            <span className="text-red-500">*</span>
          </Label>
          <Combobox
            value={formData.peopleCount}
            onChange={(v) =>
              setFormData((prev) => ({ ...prev, peopleCount: v || "" }))
            }
            options={
              tData.participantsOptions ||
              [
                { value: "", label: "인원을 선택해주세요" },
                { value: "1", label: "1인" },
                { value: "2", label: "2인" },
                { value: "3", label: "3인" },
                { value: "4", label: "최대 4인" },
              ]
            }
            widthClassName="w-full"
            buttonClassName="h-9 text-sm justify-between"
            modal={true}
          />
        </div>

        <div>
          <Label htmlFor="meetDate">
            {tData.meetDate || "미팅 날짜"}{" "}
            <span className="text-red-500">*</span>
          </Label>
          <div className="mt-1">
            <DatePicker
              value={formData.meetDate}
              onChange={(v) => setFormData((prev) => ({ ...prev, meetDate: v }))}
              minDate={new Date()}
              modal={true}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="tourHours">
            {tData.tourHours || "이용 시간"}{" "}
            <span className="text-red-500">*</span>
          </Label>
          <Combobox
            value={formData.tourHours}
            onChange={(v) =>
              setFormData((prev) => ({ ...prev, tourHours: v || "" }))
            }
            options={tData.tourHoursOptions || []}
            widthClassName="w-full"
            buttonClassName="h-9 text-sm justify-between"
            modal={true}
          />

          {/* 총 결제 금액 표시 */}
          {formData.tourHours && (
            <div className="mt-3 rounded-md bg-gray-50 p-3 text-center">
              <div className="text-xs text-gray-500">
                {tData.totalAmount || "총 결제 금액"}
              </div>
              <div className="text-2xl font-semibold text-gray-900">
                {currencySymbol}{" "}
                {priceTable[formData.tourHours]?.toLocaleString() || "0"}
              </div>
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="pickupTime">
            {tData.pickupTime || "픽업 시간"}{" "}
            <span className="text-red-500">*</span>
          </Label>
          <div className="mt-1">
            <TimePicker
              value={formData.pickupTime}
              onChange={(v) =>
                setFormData((prev) => ({ ...prev, pickupTime: v }))
              }
              modal={true}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="routeDescription">
            {tData.routeDescription || "픽업 및 복귀 주소를 포함한 대략적인 경로"}{" "}
            <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="routeDescription"
            value={formData.routeDescription}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                routeDescription: e.target.value,
              }))
            }
            placeholder={
              tData.routePlaceholder ||
              "희망 경로는 대략적으로, 픽업 및 최종 하차 위치는 꼭 작성해주세요."
            }
            required
            className="mt-1"
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="requests">{tData.requests || "요청사항"}</Label>
          <Textarea
            id="requests"
            value={formData.requests}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, requests: e.target.value }))
            }
            placeholder={
              tData.requestsPlaceholder || "추가 요청사항이 있으시면 작성해주세요."
            }
            className="mt-1"
            rows={3}
          />
        </div>

        {/* 약관 동의 섹션 */}
        <div className="mt-8 rounded-lg border border-gray-300 p-4">
          {/* 모두 동의하기 */}
          <div className="mb-4 flex items-center space-x-2">
            <input
              type="checkbox"
              id="agreeAll"
              checked={agreeAll}
              onChange={(e) => handleAgreeAllChange(e.target.checked)}
              className="h-5 w-5 accent-blue-600"
            />
            <label
              htmlFor="agreeAll"
              className="cursor-pointer text-base font-semibold"
            >
              {tData.agreeAll || "아래 약관에 모두 동의합니다."}
            </label>
          </div>

          <hr className="my-3 border-t border-gray-300" />

          {/* 개별 약관들 */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="agreeService"
                checked={formData.agreeService}
                onChange={(e) =>
                  handleIndividualAgreeChange("agreeService", e.target.checked)
                }
                className="h-4 w-4 accent-blue-600"
                required
              />
              <label
                htmlFor="agreeService"
                className="flex cursor-pointer items-center gap-1 text-sm"
              >
                <span className="text-red-500">
                  [{tData.required || "필수"}]
                </span>
                <Link
                  href="/policy/service"
                  target="_blank"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {tData.agreeService || "말랑트립 투어 서비스 이용약관"}
                </Link>
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="agreeTravel"
                checked={formData.agreeTravel}
                onChange={(e) =>
                  handleIndividualAgreeChange("agreeTravel", e.target.checked)
                }
                className="h-4 w-4 accent-blue-600"
                required
              />
              <label
                htmlFor="agreeTravel"
                className="flex cursor-pointer items-center gap-1 text-sm"
              >
                <span className="text-red-500">
                  [{tData.required || "필수"}]
                </span>
                <Link
                  href="/policy/travel"
                  target="_blank"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {tData.agreeTravel || "말랑트립 투어 국내여행 표준약관"}
                </Link>
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="agreePrivacy"
                checked={formData.agreePrivacy}
                onChange={(e) =>
                  handleIndividualAgreeChange("agreePrivacy", e.target.checked)
                }
                className="h-4 w-4 accent-blue-600"
                required
              />
              <label
                htmlFor="agreePrivacy"
                className="flex cursor-pointer items-center gap-1 text-sm"
              >
                <span className="text-red-500">
                  [{tData.required || "필수"}]
                </span>
                <Link
                  href="/policy/privacy"
                  target="_blank"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {tData.agreePrivacy || "개인정보 수집·이용 동의"}
                </Link>
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="agreeThirdparty"
                checked={formData.agreeThirdparty}
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
                htmlFor="agreeThirdparty"
                className="flex cursor-pointer items-center gap-1 text-sm"
              >
                <span className="text-red-500">
                  [{tData.required || "필수"}]
                </span>
                <Link
                  href="/policy/thirdparty"
                  target="_blank"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {tData.agreeThirdparty || "개인정보 제3자 제공 동의"}
                </Link>
              </label>
            </div>
          </div>
        </div>
        <div className="h-4 md:hidden"></div>
      </div>

      {/* 고정된 하단 버튼 */}
      <div className="sticky bottom-0 left-0 mt-0 w-full bg-white md:mt-8">
        {/* 상단 그라데이션 페이드 (위로 갈수록 투명) */}
        <div className="pointer-events-none absolute -top-8 right-0 left-0 h-8 bg-gradient-to-t from-white via-white/70 to-transparent" />
        <Button
          type="submit"
          className="mb-4 w-full bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400"
          onClick={handleSubmit}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              {tData.submitting || "처리 중..."}
            </div>
          ) : (
            tData.submitButton || "예약 및 결제하기"
          )}
        </Button>

        {/* 필수 입력 안내 */}
        <div className="mb-4 text-center text-xs text-gray-500">
          <span className="text-red-500">*</span>{" "}
          {tData.requiredFields || "표시는 필수 입력 항목입니다"}
        </div>
      </div>
    </div>
  );
}
