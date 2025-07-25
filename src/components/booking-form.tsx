"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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

  const courseDetails = {
    courseA: {
      title: "A코스: 유네스코 절경·동부",
      route:
        "[출발] → 함덕해변 → 월정리해변 → 성산일출봉 → 섭지코지(점심) → 만장굴 → 동문시장 → [복귀]",
    },
    courseB: {
      title: "B코스: 서부 힐링·핫플",
      route:
        "[출발] → 협재해수욕장 → 한림공원 → 오설록티뮤지엄 → 카멜리아힐 → 중문관광단지 → [복귀]",
    },
    courseC: {
      title: "C코스: 중문·서귀포 액티비티",
      route:
        "[출발] → 주상절리대 → 천지연폭포 → 정방폭포 → 올레시장(점심) → 쇠소깍 → 섭지코지 → [복귀]",
    },
    courseD: {
      title: "D코스: 직접 입력",
      route: "원하시는 코스를 아래에 직접 입력해주세요.",
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("예약 데이터:", formData);
    // 여기에 실제 예약 로직 구현
  };

  return (
    <div className="flex h-full max-h-full flex-col">
      {/* 스크롤 가능한 컨텐츠 영역 */}
      <div className="min-h-0 w-full flex-1 space-y-4 overflow-y-auto p-1">
        <div>
          <Label htmlFor="name">이름 (Name)</Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="phone">국제 전화번호 (Phone)</Label>
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
          <Label htmlFor="meetDate">미팅 날짜 (Date)</Label>
          <Input
            id="meetDate"
            type="date"
            value={formData.meetDate}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, meetDate: e.target.value }))
            }
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="meetTime">미팅 시간 (Meet Time)</Label>
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
          <Label htmlFor="meetAddress">미팅 주소 (Pickup Address)</Label>
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
          <Label>예정 코스 (Itinerary)</Label>
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
            <Textarea
              value={formData.routeDesc}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, routeDesc: e.target.value }))
              }
              placeholder="ex) 성산일출봉 – 우도 등"
              className="mt-2"
            />
          )}
        </div>

        <div>
          <Label htmlFor="returnAddress">복귀 주소 (Drop-off Address)</Label>
          <Textarea
            id="returnAddress"
            value={formData.returnAddress}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                returnAddress: e.target.value,
              }))
            }
            placeholder="미입력 시 미팅 주소와 동일"
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
        className="my-4 w-full bg-blue-600 hover:bg-blue-700"
        onClick={handleSubmit}
        disabled={!formData.agreedToTerms}
      >
        ₩ 190,000 결제 진행하기
      </Button>
    </div>
  );
}
