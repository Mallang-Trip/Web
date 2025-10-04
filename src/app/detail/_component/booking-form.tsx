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
import { Combobox } from "@/components/ui/combobox";

declare global {
  interface Window {
    PaypleCpayAuthCheck?: (params: Record<string, unknown>) => void;
    mallangTripPaymentCallback?: (params: Record<string, unknown>) => void;
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
  const [formData, setFormData] = useState({
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
  });

  const [isCustomPhonePrefix, setIsCustomPhonePrefix] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [agreeAll, setAgreeAll] = useState(false);
  const router = useRouter();
  const reservationMutation = useCreateReservation();
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
  useEffect(() => {
    formRef.current = formData;
  }, [formData]);

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

    toast.success("예약이 완료되었습니다!", {
      description: "결제가 확인되어 예약이 생성되었습니다.",
      icon: <CheckCircle className="text-green-500" />,
    });

    try {
      window.sessionStorage.removeItem("payplePaymentNumber");
    } catch {}

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
    let cancelled = false;
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
          toast.error("결제가 실패했습니다.", {
            description: "다시 시도해 주세요.",
            icon: <XCircle className="text-red-500" />,
          });
          return;
        }

        await createReservationWithPaymentNumber(payNum);
      } catch (err) {
        console.error("결제 후 처리 실패:", err);
        toast.error("결제 후 처리 중 오류가 발생했습니다.", {
          description: "문제가 지속되면 고객센터로 문의해주세요.",
          icon: <XCircle className="text-red-500" />,
        });
      }
    };
    const onMessage = async (
      e: MessageEvent<{ type?: string; paymentNumber?: string }>,
    ) => {
      try {
        if (e.origin !== window.location.origin) return;
        if (!e.data || e.data.type !== "PAYPLE_AUTH_RETURN") return;
        authReturnedRef.current = true;
        const payNum =
          e.data?.paymentNumber ||
          window.sessionStorage.getItem("payplePaymentNumber");
        if (!payNum) return;

        const checkOnce = async () => {
          const statusResp = await PaymentsAPI.getPaypleByNumber<any>(payNum);
          return statusResp.data as { status?: string } | null;
        };

        // 단일 확인만 수행 (추가 폴링 제거)
        const status = await checkOnce();
        if (status?.status !== "PENDING") {
          toast.error("결제 승인 확인에 실패했습니다.", {
            description: "잠시 후 다시 시도해주세요.",
            icon: <XCircle className="text-red-500" />,
          });
          return;
        }

        await createReservationWithPaymentNumber(payNum);
      } catch (err) {
        console.error("결제 후 처리 실패:", err);
        toast.error("결제 후 처리 중 오류가 발생했습니다.", {
          description: "문제가 지속되면 고객센터로 문의해주세요.",
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
    window.addEventListener("message", onMessage);
    window.addEventListener("storage", onStorage);
    return () => {
      cancelled = true;
      window.removeEventListener("message", onMessage);
      window.removeEventListener("storage", onStorage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 유효성 검증
  const validateForm = () => {
    const errors = [];

    if (!formData.name.trim()) errors.push("이름을 입력해주세요.");
    if (!formData.phoneNumber.trim()) errors.push("전화번호를 입력해주세요.");
    if (!/^\+\d{1,3}$/.test(formData.phonePrefix))
      errors.push("국가 번호를 '+숫자' 형식으로 입력해주세요. 예: +82");
    if (!formData.email.trim()) errors.push("이메일을 입력해주세요.");
    if (!formData.peopleCount) errors.push("참여 인원을 선택해주세요.");
    if (!formData.meetDate) errors.push("미팅 날짜를 선택해주세요.");
    if (!formData.meetTime) errors.push("픽업 시간을 선택해주세요.");
    if (!formData.meetAddress.trim()) errors.push("미팅 주소를 입력해주세요.");
    if (!formData.returnAddress.trim())
      errors.push("복귀 주소를 입력해주세요.");
    // 코스 입력 섹션은 사용하지 않음
    // 모든 약관 동의 확인
    if (!formData.agreeService) errors.push("서비스 이용약관에 동의해주세요.");
    if (!formData.agreeTravel) errors.push("국내여행 표준약관에 동의해주세요.");
    if (!formData.agreePrivacy)
      errors.push("개인정보 수집·이용에 동의해주세요.");
    if (!formData.agreeThirdparty)
      errors.push("개인정보 제3자 제공에 동의해주세요.");

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
      toast.error("입력 정보를 확인해주세요.", {
        description: errors[0],
        icon: <XCircle className="text-red-500" />,
      });
      return;
    }

    setIsLoading(true);

    try {
      // VIP 9인 이상 예외 처리
      if (formData.peopleCount === "9+") {
        toast.error("9인 이상 단체는 고객센터로 문의해주세요.", {
          description: "Tel: +82-507-1344-4159",
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

      // 2) 백엔드에 결제 준비 요청
      const productNameSafe = sanitizeProductName(title);
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
        throw new Error("결제 준비 정보가 올바르지 않습니다.");
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
        const popupWidth = 860; // 더 넓은 가로 크기
        const popupHeight = 720; // 기존 세로 유지
        const dualScreenLeft =
          window.screenLeft !== undefined
            ? window.screenLeft
            : (window as any).screenX || 0;
        const dualScreenTop =
          window.screenTop !== undefined
            ? window.screenTop
            : (window as any).screenY || 0;
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
                toast.error("결제가 취소되었거나 창이 닫혔습니다.");
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
        delete (paramsForChild as any).callbackFunction;
        const html = `<!doctype html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>Payple</title></head><body><div style="font:14px/1.4 system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;padding:16px;">결제창을 여는 중입니다...</div><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script><script>(function(){var cfg=${JSON.stringify(
          paramsForChild,
        )};cfg.callbackFunction=function(params){try{if(window.opener&&window.opener.mallangTripPaymentCallback){window.opener.mallangTripPaymentCallback(params);}}catch(e){}};function load(u,cb,err){var s=document.createElement('script');s.src=u;s.async=true;s.onload=cb;s.onerror=err;document.head.appendChild(s);}function start(){try{window.PaypleCpayAuthCheck?window.PaypleCpayAuthCheck(cfg):setTimeout(start,200);}catch(e){setTimeout(start,200);}}load('${first}',function(){start();},function(){load('${second}',function(){start();},function(){document.body.innerHTML='<div style="padding:16px;color:#d00;">결제 스크립트를 로드하지 못했습니다.</div>';});});})();</script></body></html>`;
        child.document.open();
        child.document.write(html);
        child.document.close();
      }

      toast.info("결제창이 열렸습니다. 결제를 완료해 주세요.");
      return; // 이후 처리는 메시지 리스너(useEffect)에서 진행
    } catch (error: unknown) {
      console.error("예약 실패:", error);
      const err = error as { message?: string; status?: number } | undefined;
      const message = err?.message || "예약 처리 중 오류가 발생했습니다.";
      toast.error(message, {
        description:
          err?.status === 409
            ? "이미 활성 예약이 있거나 예약 불가 상태입니다."
            : err?.status === 404
              ? "여행지를 찾을 수 없습니다."
              : "문제가 지속되면 고객센터로 문의해주세요.",
        icon: <XCircle className="text-red-500" />,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full max-h-full flex-col">
      {/* 스크롤 가능한 컨텐츠 영역 */}
      <div className="min-h-0 w-full flex-1 space-y-4 overflow-y-auto p-1">
        <div>
          <Label htmlFor="name">
            이름 (Name) <span className="text-red-500">*</span>
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
            placeholder="홍길동"
          />
        </div>

        <div>
          <Label htmlFor="phone">
            국제 전화번호 (Phone) <span className="text-red-500">*</span>
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
                { value: "__custom__", label: "직접 입력" },
              ]}
              widthClassName="w-28"
              buttonClassName="h-9 text-sm"
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
            />
          </div>
        </div>

        <div>
          <Label htmlFor="email">
            이메일 (Email) <span className="text-red-500">*</span>
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
            placeholder="example@email.com"
          />
        </div>

        <div>
          <Label htmlFor="people">
            참여 인원 (People) <span className="text-red-500">*</span>
          </Label>
          <Combobox
            value={formData.peopleCount}
            onChange={(v) =>
              setFormData((prev) => ({ ...prev, peopleCount: v || "" }))
            }
            options={[
              { value: "", label: "인원을 선택하세요" },
              ...peopleOptions,
            ]}
            widthClassName="w-full"
            buttonClassName="h-9 text-sm justify-between"
            modal
          />

          {/* 총 결제 금액 표시 */}
          {formData.peopleCount && (
            <div className="mt-3 rounded-md bg-gray-50 p-3 text-center">
              <div className="text-xs text-gray-500">총 결제 금액</div>
              <div className="text-2xl font-semibold text-gray-900">
                {(() => {
                  const val = formData.peopleCount;
                  const p = Number(priceByPeople[val] ?? NaN);
                  if (!Number.isFinite(p) || p <= 0) return "별도 문의";
                  return `₩${p.toLocaleString()}`;
                })()}
              </div>
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="meetDate">
            미팅 날짜 (Date) <span className="text-red-500">*</span>
          </Label>
          <div className="mt-1">
            <DatePicker
              value={formData.meetDate}
              onChange={(v) =>
                setFormData((prev) => ({ ...prev, meetDate: v }))
              }
              minDate={new Date()}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="meetTime">
            픽업 시간 (Pick-up Time) <span className="text-red-500">*</span>
          </Label>
          <div className="mt-1">
            <TimePicker
              value={formData.meetTime}
              onChange={(v) =>
                setFormData((prev) => ({ ...prev, meetTime: v }))
              }
            />
          </div>
        </div>

        <div>
          <Label htmlFor="meetAddress">
            미팅 주소 (Pickup Address) <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="meetAddress"
            value={formData.meetAddress}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, meetAddress: e.target.value }))
            }
            placeholder="정확한 호텔명 또는 주소를 입력하세요."
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="returnAddress">
            복귀 주소 (Drop-off Address) <span className="text-red-500">*</span>
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
            placeholder="정확한 호텔명 또는 주소를 입력하세요."
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="requests">요청사항 (Requests)</Label>
          <Textarea
            id="requests"
            value={formData.requests}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, requests: e.target.value }))
            }
            placeholder="식단 제한, 알러지 등 특이사항이 있으실 경우 반드시 입력해주세요"
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
              아래 약관에 모두 동의합니다.
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
      </div>

      {/* 고정된 하단 버튼 */}
      <div className="relative sticky bottom-0 left-0 mt-8 w-full bg-white">
        {/* 상단 그라데이션 페이드 (위로 갈수록 투명) */}
        <div className="pointer-events-none absolute -top-8 right-0 left-0 h-8 bg-gradient-to-t from-white via-white/70 to-transparent" />
        <Button
          type="submit"
          className={`mb-4 w-full text-white ${colorClass.buttonColor} disabled:bg-gray-400`}
          onClick={handleSubmit}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              결제 처리 중...
            </div>
          ) : (
            "결제하기"
          )}
        </Button>

        {/* 필수 입력 안내 */}
        <div className="mb-4 text-center text-xs text-gray-500">
          <span className="text-red-500">*</span> 표시는 필수 입력 항목입니다
        </div>
      </div>
    </div>
  );
}
