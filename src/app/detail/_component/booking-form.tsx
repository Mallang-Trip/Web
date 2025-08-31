"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebase";
import { toast } from "sonner";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface BookingFormProps {
  courseDetails: {
    [key: string]: {
      title: string;
      route: string;
      courseNo: number;
    };
  };
  price: string;
  time: string;
  variant?: "default" | "vip";
}

export default function BookingForm({
  courseDetails,
  price,
  time,
  variant = "default",
}: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phonePrefix: "+82",
    phoneNumber: "",
    meetDate: "",
    meetTime: "",
    meetAddress: "",
    returnAddress: "",
    itineraryOption: "courseA",
    routeDesc: "",
    email: "",
    peopleCount: "",
    requests: "",
    // 개별 약관 동의 상태
    agreeService: false,
    agreeTravel: false,
    agreePrivacy: false,
    agreeThirdparty: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [agreeAll, setAgreeAll] = useState(false);
  const router = useRouter();

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
    if (variant === "vip" && !formData.email.trim())
      errors.push("이메일을 입력해주세요.");
    if (variant === "vip" && !formData.peopleCount)
      errors.push("참여 인원을 선택해주세요.");
    if (!formData.meetDate) errors.push("미팅 날짜를 선택해주세요.");
    if (!formData.meetTime)
      errors.push(
        variant === "vip"
          ? "픽업 시간을 선택해주세요."
          : "미팅 시간을 선택해주세요.",
      );
    if (!formData.meetAddress.trim()) errors.push("미팅 주소를 입력해주세요.");
    if (!formData.returnAddress.trim())
      errors.push("복귀 주소를 입력해주세요.");
    if (variant === "default") {
      if (
        formData.itineraryOption === "courseD" &&
        !formData.routeDesc.trim()
      ) {
        errors.push("직접 입력 코스 내용을 입력해주세요.");
      }
    }
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
      variant === "vip" ? formData.email.trim() : true,
      variant === "vip" ? formData.peopleCount : true,
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

    if (variant === "default") {
      // D코스 선택 시 추가 검증
      if (formData.itineraryOption === "courseD") {
        return isBaseValid && formData.routeDesc.trim();
      }
    }

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
      if (variant === "vip" && formData.peopleCount === "9+") {
        toast.error("9인 이상 단체는 고객센터로 문의해주세요.", {
          description: "Tel: +82-507-1344-4159",
          icon: <XCircle className="text-red-500" />,
        });
        return;
      }

      // API 호출을 위한 데이터 준비
      const selectedCourse =
        variant === "vip"
          ? (courseDetails[
              Object.keys(courseDetails)[0]
            ] as (typeof courseDetails)[keyof typeof courseDetails])
          : (courseDetails[
              formData.itineraryOption as keyof typeof courseDetails
            ] as (typeof courseDetails)[keyof typeof courseDetails]);
      const fullPhoneNumber = `${formData.phonePrefix}${formData.phoneNumber}`;

      // 날짜와 시간을 ISO 8601 형식으로 변환
      const meetDateTime = new Date(
        `${formData.meetDate}T${formData.meetTime}:00`,
      );
      const pickupDateTime = new Date(meetDateTime.getTime() - 30 * 60 * 1000); // 30분 전 픽업

      const reserveTrip = httpsCallable(functions, "reserveTrip");

      const requestData = {
        userName: formData.name.trim(),
        startTime: meetDateTime.toISOString(),
        pickupTime: pickupDateTime.toISOString(),
        pickupLocation: formData.meetAddress.trim(),
        dropLocation: formData.returnAddress.trim(),
        courseDetail:
          variant === "vip"
            ? selectedCourse.route
            : formData.itineraryOption === "courseD"
              ? formData.routeDesc.trim()
              : selectedCourse.route,
        courseNo: selectedCourse.courseNo,
        price:
          variant === "vip" && formData.peopleCount
            ? vipPrices[formData.peopleCount]
            : 190000,
        phone: fullPhoneNumber,
      };

      const result = await reserveTrip(requestData);
      const { reservationId } = result.data as { reservationId: string };

      toast.success("예약이 완료되었습니다!", {
        description: `예약 정보가 정상적으로 접수되었습니다.`,
        icon: <CheckCircle className="text-green-500" />,
      });

      // 예약 완료 페이지로 이동
      setTimeout(() => {
        router.push(`/result?reservationId=${reservationId}`);
      }, 1500);
    } catch (error: any) {
      console.error("예약 실패:", error);

      let errorMessage = "예약 처리 중 오류가 발생했습니다.";
      if (error.code === "functions/invalid-argument") {
        errorMessage = "입력 정보가 올바르지 않습니다.";
      } else if (error.code === "functions/unauthenticated") {
        errorMessage = "로그인이 필요합니다.";
      } else if (error.code === "functions/internal") {
        errorMessage = "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
      }

      toast.error(errorMessage, {
        description: "문제가 지속되면 고객센터로 문의해주세요.",
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
              value={formData.phonePrefix}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  phonePrefix: e.target.value,
                }))
              }
              className="h-10 w-32 rounded-md border border-gray-300 px-3 py-2 text-sm"
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
        </div>

        {variant === "vip" && (
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
        )}

        {variant === "vip" && (
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
        )}

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
            {variant === "vip"
              ? "픽업 시간 (Pick-up Time)"
              : "미팅 시간 (Meet Time)"}{" "}
            <span className="text-red-500">*</span>
          </Label>
          {variant === "vip" ? (
            <select
              id="meetTime"
              value={formData.meetTime}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, meetTime: e.target.value }))
              }
              className="mt-1 h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              required
            >
              <option value="">시간을 선택하세요</option>
              <option value="09:00">09:00</option>
              <option value="09:30">09:30</option>
              <option value="10:00">10:00</option>
              <option value="10:30">10:30</option>
              <option value="11:00">11:00</option>
              <option value="11:30">11:30</option>
              <option value="12:00">12:00</option>
              <option value="12:30">12:30</option>
              <option value="13:00">13:00</option>
            </select>
          ) : (
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
          )}
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

        {variant === "default" && (
          <div>
            <Label>
              예정 코스 (Itinerary) <span className="text-red-500">*</span>
            </Label>
            <div className="mt-2 space-y-3">
              {Object.entries(courseDetails).map(([key, course]) => (
                <label key={key} className="flex items-start">
                  <input
                    type="radio"
                    name="itinerary"
                    value={key}
                    checked={formData.itineraryOption === key}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        itineraryOption: e.target.value,
                      }))
                    }
                    className="mt-1 mr-2"
                  />
                  <div>
                    <div className="font-medium">{course.title}</div>
                    {formData.itineraryOption === key && (
                      <div className="mt-2 rounded-md bg-gray-50 p-3 text-sm text-gray-700">
                        {course.route}
                      </div>
                    )}
                  </div>
                </label>
              ))}
            </div>
            {formData.itineraryOption === "courseD" && (
              <div>
                <Label className="text-sm text-gray-700">
                  직접 입력 코스 <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  value={formData.routeDesc}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      routeDesc: e.target.value,
                    }))
                  }
                  placeholder="ex) 성산일출봉 → 우도 → 섭지코지 등"
                  className="mt-2"
                  required
                />
              </div>
            )}
          </div>
        )}

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

        {variant === "vip" && (
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
        )}

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
        ) : variant === "vip" ? (
          "결제하기"
        ) : (
          `₩${price} 결제 진행하기 (${time})`
        )}
      </Button>

      {/* 필수 입력 안내 */}
      <div className="mb-2 text-center text-xs text-gray-500">
        <span className="text-red-500">*</span> 표시는 필수 입력 항목입니다
      </div>
    </div>
  );
}
