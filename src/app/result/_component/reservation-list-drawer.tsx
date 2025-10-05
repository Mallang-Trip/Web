"use client";

import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";

export interface ReservationListItem {
  reservationId: string | number;
  reservationName: string;
  meetingDate: string;
  price: number;
  status: string;
  createdAt: string;
  pickupAddress?: string;
  returnAddress?: string;
}

interface ReservationListDrawerProps {
  children: React.ReactNode;
  reservations: ReservationListItem[];
}

export default function ReservationListDrawer({
  children,
  reservations,
}: ReservationListDrawerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const router = useRouter();
  const searchParams = useSearchParams();

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
    });
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calculateEndTime = (startTime: string) => {
    const start = new Date(startTime);
    const end = new Date(start.getTime() + 9 * 60 * 60 * 1000); // 9시간 추가
    return formatTime(end.toISOString());
  };

  const handleReservationClick = (reservationId: string | number) => {
    setIsModalOpen(false);
    const current = new URLSearchParams(searchParams?.toString() || "");
    current.set("reservationId", String(reservationId));
    const query = current.toString();
    router.push(`/result${query ? `?${query}` : ""}`);
  };

  const getStatusColor = (raw: string) => {
    const status = (raw || "").toUpperCase();
    switch (status) {
      case "PENDING":
        return "text-blue-600 bg-blue-50";
      case "APPROVED":
        return "text-green-600 bg-green-50";
      case "REJECTED":
        return "text-red-600 bg-red-50";
      case "CANCELED":
        return "text-gray-600 bg-gray-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const statusLabelKo = (raw: string) => {
    const status = (raw || "").toUpperCase();
    switch (status) {
      case "PENDING":
        return "예약 확인 중";
      case "APPROVED":
        return "예약 승인";
      case "REJECTED":
        return "예약 반려";
      case "CANCELED":
        return "예약 취소";
      default:
        return raw || "예약 상태";
    }
  };

  const ReservationList = () => (
    <div className="space-y-4">
      {reservations.length === 0 ? (
        <div className="py-8 text-center">
          <div className="mb-2 text-gray-500">예약 내역이 없습니다</div>
          <div className="text-sm text-gray-400">
            새로운 여행을 예약해보세요!
          </div>
        </div>
      ) : (
        reservations.map((reservation) => (
          <Card
            key={reservation.reservationId}
            className={`cursor-pointer transition-shadow hover:shadow-md ${
              (reservation.status || "").toUpperCase() === "CANCELED"
                ? "bg-gray-50 opacity-75"
                : ""
            }`}
            onClick={() => handleReservationClick(reservation.reservationId)}
          >
            <CardContent className="p-4">
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h3
                    className={`font-semibold ${
                      (reservation.status || "").toUpperCase() === "CANCELED"
                        ? "text-gray-600 line-through"
                        : "text-gray-900"
                    }`}
                  >
                    {reservation.reservationName || "여행 예약"}
                    {(reservation.status || "").toUpperCase() ===
                      "CANCELED" && (
                      <span className="ml-2 text-xs font-normal text-red-600">
                        (취소됨)
                      </span>
                    )}
                  </h3>
                  <p
                    className={`text-sm ${
                      (reservation.status || "").toUpperCase() === "CANCELED"
                        ? "text-gray-500"
                        : "text-gray-600"
                    }`}
                  >
                    결제 일시: {formatDate(reservation.createdAt)}{" "}
                    {formatTime(reservation.createdAt)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(
                      reservation.status,
                    )}`}
                  >
                    {statusLabelKo(reservation.status)}
                  </span>
                </div>
              </div>

              <div
                className={`space-y-2 text-sm ${
                  (reservation.status || "").toUpperCase() === "CANCELED"
                    ? "text-gray-500"
                    : "text-gray-600"
                }`}
              >
                <div className="flex items-center gap-2">
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
                      d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6a2 2 0 012 2v12a2 2 0 01-2 2H8a2 2 0 01-2-2V9a2 2 0 012-2z"
                    />
                  </svg>
                  <span>{formatDate(reservation.meetingDate)}</span>
                </div>
                <div className="flex items-center gap-2">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{formatTime(reservation.meetingDate)}</span>
                </div>

                {/* 미팅장소 */}
                {reservation.pickupAddress && (
                  <div className="flex items-center gap-2">
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
                        d="M17.657 16.657L13.414 20.9a1 1 0 01-1.414 0l-4.243-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="truncate">
                      미팅 장소: {reservation.pickupAddress}
                    </span>
                  </div>
                )}

                {/* 하차장소 */}
                {reservation.returnAddress && (
                  <div className="flex items-center gap-2">
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
                        d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                      />
                    </svg>
                    <span className="truncate">
                      하차 장소: {reservation.returnAddress}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
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
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                      />
                    </svg>
                    <span
                      className={`font-semibold ${
                        (reservation.status || "").toUpperCase() === "CANCELED"
                          ? "line-through"
                          : ""
                      }`}
                    >
                      ₩{reservation.price.toLocaleString()}
                    </span>
                  </div>
                  {/* <span
                    className={`rounded px-2 py-1 text-xs ${
                      reservation.tripStatus?.toUpperCase() === "CANCELED"
                        ? "bg-gray-100 text-gray-500"
                        : reservation.paymentStatus === "결제완료"
                          ? "bg-green-50 text-green-600"
                          : "bg-orange-50 text-orange-600"
                    }`}
                  >
                    {reservation.paymentStatus}
                  </span> */}
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="max-h-[80vh] max-w-lg overflow-y-auto border-none bg-white">
          <DialogHeader>
            <DialogTitle>나의 예약 내역</DialogTitle>
            <DialogDescription>
              예약 내역을 확인하고 상세를 선택하세요.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <ReservationList />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="flex max-h-[90vh] flex-col bg-white">
        <DrawerHeader className="flex-shrink-0 text-left">
          <DrawerTitle>나의 예약 내역</DrawerTitle>
        </DrawerHeader>
        <div className="flex-1 overflow-auto px-4 pb-4">
          <ReservationList />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
