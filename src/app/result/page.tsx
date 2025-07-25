"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ResultPage() {
  // 예약 정보 (실제로는 URL 파라미터나 상태에서 가져올 수 있음)
  const bookingInfo = {
    pickupDate: "2025년 8월 12일",
    pickupTime: "09:00",
    meetingPoint: "제주 국제공항 Gate 5 앞",
    returnAddress: "서귀포 칼 호텔",
    plannedCourse: "동쪽 코스 (함덕해변, 월정리, 성산일출봉)",
    driver: {
      name: "박민수 기사님",
      license: "34오 5678",
      phone: "+82-10-1234-5678",
      avatar:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&auto=format&fit=crop",
    },
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(bookingInfo.driver.phone);
    alert("전화번호가 복사되었습니다.");
  };

  const handleLookup = () => {
    alert("예약 조회 페이지로 이동합니다.");
  };

  const handleDownloadPDF = () => {
    alert("예약내역을 저장합니다.");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="mt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-500 to-emerald-400 px-6 py-16 text-center text-white">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">🎉 예약 완료!</h1>
          <p className="text-lg opacity-90">
            예약 정보가 정상적으로 접수되었습니다.
          </p>
        </section>

        {/* Receipt Banner */}
        <div className="relative z-10 mx-auto -mt-6 max-w-xl px-6">
          <div className="flex items-center gap-3 rounded-xl bg-white p-4 text-sm text-gray-600 shadow-lg">
            <svg
              className="h-5 w-5 text-emerald-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span>결제 영수증은 이메일로 자동 발송됩니다.</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="grid gap-6 md:grid-cols-2">
            {/* 예약 정보 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  예약 정보
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6a2 2 0 012 2v12a2 2 0 01-2 2H8a2 2 0 01-2-2V9a2 2 0 012-2z"
                      />
                    </svg>
                    <div>
                      <span className="min-w-20 text-gray-600">픽업 날짜</span>
                      <strong className="ml-2 text-gray-900">
                        {bookingInfo.pickupDate}
                      </strong>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <span className="min-w-20 text-gray-600">픽업 시간</span>
                      <strong className="ml-2 text-gray-900">
                        {bookingInfo.pickupTime}
                      </strong>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <div>
                      <span className="min-w-20 text-gray-600">미팅 장소</span>
                      <strong className="ml-2 text-gray-900">
                        {bookingInfo.meetingPoint}
                      </strong>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                      />
                    </svg>
                    <div>
                      <span className="min-w-20 text-gray-600">복귀 주소</span>
                      <strong className="ml-2 text-gray-900">
                        {bookingInfo.returnAddress}
                      </strong>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                      />
                    </svg>
                    <div>
                      <span className="min-w-20 text-gray-600">예정 코스</span>
                      <strong className="ml-2 text-gray-900">
                        {bookingInfo.plannedCourse}
                      </strong>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 담당 드라이버 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  담당 드라이버
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Image
                    src={bookingInfo.driver.avatar}
                    alt="드라이버 프로필"
                    width={64}
                    height={64}
                    className="rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">
                      {bookingInfo.driver.name}
                    </h3>
                    <p className="flex items-center gap-1 text-sm text-gray-600">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 6h3l2 7H9l-1-4H5"
                        />
                      </svg>
                      {bookingInfo.driver.license}
                    </p>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      {bookingInfo.driver.phone}
                      <button
                        onClick={handleCopyPhone}
                        className="ml-1 rounded p-1 hover:bg-gray-100"
                        title="전화번호 복사"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 현장 결제 안내 */}
          <Card className="mt-6">
            <CardContent>
              <details className="group" open>
                <summary className="flex cursor-pointer items-center justify-between font-semibold">
                  <span>현장 결제 안내</span>
                  <svg
                    className="h-5 w-5 transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="mt-4 text-sm leading-relaxed text-gray-600">
                  기본 대절료(9시간) 외 추가되는 요금은 투어 종료 시 담당
                  기사님께 직접 카드로 결제해주세요. (국내/해외 카드 가능)
                </div>
              </details>
            </CardContent>
          </Card>

          {/* 액션 버튼들 */}
          <div className="mt-8 grid gap-3 md:grid-cols-2 md:justify-center md:gap-4">
            <Button
              onClick={handleLookup}
              variant="outline"
              className="flex h-12 items-center justify-center gap-2"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              예약 조회
            </Button>
            <Button
              onClick={handleDownloadPDF}
              variant="outline"
              className="flex h-12 items-center justify-center gap-2"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              예약내역 저장
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
