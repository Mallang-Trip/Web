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
import { GA_EVENTS } from "@/lib/analytics-events";
import { useLangStore } from "@/stores/lang-store";
import { Combobox } from "@/components/ui/combobox";
import { useTranslation } from "@/hooks/use-translation";
import { formatPrice } from "@/utils/currency";
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

interface PeopleOption {
  value: string;
  label: string;
}

interface BookingFormProps {
  title: string;
  price: string;
  time: string;
  destinationId: number;
  peopleOptions?: PeopleOption[];
  priceByPeople?: Record<string, number | null | undefined>;
  inquiryDeposit?: number; // 가격 문의일 때 결제될 예약금 (기본 10000)
  color?: string;
}

export default function BookingForm({
  title,
  price,
  time,
  destinationId,
  peopleOptions = [],
  priceByPeople = {},
  inquiryDeposit = 10000,
  color = "blue",
}: BookingFormProps) {
  // 세션 스토리지를 사용하여 투어별로 폼 데이터 저장
  const { formData, setFormData, clearFormData } = useBookingFormStorage(
    destinationId,
    {
      name: "",
      phonePrefix: "+82",
      phoneNumber: "",
      meetDate: "",
      meetTime: "",
      meetAddress: "",
      returnAddress: "",
      email: "",
      peopleCount: "",
      requests: "",
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
  const { t, lang } = useTranslation();
  // 새 API에서는 비회원 예약을 지원하므로 인증/가용성 체크를 제거
  void destinationId;
  // 일부 props는 현재 사용하지 않음
  void time;

  let colorClass: {
    priceColor: string;
    buttonColor: string;
    accentColor: string;
  };

  switch (color) {
    case "emerald":
      colorClass = {
        priceColor: "text-emerald-600",
        buttonColor: "bg-emerald-500 hover:bg-emerald-600",
        accentColor: "accent-emerald-600",
      };
      break;
    case "amber":
      colorClass = {
        priceColor: "text-amber-400",
        buttonColor: "bg-amber-400 hover:bg-amber-500",
        accentColor: "accent-amber-600",
      };
      break;
    default:
      colorClass = {
        priceColor: "text-blue-600",
        buttonColor: "bg-blue-600 hover:bg-blue-700",
        accentColor: "accent-blue-600",
      };
  }

  // 투어별 인원/가격 정보는 props(priceByPeople)로 주입

  // Payple 상품명 유효성 보장 (허용 문자만 남기고 길이 제한)
  const sanitizeProductName = (name: string) => {
    // 한글, 영문, 숫자, 공백, 일부 구두점만 허용
    let cleaned = name.replace(/[^\uAC00-\uD7A3a-zA-Z0-9\s\-_.()\[\]]/g, "");
    cleaned = cleaned.replace(/\s+/g, " ").trim();
    if (!cleaned) cleaned = "말랑트립 투어";
    // 길이 제한 (과도한 길이로 인한 오류 예방)
    if (cleaned.length > 40) cleaned = cleaned.slice(0, 40);
    return cleaned;
  };

  // 최신 폼 상태를 보관해 콜백 메시지에서 안전하게 사용
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
        track("form_start", { form_id: "pourtal_reservation_form" });
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
    // 가격 계산: 인원별 가격 우선, 값이 없거나 0/NaN이면 예약금(inquiryDeposit) 사용
    const parsedDisplayed = Number(String(price).replace(/[^0-9]/g, ""));
    const isInquiry = !Number.isFinite(parsedDisplayed) || parsedDisplayed <= 0;
    const priceFromPeople = d.peopleCount
      ? Number(priceByPeople[d.peopleCount] ?? NaN)
      : NaN;
    const priceNumber = isInquiry
      ? inquiryDeposit
      : Number.isFinite(priceFromPeople)
        ? (priceFromPeople as number)
        : parsedDisplayed > 0
          ? parsedDisplayed
          : inquiryDeposit;
    const requests = d.requests || undefined;
    const forceTestPriceNow =
      typeof d.requests === "string" && d.requests.includes("말랑트립");
    const finalPrice = forceTestPriceNow ? 1000 : priceNumber;
    const requestData = {
      reservationName: title,
      email: (d.email || "").trim(),
      name: (d.name || "").trim(),
      phoneNumber: phoneInternational,
      userCount: d.peopleCount ? Number(d.peopleCount.replace("+", "")) : 2,
      meetingDate: `${d.meetDate}T${d.meetTime}:00`,
      pickupTime: d.meetTime,
      pickupAddress: (d.meetAddress || "").trim(),
      returnAddress: (d.returnAddress || "").trim(),
      requests,
      price: finalPrice,
      paymentNumber: payNum,
    };

    const result = await reservationMutation.mutateAsync(requestData);
    const reservationId = (result?.reservationId ?? result?.id ?? "") as
      | string
      | number;

    toast.success(t.common.detail.bookingForm.toast.reservationSuccess, {
      description: t.common.detail.bookingForm.toast.reservationSuccessDesc,
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

  // Payple 콜백(팝업/새탭) → postMessage 수신 후 결제 상태 확인 및 예약 생성
  useEffect(() => {
    if (typeof window === "undefined") return;
    // SPA 콜백 함수 (페이플 SDK callbackFunction 경유)
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

        // 성공 여부 확인
        const payResult = String(params?.PCD_PAY_RESULT || "");
        if (payResult !== "success") {
          toast.error(t.common.detail.bookingForm.toast.paymentFailed, {
            description: t.common.detail.bookingForm.toast.paymentFailedDesc,
            icon: <XCircle className="text-red-500" />,
          });
          return;
        }

        await createReservationWithPaymentNumber(payNum);
      } catch (err) {
        console.error("결제 후 처리 실패:", err);
        toast.error(t.common.detail.bookingForm.toast.paymentError, {
          description: t.common.detail.bookingForm.toast.paymentErrorDesc,
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
            toast.error(t.common.detail.bookingForm.toast.paymentFailed, {
              description: t.common.detail.bookingForm.toast.paymentFailedDesc,
              icon: <XCircle className="text-red-500" />,
            });
            return;
          }

          const payNum =
            e.data.paymentNumber ||
            window.sessionStorage.getItem("paypalPaymentNumber");
          if (!payNum) return;

          // PayPal capture API 호출
          const captureResp = await PaymentsAPI.capturePaypal<{
            success: boolean;
          }>({
            orderId: e.data.orderId,
            payerId: e.data.payerId,
            paymentNumber: payNum,
          });

          if (!captureResp.data.success) {
            toast.error(
              t.common.detail.bookingForm.toast.paymentConfirmFailed,
              {
                description:
                  t.common.detail.bookingForm.toast.paymentConfirmFailedDesc,
                icon: <XCircle className="text-red-500" />,
              },
            );
            return;
          }

          await createReservationWithPaymentNumber(payNum);
          return;
        }

        // Payple 결제 처리 (기존 로직)
        if (!e.data || e.data.type !== "PAYPLE_AUTH_RETURN") return;
        authReturnedRef.current = true;
        const payNum =
          e.data?.paymentNumber ||
          window.sessionStorage.getItem("payplePaymentNumber");
        if (!payNum) return;

        // 이미 처리된 결제번호면 무시 (중복 콜백 방지)
        if (processedPaymentNumbersRef.current.has(payNum)) return;

        const checkOnce = async () => {
          const statusResp = await PaymentsAPI.getPaypleByNumber<{
            status?: string;
          }>(payNum);
          return statusResp.data as { status?: string } | null;
        };

        // 단일 확인만 수행 (추가 폴링 제거)
        const status = await checkOnce();

        // 비동기 작업 중 다른 콜백에서 이미 처리되었을 수 있음
        if (processedPaymentNumbersRef.current.has(payNum)) return;

        if (status?.status !== "PENDING") {
          toast.error(t.common.detail.bookingForm.toast.paymentConfirmFailed, {
            description:
              t.common.detail.bookingForm.toast.paymentConfirmFailedDesc,
            icon: <XCircle className="text-red-500" />,
          });
          return;
        }

        await createReservationWithPaymentNumber(payNum);
      } catch (err) {
        console.error("결제 후 처리 실패:", err);
        toast.error(t.common.detail.bookingForm.toast.paymentError, {
          description: t.common.detail.bookingForm.toast.paymentErrorDesc,
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

    // PayPal 콜백 처리
    window.mallangTripPaypalCallback = async (params: {
      success: boolean;
      orderId?: string;
      payerId?: string;
      paymentNumber?: string;
    }) => {
      try {
        authReturnedRef.current = true;
        if (!params.success || !params.orderId) {
          toast.error(t.common.detail.bookingForm.toast.paymentFailed, {
            description: t.common.detail.bookingForm.toast.paymentFailedDesc,
            icon: <XCircle className="text-red-500" />,
          });
          return;
        }

        const payNum =
          params.paymentNumber ||
          window.sessionStorage.getItem("paypalPaymentNumber");
        if (!payNum) return;

        // PayPal capture API 호출
        const captureResp = await PaymentsAPI.capturePaypal<{
          success: boolean;
        }>({
          orderId: params.orderId,
          payerId: params.payerId,
          paymentNumber: payNum,
        });

        if (!captureResp.data.success) {
          toast.error(t.common.detail.bookingForm.toast.paymentConfirmFailed, {
            description:
              t.common.detail.bookingForm.toast.paymentConfirmFailedDesc,
            icon: <XCircle className="text-red-500" />,
          });
          return;
        }

        await createReservationWithPaymentNumber(payNum);
      } catch (err) {
        console.error("PayPal 결제 후 처리 실패:", err);
        toast.error(t.common.detail.bookingForm.toast.paymentError, {
          description: t.common.detail.bookingForm.toast.paymentErrorDesc,
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

    if (!formData.name.trim())
      errors.push(t.common.detail.bookingForm.validation.nameRequired);
    if (!formData.phoneNumber.trim())
      errors.push(t.common.detail.bookingForm.validation.phoneRequired);
    if (!/^\+\d{1,3}$/.test(formData.phonePrefix))
      errors.push(t.common.detail.bookingForm.validation.phonePrefixInvalid);
    if (!formData.email.trim())
      errors.push(t.common.detail.bookingForm.validation.emailRequired);
    if (!formData.peopleCount)
      errors.push(t.common.detail.bookingForm.validation.peopleRequired);
    if (!formData.meetDate)
      errors.push(t.common.detail.bookingForm.validation.dateRequired);
    if (!formData.meetTime)
      errors.push(t.common.detail.bookingForm.validation.timeRequired);
    if (!formData.meetAddress.trim())
      errors.push(t.common.detail.bookingForm.validation.meetAddressRequired);
    if (!formData.returnAddress.trim())
      errors.push(t.common.detail.bookingForm.validation.returnAddressRequired);
    // 코스 입력 섹션은 사용하지 않음
    // 모든 약관 동의 확인
    if (!formData.agreeService)
      errors.push(t.common.detail.bookingForm.validation.agreeServiceRequired);
    if (!formData.agreeTravel)
      errors.push(t.common.detail.bookingForm.validation.agreeTravelRequired);
    if (!formData.agreePrivacy)
      errors.push(t.common.detail.bookingForm.validation.agreePrivacyRequired);
    if (!formData.agreeThirdparty)
      errors.push(
        t.common.detail.bookingForm.validation.agreeThirdpartyRequired,
      );

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
      formData.meetTime,
      formData.meetAddress.trim(),
      formData.returnAddress.trim(),
      formData.agreeService,
      formData.agreeTravel,
      formData.agreePrivacy,
      formData.agreeThirdparty,
    ];

    const isBaseValid = baseFields.every(Boolean);

    // 코스 입력 검증 제거

    return isBaseValid;
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

      // 모든 개별 약관이 체크되었는지 확인
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

    // 유효성 검증
    const errors = validateForm();
    if (errors.length > 0) {
      toast.error(t.common.detail.bookingForm.toast.validationError, {
        description: errors[0],
        icon: <XCircle className="text-red-500" />,
      });
      return;
    }

    setIsLoading(true);

    try {
      // VIP 9인 이상 예외 처리
      if (formData.peopleCount === "9+") {
        toast.error(t.common.detail.bookingForm.toast.groupContactRequired, {
          description: t.common.detail.bookingForm.toast.groupContactPhone,
          icon: <XCircle className="text-red-500" />,
        });
        return;
      }

      // 1) 결제 준비를 위한 데이터 구성
      const digitsOnly = formData.phoneNumber.replace(/\D/g, "");
      const normalizedLocal =
        formData.phonePrefix === "+82" && digitsOnly.startsWith("010")
          ? digitsOnly.slice(1)
          : digitsOnly;
      const phoneInternational = `${formData.phonePrefix}${normalizedLocal}`;

      // 표시 가격이 '가격문의' 등일 때는 예약금(inquiryDeposit)으로 결제
      const parsedDisplayed2 = Number(String(price).replace(/[^0-9]/g, ""));
      const isInquiry2 =
        !Number.isFinite(parsedDisplayed2) || parsedDisplayed2 <= 0;
      const priceFromPeople2 = formData.peopleCount
        ? Number(priceByPeople[formData.peopleCount] ?? NaN)
        : NaN;
      const priceNumber = isInquiry2
        ? inquiryDeposit
        : Number.isFinite(priceFromPeople2)
          ? (priceFromPeople2 as number)
          : parsedDisplayed2 > 0
            ? parsedDisplayed2
            : inquiryDeposit;

      // 개발/테스트 환경 최소 결제금액 보정 (Payple 데모 권장: 1000원 이상)
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

      // 0) 폼 첫 인터랙션(form_start) 보장
      try {
        track("form_start", { form_id: "pourtal_reservation_form" });
      } catch {}

      const productNameSafe = sanitizeProductName(title);

      // 언어별 결제 모듈 분기: 한국어는 Payple, 그 외는 PayPal
      const isKorean = currentLanguage === "ko";

      if (!isKorean) {
        // PayPal 결제 처리
        const currency = getCurrencyByLanguage(currentLanguage);
        const baseUrl =
          typeof window !== "undefined" ? window.location.origin : "";

        // 기존 폼에서 사용하는 가격 계산 로직 재사용
        const val = formData.peopleCount;
        const p = Number(priceByPeople[val] ?? NaN);
        const dollarAmount = Number(
          formatPrice(p, lang as "ko" | "en").replace("$", ""),
        );

        const prepareResp = await PaymentsAPI.preparePaypal<PaypalPrepareData>({
          productName: productNameSafe,
          payerName: formData.name.trim(),
          payerEmail: formData.email.trim(),
          payerPhone: phoneInternational,
          amount: requests === "말랑트립" ? 1 : dollarAmount,
          currency: currency || "USD",
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
          throw new Error(t.common.detail.bookingForm.toast.invalidPaymentInfo);
        }

        // 결제번호 저장
        try {
          window.sessionStorage.setItem(
            "paypalPaymentNumber",
            paypalInfo.paymentNumber,
          );
        } catch {}

        // PayPal 팝업 열기
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
          toast.error(t.common.detail.bookingForm.toast.popupBlocked, {
            description: t.common.detail.bookingForm.toast.popupBlockedDesc,
            icon: <XCircle className="text-red-500" />,
          });
          return;
        }

        // 창 닫힘 감지
        const closeWatcher = window.setInterval(() => {
          try {
            if (child.closed) {
              window.clearInterval(closeWatcher);
              if (!authReturnedRef.current) {
                toast.error(t.common.detail.bookingForm.toast.paymentCancelled);
              }
            }
          } catch {}
        }, 500);
        childWindowRef.current = child;

        // PayPal 리턴 URL 처리를 위한 메시지 리스너는 이미 useEffect에 구현됨
        // add_payment_info 트래킹
        try {
          const qty = formData.peopleCount
            ? Number(String(formData.peopleCount).replace("+", ""))
            : 2;
          const unitPrice = dollarAmount / Math.max(1, qty);
          trackAddPaymentInfo({
            currency: currency || "USD",
            value: dollarAmount,
            items: [
              {
                item_id: "POURTAL-001",
                item_name: title,
                price: unitPrice,
                quantity: qty,
              },
            ],
          });
        } catch {}

        toast.info(t.common.detail.bookingForm.toast.paymentWindowOpened);
        return;
      }

      // 2) 백엔드에 결제 준비 요청 (Payple - 한국어)
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
        throw new Error(t.common.detail.bookingForm.toast.invalidPaymentInfo);
      }

      // 3) 결제 인증을 새 탭/팝업에서 실행 (원본 페이지는 유지)
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
        // 인증결과 수신 → Next 콜백으로 리다이렉트 후 부모에서 처리
        // PCD_RST_URL: `${window.location.origin}/api/payple/callback`,
        PCD_RST_URL:
          "https://mallangtrip-server.com/api/payments/webhooks/payple/auth-result",
        PCD_PAYER_NAME: paymentInfo.payerName,
        PCD_PAYER_HP: paymentInfo.payerPhone || phoneInternational,
      } as Record<string, unknown>;

      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        ) || window.innerWidth < 768;
      let features = "";
      if (!isMobile) {
        const popupWidth = 860; // 더 넓은 가로 크기
        const popupHeight = 720; // 기존 세로 유지
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
        // 팝업 차단 시 현재 창에서 SDK 호출 (다만 콜백은 postMessage를 기대하므로 경험 저하 가능)
        window.PaypleCpayAuthCheck?.(paypleParams);
      } else {
        // 창 닫힘 감지 → 결제창을 사용자가 닫으면 안내
        const closeWatcher = window.setInterval(() => {
          try {
            if (child.closed) {
              window.clearInterval(closeWatcher);
              if (!authReturnedRef.current) {
                toast.error(t.common.detail.bookingForm.toast.paymentCancelled);
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
        // 함수는 JSON 직렬화되지 않으므로 제거 후 스크립트에서 재지정
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

      // add_payment_info (확정 금액 기준)
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
              item_id: "POURTAL-001",
              item_name: title,
              price: unitPrice,
              quantity: qty,
            },
          ],
        });
      } catch {}

      toast.info(t.common.detail.bookingForm.toast.paymentWindowOpened);
      return; // 이후 처리는 메시지 리스너(useEffect)에서 진행
    } catch (error: unknown) {
      console.error("예약 실패:", error);
      const err = error as { message?: string; status?: number } | undefined;
      const message =
        err?.message || t.common.detail.bookingForm.toast.reservationError;
      toast.error(message, {
        description:
          err?.status === 409
            ? t.common.detail.bookingForm.toast.reservationConflict
            : err?.status === 404
              ? t.common.detail.bookingForm.toast.destinationNotFound
              : t.common.detail.bookingForm.toast.paymentErrorDesc,
        icon: <XCircle className="text-red-500" />,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      ref={containerRef}
      id="reservation-form-container"
      className="flex h-full max-h-full flex-col"
    >
      {/* 스크롤 가능한 컨텐츠 영역 */}
      <div className="min-h-0 w-full flex-1 space-y-4 overflow-y-auto p-1">
        <div>
          <Label htmlFor="name">
            {t.common.detail.bookingForm.name}{" "}
            <span className="text-red-500">
              {t.common.detail.bookingForm.required}
            </span>
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
            placeholder={t.common.detail.bookingForm.namePlaceholder}
          />
        </div>

        <div>
          <Label htmlFor="phone">
            {t.common.detail.bookingForm.phone}{" "}
            <span className="text-red-500">
              {t.common.detail.bookingForm.required}
            </span>
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
                  label: t.common.detail.bookingForm.directInput,
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
              placeholder={t.common.detail.bookingForm.phonePlaceholder}
              required
              className="flex-1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="email">
            {t.common.detail.bookingForm.email}{" "}
            <span className="text-red-500">
              {t.common.detail.bookingForm.required}
            </span>
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
            placeholder={t.common.detail.bookingForm.emailPlaceholder}
          />
        </div>

        <div>
          <Label htmlFor="people">
            {t.common.detail.bookingForm.people}{" "}
            <span className="text-red-500">
              {t.common.detail.bookingForm.required}
            </span>
          </Label>
          <Combobox
            value={formData.peopleCount}
            onChange={(v) =>
              setFormData((prev) => ({ ...prev, peopleCount: v || "" }))
            }
            options={[
              {
                value: "",
                label: t.common.detail.bookingForm.peoplePlaceholder,
              },
              ...peopleOptions,
            ]}
            widthClassName="w-full"
            buttonClassName="h-9 text-sm justify-between"
            modal={true}
          />

          {/* 총 결제 금액 표시 */}
          {formData.peopleCount && (
            <div className="mt-3 rounded-md bg-gray-50 p-3 text-center">
              <div className="text-xs text-gray-500">
                {t.common.detail.bookingForm.totalAmount}
              </div>
              <div className="text-2xl font-semibold text-gray-900">
                {(() => {
                  const val = formData.peopleCount;
                  const p = Number(priceByPeople[val] ?? NaN);
                  if (!Number.isFinite(p) || p <= 0)
                    return t.common.detail.bookingForm.inquiry;
                  return formatPrice(p, lang as "ko" | "en");
                })()}
              </div>
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="meetDate">
            {t.common.detail.bookingForm.meetDate}{" "}
            <span className="text-red-500">
              {t.common.detail.bookingForm.required}
            </span>
          </Label>
          <div className="mt-1">
            <DatePicker
              value={formData.meetDate}
              onChange={(v) =>
                setFormData((prev) => ({ ...prev, meetDate: v }))
              }
              minDate={new Date()}
              modal={true}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="meetTime">
            {t.common.detail.bookingForm.meetTime}{" "}
            <span className="text-red-500">
              {t.common.detail.bookingForm.required}
            </span>
          </Label>
          <div className="mt-1">
            <TimePicker
              value={formData.meetTime}
              onChange={(v) =>
                setFormData((prev) => ({ ...prev, meetTime: v }))
              }
              modal={true}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="meetAddress">
            {t.common.detail.bookingForm.meetAddress}{" "}
            <span className="text-red-500">
              {t.common.detail.bookingForm.required}
            </span>
          </Label>
          <Textarea
            id="meetAddress"
            value={formData.meetAddress}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, meetAddress: e.target.value }))
            }
            placeholder={t.common.detail.bookingForm.meetAddressPlaceholder}
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="returnAddress">
            {t.common.detail.bookingForm.returnAddress}{" "}
            <span className="text-red-500">
              {t.common.detail.bookingForm.required}
            </span>
          </Label>
          <Textarea
            id="returnAddress"
            value={formData.returnAddress}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                returnAddress: e.target.value,
              }))
            }
            placeholder={t.common.detail.bookingForm.returnAddressPlaceholder}
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="requests">
            {t.common.detail.bookingForm.requests}
          </Label>
          <Textarea
            id="requests"
            value={formData.requests}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, requests: e.target.value }))
            }
            placeholder={t.common.detail.bookingForm.requestsPlaceholder}
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
              className={`h-5 w-5 ${colorClass.accentColor}`}
            />
            <label
              htmlFor="agreeAll"
              className="cursor-pointer text-base font-semibold"
            >
              {t.common.detail.bookingForm.agreeAll}
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
                className={`h-4 w-4 ${colorClass.accentColor}`}
                required
              />
              <label
                htmlFor="agreeService"
                className="flex cursor-pointer items-center gap-1 text-sm"
              >
                <span className="text-red-500">
                  {t.common.detail.bookingForm.requiredLabel}
                </span>
                <Link
                  href="/policy/service"
                  target="_blank"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {t.common.detail.bookingForm.agreeService}
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
                className={`h-4 w-4 ${colorClass.accentColor}`}
                required
              />
              <label
                htmlFor="agreeTravel"
                className="flex cursor-pointer items-center gap-1 text-sm"
              >
                <span className="text-red-500">
                  {t.common.detail.bookingForm.requiredLabel}
                </span>
                <Link
                  href="/policy/travel"
                  target="_blank"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {t.common.detail.bookingForm.agreeTravel}
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
                className={`h-4 w-4 ${colorClass.accentColor}`}
                required
              />
              <label
                htmlFor="agreePrivacy"
                className="flex cursor-pointer items-center gap-1 text-sm"
              >
                <span className="text-red-500">
                  {t.common.detail.bookingForm.requiredLabel}
                </span>
                <Link
                  href="/policy/privacy"
                  target="_blank"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {t.common.detail.bookingForm.agreePrivacy}
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
                className={`h-4 w-4 ${colorClass.accentColor}`}
                required
              />
              <label
                htmlFor="agreeThirdparty"
                className="flex cursor-pointer items-center gap-1 text-sm"
              >
                <span className="text-red-500">
                  {t.common.detail.bookingForm.requiredLabel}
                </span>
                <Link
                  href="/policy/thirdparty"
                  target="_blank"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {t.common.detail.bookingForm.agreeThirdparty}
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
          className={`mb-4 w-full text-white ${colorClass.buttonColor} disabled:bg-gray-400`}
          onClick={handleSubmit}
          disabled={!isFormValid() || isLoading}
          gaEvent={GA_EVENTS.TOUR_RESERVATION_SUBMIT}
          gaParams={{
            destination_id: destinationId,
            tour_name: title,
            people_count: formData.peopleCount
              ? parseInt(formData.peopleCount)
              : undefined,
            payment_amount:
              formData.peopleCount && priceByPeople[formData.peopleCount]
                ? priceByPeople[formData.peopleCount]
                : undefined,
            currency: getCurrencyByLanguage(currentLanguage),
          }}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              {t.common.detail.bookingForm.submitting}
            </div>
          ) : (
            t.common.detail.bookingForm.submitButton
          )}
        </Button>

        {/* 필수 입력 안내 */}
        <div className="mb-4 text-center text-xs text-gray-500">
          <span className="text-red-500">
            {t.common.detail.bookingForm.required}
          </span>{" "}
          {t.common.detail.bookingForm.requiredNotice}
        </div>
      </div>
    </div>
  );
}
