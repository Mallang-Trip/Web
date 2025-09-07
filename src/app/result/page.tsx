"use client";

import { Suspense } from "react";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useCancelReservation,
  useSearchReservations,
  useMyReservations,
} from "@/hooks/use-reservations";
import type { MyReservationsData } from "@/hooks/use-reservations";
import { toast } from "sonner";
import ReservationHero from "./_component/reservation-hero";
import ReservationInfoCard from "./_component/reservation-info-card";
import DriverInfoCard from "./_component/driver-info-card";
import PaymentInfoCard from "./_component/payment-info-card";
import ReservationActions from "./_component/reservation-actions";
import { Button } from "@/components/ui/button";
import ReservationListDrawer from "@/app/result/_component/reservation-list-drawer";
import ReservationEditDialog from "@/app/result/_component/reservation-edit-dialog";
import { useAuth } from "@/hooks/use-auth";

interface Reservation {
  reservationId: string | number;
  tripName: string;
  startTime: string;
  endTime: string;
  price: number;
  tripStatus: string;
  paymentStatus: string;
  isCancelable?: boolean;
  isModifiable?: boolean;
  requestedAt?: string | null;
  approvedAt?: string | null;
  rejectedAt?: string | null;
  canceledAt?: string | null;
  createdAt: string;
  pickupLocation?: string;
  dropLocation?: string;
  courseDetail?: string;
  email?: string;
  name?: string;
  phoneNumber?: string;
}

type ApiReservation = {
  reservationId?: number;
  id?: number;
  reservationName?: string;
  meetingDate?: string;
  price?: number;
  status?: string;
  isCancelable?: boolean;
  isModifiable?: boolean;
  pickupAddress?: string;
  returnAddress?: string;
  requests?: string | null;
  createdAt: string;
  requestedAt?: string | null;
  approvedAt?: string | null;
  rejectedAt?: string | null;
  canceledAt?: string | null;
  email?: string;
  name?: string;
  phoneNumber?: string;
};

