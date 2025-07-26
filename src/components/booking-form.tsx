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

export default function BookingForm() {
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
    agreedToTerms: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const courseDetails = {
    courseA: {
      title: "A코스: 유네스코 절경·동부",
      route:
        "[출발] → 함덕해변 → 월정리해변 → 성산일출봉 → 섭지코지(점심) → 만장굴 → 동문시장 → [복귀]",
      courseNo: 1,
    },
    courseB: {
      title: "B코스: 서부 힐링·핫플",
      route:
        "[출발] → 협재해수욕장 → 한림공원 → 오설록티뮤지엄 → 카멜리아힐 → 중문관광단지 → [복귀]",
      courseNo: 2,
    },
    courseC: {
      title: "C코스: 중문·서귀포 액티비티",
      route:
        "[출발] → 주상절리대 → 천지연폭포 → 정방폭포 → 올레시장(점심) → 쇠소깍 → 섭지코지 → [복귀]",
      courseNo: 3,
    },
    courseD: {
      title: "D코스: 직접 입력",
      route: "원하시는 코스를 아래에 직접 입력해주세요.",
      courseNo: 4,
    },
  };

  // 유효성 검증
  const validateForm = () => {
    const errors = [];

    if (!formData.name.trim()) errors.push("이름을 입력해주세요.");
    if (!formData.phoneNumber.trim()) errors.push("전화번호를 입력해주세요.");
    if (!formData.meetDate) errors.push("미팅 날짜를 선택해주세요.");
    if (!formData.meetTime) errors.push("미팅 시간을 선택해주세요.");
    if (!formData.meetAddress.trim()) errors.push("미팅 주소를 입력해주세요.");
    if (!formData.returnAddress.trim())
      errors.push("복귀 주소를 입력해주세요.");
    if (formData.itineraryOption === "courseD" && !formData.routeDesc.trim()) {
      errors.push("직접 입력 코스 내용을 입력해주세요.");
    }
    if (!formData.agreedToTerms) errors.push("약관에 동의해주세요.");

    return errors;
  };

  // 모든 필드가 입력되었는지 확인
  const isFormValid = () => {
    const baseFields = [
      formData.name.trim(),
      formData.phoneNumber.trim(),
      formData.meetDate,
      formData.meetTime,
      formData.meetAddress.trim(),
      formData.returnAddress.trim(),
      formData.agreedToTerms,
    ];

    const isBaseValid = baseFields.every(Boolean);

    // D코스 선택 시 추가 검증
    if (formData.itineraryOption === "courseD") {
      return isBaseValid && formData.routeDesc.trim();
    }

    return isBaseValid;
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
      // API 호출을 위한 데이터 준비
      const selectedCourse =
        courseDetails[formData.itineraryOption as keyof typeof courseDetails];
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
          formData.itineraryOption === "courseD"
            ? formData.routeDesc.trim()
            : selectedCourse.route,
        courseNo: selectedCourse.courseNo,
        price: 190000,
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
            미팅 시간 (Meet Time) <span className="text-red-500">*</span>
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
          <label className="flex items-start space-x-2">
            <input
              type="checkbox"
              checked={formData.agreedToTerms}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  agreedToTerms: e.target.checked,
                }))
              }
              required
              className="mt-1"
            />
            <span className="text-sm">
              [필수]{" "}
              <a href="#" className="text-blue-600 underline">
                여행상품 계약
              </a>{" "}
              에 동의합니다.
            </span>
          </label>
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
          "₩190,000 결제 진행하기 (9시간)"
        )}
      </Button>

      {/* 필수 입력 안내 */}
      <div className="mb-2 text-center text-xs text-gray-500">
        <span className="text-red-500">*</span> 표시는 필수 입력 항목입니다
      </div>
    </div>
  );
}
