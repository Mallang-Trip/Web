"use client";

import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function PickupDropoffAreasSection() {
  return (
    <section className="mx-auto">
      <Card className="overflow-hidden rounded-2xl">
        <CardContent className="p-8 md:p-12">
          {/* Section Header */}
          <div className="mb-10 text-center">
            <CardTitle className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
              픽업/드랍 가능 지역 안내
            </CardTitle>
            <CardDescription className="mt-3 text-gray-600 dark:text-gray-400">
              어디서든 편안하게 투어를 시작하고 마무리하세요.
            </CardDescription>
          </div>

          {/* Available Areas Section */}
          <div className="mb-10">
            <h3 className="mb-5 flex items-center text-xl font-semibold text-gray-800 dark:text-white">
              <svg
                className="mr-3 h-6 w-6 text-indigo-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
              서비스 가능 지역
            </h3>
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
                <strong>📍 인천 & 서울:</strong> 전 지역
              </p>
              <p className="rounded-lg bg-yellow-50 p-4 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
                <strong>📍 대전/세종/충남:</strong> 🚕 예약 전 별도 문의
              </p>

              {/* Collapsible section for Gyeonggi-do */}
              <details className="rounded-lg bg-gray-50 transition-all duration-300 dark:bg-gray-700/50">
                <summary className="flex cursor-pointer items-center justify-between p-4 font-semibold [&::-webkit-details-marker]:hidden">
                  <span>
                    <strong>📍 경기 남부</strong>
                  </span>
                  <svg
                    className="arrow-down h-5 w-5 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </summary>
                <div className="border-t border-gray-200 p-4 dark:border-gray-600">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    광명시, 과천시, 군포시, 광주시, 김포시, 부천시, 성남시,
                    수원시, 시흥시, 안산시, 안성시, 안양시, 여주시, 오산시,
                    용인시, 의왕시, 이천시, 평택시, 하남시, 화성시
                  </p>
                </div>
              </details>
            </div>
          </div>

          {/* Policy & Recommendations Section */}
          <div>
            <h3 className="mb-5 flex items-center text-xl font-semibold text-gray-800 dark:text-white">
              <svg
                className="mr-3 h-6 w-6 text-indigo-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              픽업/드랍 유의사항
            </h3>
            <div
              className="rounded-r-lg border-l-4 border-indigo-500 bg-indigo-50 p-6 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200"
              role="alert"
            >
              <p className="mb-2 font-bold">원활한 투어 진행을 위한 안내</p>
              <ul className="list-inside list-disc space-y-2">
                <li>
                  픽업 및 드랍 장소는 횟수 제한 없이 지정 가능하지만, 반드시
                  위에 안내된{" "}
                  <strong className="font-semibold">서비스 가능 지역 내</strong>
                  여야 합니다.
                </li>
                <li>
                  평일 출퇴근 시간 및 주말 오전의 교통 체증을 고려하여, 가급적{" "}
                  <strong className="font-semibold">
                    여러 장소를 경유하는 픽업/드랍은 2회 이하
                  </strong>
                  로 진행하시는 것을 적극적으로 권장합니다.
                </li>
                <li>
                  계획된 경로를 크게 벗어나는 다회 픽업/드랍의 경우, 추가 이동에
                  대한 요금이 발생할 수 있습니다. 해당 요금은 예약 확정 전
                  저희가 별도 연락을 드려 사전 안내드리며, 이에 따라 추가 결제를
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
