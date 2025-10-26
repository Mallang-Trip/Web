"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Check, X, AlertCircle } from "lucide-react";

export default function JejuInclusionSection() {
  const includedItems = [
    "차량, 기사님 식비",
    "유류비, 주차비",
    "전문 작가급 사진 및 드론 촬영",
  ];

  const excludedItems = [
    "모든 관광지 입장료",
    "여행자 식사 및 기타 개인 경비",
  ];

  const additionalCharges = [
    {
      title: "시간 초과",
      description: "예약 시간 초과 시 시간당 20,000원",
    },
    {
      title: "야간 할증",
      description: "20시 이후 운행 시 시간당 10,000원",
    },
    {
      title: "지역 할증",
      description: "제주시 외 지역(예: 서귀포)에서 픽업 또는 하차 시 각 20,000원",
    },
  ];

  return (
    <Card className="bg-white py-20">
      <div className="mx-auto max-w-4xl px-4">
        <CardTitle className="mb-12 text-center text-3xl font-bold md:text-4xl">
          <span className="text-blue-500">포함 및 불포함</span> 내역
        </CardTitle>

        <CardContent className="space-y-8 px-0">
          <div className="grid gap-8 md:grid-cols-2">
            {/* 포함 내역 */}
            <div className="rounded-xl bg-emerald-50 p-6">
              <h3 className="mb-6 flex items-center text-xl font-semibold text-emerald-800">
                <Check className="mr-2 h-6 w-6" />
                포함 내역
              </h3>
              <ul className="space-y-3">
                {includedItems.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="mt-0.5 mr-3 h-5 w-5 flex-shrink-0 text-emerald-600" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 불포함 내역 */}
            <div className="rounded-xl bg-red-50 p-6">
              <h3 className="mb-6 flex items-center text-xl font-semibold text-red-800">
                <X className="mr-2 h-6 w-6" />
                불포함 내역
              </h3>
              <ul className="space-y-3">
                {excludedItems.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <X className="mt-0.5 mr-3 h-5 w-5 flex-shrink-0 text-red-600" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 추가 비용 (현장 결제) */}
          <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-6">
            <h3 className="mb-4 flex items-center text-xl font-semibold text-amber-900">
              <AlertCircle className="mr-2 h-6 w-6" />
              추가 비용 (현장 결제)
            </h3>
            <p className="mb-4 text-sm text-amber-800">
              아래의 경우, 투어 종료 후 기사님께 직접 결제합니다.
            </p>
            <div className="space-y-4">
              {additionalCharges.map((charge, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-white p-4 shadow-sm"
                >
                  <h4 className="mb-1 font-semibold text-gray-900">
                    {charge.title}
                  </h4>
                  <p className="text-sm text-gray-600">{charge.description}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
