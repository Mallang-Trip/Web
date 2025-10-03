"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

export default function PickupAreasTabs() {
  const [activeTab, setActiveTab] = useState<"capital" | "other">("capital");

  return (
    <section className="mx-auto">
      <Card className="overflow-hidden rounded-2xl">
        <CardContent className="p-0">
          <div className="px-6 pt-10 md:px-12">
            <div className="mb-8 text-center">
              <CardTitle className="text-3xl font-bold text-amber-800 md:text-4xl dark:text-white">
                픽업/드랍 가능 지역 안내
              </CardTitle>
              <CardDescription className="mt-3 text-gray-600 dark:text-gray-400">
                어디서든 편안하게 투어를 시작하고 마무리하세요.
              </CardDescription>
            </div>

            {/* Tabs */}
            <div className="flex rounded-t-xl border-b border-gray-200 bg-gray-50">
              <button
                type="button"
                onClick={() => setActiveTab("capital")}
                className={`flex-1 px-4 py-4 text-base font-semibold transition-colors md:text-lg ${
                  activeTab === "capital"
                    ? "border-b-2 border-amber-700 bg-white text-amber-800"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                인천/서울/경기 남부
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("other")}
                className={`flex-1 px-4 py-4 text-base font-semibold transition-colors md:text-lg ${
                  activeTab === "other"
                    ? "border-b-2 border-amber-700 bg-white text-amber-800"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                대전/세종 (별도 문의)
              </button>
            </div>
          </div>

          {/* Tab Contents */}
          <div className="px-6 py-8 md:px-12">
            {activeTab === "capital" ? (
              <div>
                <p className="mb-6 leading-relaxed text-gray-700">
                  아래 명시된 지역은 추가 비용 없이 픽업 및 드랍이 가능합니다.
                </p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-md bg-gray-50 p-4">
                    <strong className="mb-2 block text-amber-800">인천</strong>
                    <span className="text-sm leading-6 text-gray-700">
                      전 지역
                    </span>
                  </div>
                  <div className="rounded-md bg-gray-50 p-4">
                    <strong className="mb-2 block text-amber-800">서울</strong>
                    <span className="text-sm leading-6 text-gray-700">
                      전 지역
                    </span>
                  </div>
                  <div className="rounded-md bg-gray-50 p-4 md:col-span-2">
                    <strong className="mb-2 block text-amber-800">
                      경기 남부
                    </strong>
                    <span className="text-sm leading-6 text-gray-700">
                      광명시, 과천시, 군포시, 광주시, 김포시, 부천시, 성남시,
                      수원시, 시흥시, 안산시, 안성시, 안양시, 여주시, 오산시,
                      용인시, 의왕시, 이천시, 평택시, 하남시, 화성시
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <p className="leading-relaxed text-gray-700">
                  대전, 세종 지역에서의 출발/도착을 원하시는 경우, 예약 신청 시
                  ‘요청사항’에 기재해주시면 가능 여부 및 추가 요금을 안내해
                  드립니다.
                </p>
              </div>
            )}

            {/* Notice */}
            <div className="mt-8 rounded-md bg-amber-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-amber-900">
                픽업/드랍 유의사항
              </h3>
              <ul className="list-inside list-disc space-y-2 text-amber-900/90">
                <li>
                  픽업 및 드랍 장소는 횟수 제한 없이 지정 가능하지만, 반드시
                  위에 안내된 <strong>서비스 가능 지역 내</strong>여야 합니다.
                </li>
                <li>
                  평일 출퇴근 시간 및 주말 오전의 교통 체증을 고려하여, 가급적{" "}
                  <strong>이른 오전 시간(08:00 이전) 출발</strong>을 권장합니다.
                </li>
                <li>
                  서비스 가능 지역 외 픽업/드랍을 원하실 경우, 별도 문의
                  부탁드립니다.
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
