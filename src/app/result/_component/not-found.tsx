"use client";

import { Button } from "@/components/ui/button";
import ReservationListDrawer from "./reservation-list-drawer";

interface NotFoundProps {
  reservations: Array<{
    reservationId: number | string;
    reservationName: string;
    meetingDate: string;
    price: number;
    status: string;
    createdAt: string;
    pickupAddress: string;
    returnAddress: string;
  }>;
}

export default function NotFound({ reservations }: NotFoundProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen items-center justify-center">
        <div className="mx-auto max-w-md px-6 text-center">
          <div className="mb-8">
            <svg
              className="mx-auto h-24 w-24 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h1 className="mb-4 text-2xl font-bold text-gray-900">
            예약 정보를 찾을 수 없습니다
          </h1>
          <p className="mb-8 text-gray-600">
            {reservations.length === 0
              ? "아직 예약 내역이 없습니다. 새로운 여행을 예약해보세요!"
              : "잘못된 예약 번호이거나 접근 권한이 없습니다."}
          </p>
          <div className="space-y-3">
            {reservations.length > 0 && (
              <ReservationListDrawer reservations={reservations}>
                <Button variant="outline" className="w-full">
                  나의 예약 내역 보기
                </Button>
              </ReservationListDrawer>
            )}
            <Button
              onClick={() => (window.location.href = "/")}
              className="w-full"
            >
              홈으로 돌아가기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
