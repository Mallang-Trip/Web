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
import { formatDate, formatTime } from "@/utils/date";
import { getStatusColor, getStatusLabel } from "@/utils/status";

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

  const handleReservationClick = (reservationId: string | number) => {
    setIsModalOpen(false);
    const current = new URLSearchParams(searchParams?.toString() || "");
    current.set("reservationId", String(reservationId));
    const query = current.toString();
    router.push(`/result${query ? `?${query}` : ""}`);
  };

  const ReservationList = () => (
    <div className="space-y-4">
      {reservations.length === 0 ? (
        <EmptyState />
      ) : (
        reservations.map((reservation) => (
          <ReservationCard
            key={reservation.reservationId}
            reservation={reservation}
            onClick={() => handleReservationClick(reservation.reservationId)}
          />
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

// 빈 상태 컴포넌트
function EmptyState() {
  return (
    <div className="py-8 text-center">
      <div className="mb-2 text-gray-500">예약 내역이 없습니다</div>
      <div className="text-sm text-gray-400">새로운 여행을 예약해보세요!</div>
    </div>
  );
}

// 예약 카드 컴포넌트
function ReservationCard({
  reservation,
  onClick,
}: {
  reservation: ReservationListItem;
  onClick: () => void;
}) {
  const isCanceled = (reservation.status || "").toUpperCase() === "CANCELED";

  return (
    <Card
      className={`cursor-pointer transition-shadow hover:shadow-md ${
        isCanceled ? "bg-gray-50 opacity-75" : ""
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <ReservationHeader reservation={reservation} isCanceled={isCanceled} />
        <ReservationDetails reservation={reservation} isCanceled={isCanceled} />
      </CardContent>
    </Card>
  );
}

// 예약 헤더 (제목, 상태)
function ReservationHeader({
  reservation,
  isCanceled,
}: {
  reservation: ReservationListItem;
  isCanceled: boolean;
}) {
  return (
    <div className="mb-3 flex items-start justify-between">
      <div>
        <h3
          className={`font-semibold ${
            isCanceled ? "text-gray-600 line-through" : "text-gray-900"
          }`}
        >
          {reservation.reservationName || "여행 예약"}
          {isCanceled && (
            <span className="ml-2 text-xs font-normal text-red-600">
              (취소됨)
            </span>
          )}
        </h3>
        <p
          className={`text-sm ${isCanceled ? "text-gray-500" : "text-gray-600"}`}
        >
          결제 일시: {formatDate(reservation.createdAt)}{" "}
          {formatTime(reservation.createdAt)}
        </p>
      </div>
      <div className="flex gap-2">
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(reservation.status)}`}
        >
          {getStatusLabel(reservation.status)}
        </span>
      </div>
    </div>
  );
}

// 예약 상세 정보
function ReservationDetails({
  reservation,
  isCanceled,
}: {
  reservation: ReservationListItem;
  isCanceled: boolean;
}) {
  const textColor = isCanceled ? "text-gray-500" : "text-gray-600";

  return (
    <div className={`space-y-2 text-sm ${textColor}`}>
      {/* 날짜 */}
      <InfoItem icon={<CalendarIcon />}>
        {formatDate(reservation.meetingDate)}
      </InfoItem>

      {/* 시간 */}
      <InfoItem icon={<ClockIcon />}>
        {formatTime(reservation.meetingDate)}
      </InfoItem>

      {/* 픽업 위치 */}
      {reservation.pickupAddress && (
        <InfoItem icon={<LocationIcon />}>
          <span className="truncate">
            미팅 장소: {reservation.pickupAddress}
          </span>
        </InfoItem>
      )}

      {/* 복귀 위치 */}
      {reservation.returnAddress && (
        <InfoItem icon={<ReturnIcon />}>
          <span className="truncate">
            하차 장소: {reservation.returnAddress}
          </span>
        </InfoItem>
      )}

      {/* 가격 */}
      <div className="flex items-center justify-between">
        <InfoItem icon={<MoneyIcon />}>
          <span className={`font-semibold ${isCanceled ? "line-through" : ""}`}>
            ₩{reservation.price.toLocaleString()}
          </span>
        </InfoItem>
      </div>
    </div>
  );
}

// 정보 항목 래퍼
function InfoItem({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      {children}
    </div>
  );
}

// SVG 아이콘들
function CalendarIcon() {
  return (
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
  );
}

function ClockIcon() {
  return (
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
  );
}

function LocationIcon() {
  return (
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
  );
}

function ReturnIcon() {
  return (
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
  );
}

function MoneyIcon() {
  return (
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
  );
}