function ResultPageContent() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [currentReservation, setCurrentReservation] =
    useState<Reservation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [resumedAction, setResumedAction] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const { isAuthenticated, hasHydrated } = useAuth();
  const reservationId = searchParams.get("reservationId");
  const queryEmail = searchParams.get("email") || "";
  const queryPhone = searchParams.get("phoneNumber") || "";
  const actionParam = searchParams.get("action") || "";

  // 비로그인 게스트: 쿼리(email, phone)가 있어야 조회 허용
  const guestEnabled = useMemo(
    () =>
      !isAuthenticated && queryEmail.trim() !== "" && queryPhone.trim() !== "",
    [isAuthenticated, queryEmail, queryPhone],
  );
  const searchQuery = useSearchReservations({
    email: queryEmail,
    phoneNumber: queryPhone,
    enabled: guestEnabled,
  });
  // 로그인 사용자: 토큰 기반 내 목록 조회
  const myQuery = useMyReservations({ enabled: isAuthenticated });
  const cancelMutation = useCancelReservation();

  // 예약 정보 조회 (내 목록)
  useEffect(() => {
    // 하이드레이션 전이면 로딩 유지
    if (!hasHydrated) {
      setIsLoading(true);
      return;
    }

    // 비로그인이고 게스트 조회 조건 불충족 시 로그인으로 이동
    if (!isAuthenticated && !guestEnabled) {
      setIsLoading(true);
      if (typeof window !== "undefined") {
        const returnUrl = window.location.pathname + window.location.search;
        router.replace(`/login?returnUrl=${encodeURIComponent(returnUrl)}`);
      }
      return;
    }

    const apiData = isAuthenticated
      ? (myQuery.data as MyReservationsData | undefined)
      : (searchQuery.data as MyReservationsData | undefined);
    if (!apiData) return;
    const list: Reservation[] = (apiData.reservations || []).map((raw) => {
      const r = raw as ApiReservation;
      return {
        reservationId: r.reservationId ?? r.id!,
        tripName: r.reservationName ?? "여행 예약",
        startTime: r.meetingDate ?? "",
        endTime: r.meetingDate ?? "",
        price: Number(r.price ?? 0),
        tripStatus: (r.status as string) ?? "PENDING",
        paymentStatus: "결제대기",
        isCancelable: r.isCancelable === true,
        isModifiable: r.isModifiable === true,
        requestedAt: r.requestedAt ?? null,
        approvedAt: r.approvedAt ?? null,
        rejectedAt: r.rejectedAt ?? null,
        canceledAt: r.canceledAt ?? null,
        createdAt: r.createdAt,
        pickupLocation: r.pickupAddress ?? undefined,
        dropLocation: r.returnAddress ?? undefined,
        courseDetail: r.requests ?? undefined,
        email: r.email ?? undefined,
        name: r.name ?? undefined,
        phoneNumber: r.phoneNumber ?? undefined,
      };
    });
    const sorted = list.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    setReservations(sorted);
    if (reservationId) {
      const found = sorted.find(
        (r) => String(r.reservationId) === reservationId,
      );
      setCurrentReservation(found || null);
      setNotFound(!found);
    } else {
      setCurrentReservation(sorted[0] || null);
      setNotFound(sorted.length === 0);
    }
    setIsLoading(false);
  }, [
    hasHydrated,
    isAuthenticated,
    guestEnabled,
    searchQuery.data,
    myQuery.data,
    reservationId,
    router,
  ]);

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

  // 현재 예약 정보 가공
  const calculateEndTime = (startTime: string) => {
    const start = new Date(startTime);
    const end = new Date(start.getTime() + 9 * 60 * 60 * 1000); // 9시간 추가
    return formatTime(end.toISOString());
  };

  const handleCopyPhone = () => {
    const driverPhone = "+82-10-1234-5678";
    navigator.clipboard.writeText(driverPhone);
    alert("전화번호가 복사되었습니다.");
  };

  const handleCancelClick = () => {
    if (!currentReservation) return;
    if (!currentReservation.isCancelable) return;
    setShowCancelDialog(true);
  };

  const handleCancelConfirm = async () => {
    try {
      setIsLoading(true);
      setShowCancelDialog(false);

      await cancelMutation.mutateAsync({
        reservationId: currentReservation!.reservationId,
      });

      // 현재 예약 상태를 취소로 업데이트
      const updatedReservation: Reservation = {
        ...currentReservation!,
        isCancelable: false,
        tripStatus: "CANCELED",
        canceledAt: new Date().toISOString(),
      };

      setCurrentReservation(updatedReservation);

      // 예약 목록도 업데이트
      setReservations((prev) =>
        prev.map((reservation) =>
          reservation.reservationId === currentReservation!.reservationId
            ? updatedReservation
            : reservation,
        ),
      );

      toast.success("예약이 성공적으로 취소되었습니다.", {
        description: "취소된 예약은 나의 예약 내역에서 확인할 수 있습니다.",
      });
    } catch (error: unknown) {
      console.error("예약 취소 실패:", error);
      const err = error as { status?: number; message?: string } | undefined;
      const status = err?.status;
      let desc = err?.message || "잠시 후 다시 시도해주세요.";
      if (status === 403) desc = "취소 권한이 없습니다.";
      else if (status === 404) desc = "예약을 찾을 수 없습니다.";
      else if (status === 409) desc = "현재 상태에서는 취소할 수 없습니다.";
      toast.error("예약 취소 중 오류가 발생했습니다.", {
        description: desc,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const canEdit = useMemo(
    () => currentReservation?.isModifiable,
    [currentReservation],
  );

  const handleSaved = (updated: Reservation) => {
    setCurrentReservation(updated);
    setReservations((prev) =>
      prev.map((r) =>
        r.reservationId === updated.reservationId ? updated : r,
      ),
    );
  };

  // 로그인 복귀 후 의도한 동작 자동 재개 (cancel/edit)
  useEffect(() => {
    if (!hasHydrated || !isAuthenticated) return;
    if (!currentReservation) return;
    if (resumedAction) return;
    const action = actionParam;
    if (!action) return;

    const removeActionFromUrl = () => {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        params.delete("action");
        const query = params.toString();
        const newUrl = `${window.location.pathname}${query ? `?${query}` : ""}`;
        router.replace(newUrl);
      }
    };

    if (action === "cancel") {
      setShowCancelDialog(true);
      setResumedAction(true);
      removeActionFromUrl();
    } else if (action === "edit") {
      if (canEdit) {
        setShowEditDialog(true);
      }
      setResumedAction(true);
      removeActionFromUrl();
    }
  }, [
    hasHydrated,
    isAuthenticated,
    currentReservation,
    actionParam,
    canEdit,
    resumedAction,
    router,
  ]);

  // 초기 로딩 또는 리디렉션 대기
  if (!hasHydrated || (!isAuthenticated && !guestEnabled)) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
            <p className="text-gray-600">예약 정보를 준비하는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  // 예약 정보 로딩 중
  if (isLoading || searchQuery.isLoading || myQuery.isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
            <p className="text-gray-600">예약 정보를 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  // 404 상태 - 예약 정보가 없거나 잘못된 접근
  if (notFound || !currentReservation) {
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

  return (
    <main className="mt-16 min-h-screen bg-gray-50">
      <ReservationHero
        currentReservation={currentReservation}
        formatDate={formatDate}
        formatTime={formatTime}
      />

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid gap-6 md:grid-cols-2">
          <ReservationInfoCard
            currentReservation={currentReservation}
            formatDate={formatDate}
            formatTime={formatTime}
            calculateEndTime={calculateEndTime}
          />
          <DriverInfoCard
            handleCopyPhone={handleCopyPhone}
            status={currentReservation.tripStatus}
          />
        </div>

        <PaymentInfoCard />

        <ReservationActions
          currentReservation={currentReservation}
          reservations={reservations}
          isLoading={isLoading}
          showCancelDialog={showCancelDialog}
          setShowCancelDialog={setShowCancelDialog}
          handleCancelClick={handleCancelClick}
          handleCancelConfirm={handleCancelConfirm}
          canEdit={!!canEdit}
          onEditClick={() => setShowEditDialog(true)}
        />
        <ReservationEditDialog
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
          reservation={currentReservation}
          onSaved={handleSaved}
        />
      </div>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
            <p className="text-gray-600">페이지 로딩 중...</p>
          </div>
        </div>
      }
    >
      <ResultPageContent />
    </Suspense>
  );
}
