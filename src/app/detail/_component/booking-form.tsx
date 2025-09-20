"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateReservation } from "@/hooks/use-reservations";
import { toast } from "sonner";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface BookingFormProps {
  title: string;
  price: string;
  time: string;
  destinationId: number;
}

export default function BookingForm({
  title,
  price,
  time,
  destinationId,
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

  // VIP 가격표 (HTML과 동일)
  const vipPrices: Record<string, number> = {
    "2": 1160000,
    "3": 1185000,
    "4": 1260000,
    "5": 1335000,
    "6": 1520000,
    "7": 1610000,
    "8": 1700000,
  };

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

      // API 호출을 위한 데이터 준비 (새 스키마)

      // 국제 전화번호 조합 (KR 정책: 010 → 10 으로 변환)
      const digitsOnly = formData.phoneNumber.replace(/\D/g, "");
      const normalizedLocal =
        formData.phonePrefix === "+82" && digitsOnly.startsWith("010")
          ? digitsOnly.slice(1)
          : digitsOnly;
      const phoneInternational = `${formData.phonePrefix}${normalizedLocal}`;

      // 날짜/시간 변환은 로컬 ISO 문자열 그대로 사용

      // 가격 계산
      const priceNumber = formData.peopleCount
        ? vipPrices[formData.peopleCount]
        : (() => {
            // prop으로 받은 price 문자열을 숫자로 파싱 (예: "190,000")
            const numeric = Number(String(price).replace(/[^0-9]/g, ""));
            return Number.isFinite(numeric) && numeric > 0 ? numeric : 190000;
          })();

      // 요청사항 구성
      const requests = formData.requests || undefined;

      const requestData = {
        reservationName: title,
        email: formData.email.trim(),
        name: formData.name.trim(),
        phoneNumber: phoneInternational,
        userCount: formData.peopleCount
          ? Number(formData.peopleCount.replace("+", ""))
          : 2,
        // 서버 예시와 동일한 로컬 ISO 형식(타임존 미포함)
        meetingDate: `${formData.meetDate}T${formData.meetTime}:00`,
        pickupTime: formData.meetTime,
        pickupAddress: formData.meetAddress.trim(),
        returnAddress: formData.returnAddress.trim(),
        requests,
        price: priceNumber,
      };

      const result = await reservationMutation.mutateAsync(requestData);
      const reservationId = (result?.reservationId ?? result?.id ?? "") as
        | string
        | number;

      toast.success("예약이 완료되었습니다!", {
        description: `예약 정보가 정상적으로 접수되었습니다.`,
        icon: <CheckCircle className="text-green-500" />,
      });

      // 예약 완료 페이지로 이동 (이메일/전화번호 쿼리로 전달)
      setTimeout(() => {
        router.push(
          `/result?reservationId=${reservationId}&email=${encodeURIComponent(
            formData.email.trim(),
          )}&phoneNumber=${encodeURIComponent(phoneInternational)}`,
        );
      }, 1500);
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
            <select
              value={isCustomPhonePrefix ? "__custom__" : formData.phonePrefix}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "__custom__") {
                  setIsCustomPhonePrefix(true);
                  setFormData((prev) => ({ ...prev, phonePrefix: "+" }));
                } else {
                  setIsCustomPhonePrefix(false);
                  setFormData((prev) => ({ ...prev, phonePrefix: value }));
                }
              }}
              className="h-9 w-28 rounded-md border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="+82">🇰🇷 +82</option>
              <option value="+86">🇨🇳 +86</option>
              <option value="+1">🇺🇸 +1</option>
              <option value="+81">🇯🇵 +81</option>
              <option value="+886">🇹🇼 +886</option>
              <option value="__custom__">직접 입력</option>
            </select>
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
          <select
            id="people"
            value={formData.peopleCount}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                peopleCount: e.target.value,
              }))
            }
            className="mt-1 h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            required
          >
            <option value="">인원을 선택하세요</option>
            <option value="2">2인</option>
            <option value="3">3인</option>
            <option value="4">4인</option>
            <option value="5">5인</option>
            <option value="6">6인</option>
            <option value="7">7인</option>
            <option value="8">8인</option>
            <option value="9+">9인 이상 (별도 문의)</option>
          </select>

          {/* 총 결제 금액 표시 */}
          {formData.peopleCount && (
            <div className="mt-3 rounded-md bg-gray-50 p-3 text-center">
              <div className="text-xs text-gray-500">총 결제 금액</div>
              <div className="text-2xl font-semibold text-gray-900">
                {formData.peopleCount === "9+"
                  ? "별도 문의"
                  : `₩${vipPrices[formData.peopleCount].toLocaleString()}`}
              </div>
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="meetDate">
            미팅 날짜 (Date) <span className="text-red-500">*</span>
          </Label>
          <Input
            id="meetDate"
            type="date"
            value={formData.meetDate}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, meetDate: e.target.value }))
            }
            required
            className="mt-1"
            min={new Date().toISOString().split("T")[0]} // 오늘 이후 날짜만 선택 가능
          />
        </div>

        <div>
          <Label htmlFor="meetTime">
            픽업 시간 (Pick-up Time) <span className="text-red-500">*</span>
          </Label>
          <Input
            id="meetTime"
            type="time"
            value={formData.meetTime}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, meetTime: e.target.value }))
            }
            required
            className="mt-1"
          />
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
            placeholder="특별한 요청사항이 있으시면 입력해주세요"
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
              className="h-5 w-5"
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
                className="h-4 w-4"
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
                className="h-4 w-4"
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
                className="h-4 w-4"
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
                className="h-4 w-4"
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
      <Button
        type="submit"
        className="my-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
        onClick={handleSubmit}
        disabled={!isFormValid() || isLoading}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            예약 처리 중...
          </div>
        ) : (
          "예약하기"
        )}
      </Button>

      {/* 필수 입력 안내 */}
      <div className="mb-10 text-center text-xs text-gray-500 md:mb-2">
        <span className="text-red-500">*</span> 표시는 필수 입력 항목입니다
      </div>
    </div>
  );
}
