"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useCancelReservation,
  useSearchReservations,
  useMyReservations,
} from "@/hooks/use-reservations";
import type { MyReservationsData } from "@/hooks/use-reservations";
import { toast } from "sonner";
import { formatDate, formatTime } from "@/utils/date";
import ReservationHero from "./_component/reservation-hero";
import ReservationInfoCard from "./_component/reservation-info-card";
import DriverInfoCard from "./_component/driver-info-card";
import PaymentInfoCard from "./_component/payment-info-card";
import ReservationActions from "./_component/reservation-actions";
import ReservationEditDialog from "./_component/reservation-edit-dialog";
import NotFound from "./_component/not-found";
import { useAuth } from "@/hooks/use-auth";
import Loading from "@/components/loading";

interface ReservationPaymentInfo {
  paymentNumber: string;
  transactionId: string | null;
  amount: number;
  status: string;
  paymentMethod: string;
  provider: string;
  approvalNumber: string;
  cardInfo: {
    cardNumber: string;
    cardName: string;
    installment: number;
  } | null;
  requestedAt: string;
  approvedAt: string | null;
  canceledAt: string | null;
}

interface ReservationAttributes {
  driver?: {
    name: string;
    phoneNumber: string;
    vehicleNumber: string;
    vehicleImageUrls?: string[];
  } | null;
  breweries?: Array<{
    order: number;
    breweryName: string;
    address: string;
  }> | null;
}

interface Reservation {
  reservationId: number | string;
  reservationName: string;
  email: string;
  name: string;
  phoneNumber: string;
  userId?: number;
  userCount: number;
  meetingDate: string; // ISO
  pickupTime: string; // HH:mm
  pickupAddress: string;
  returnAddress: string;
  requests: string | null;
  price: number;
  status: string; // PENDING/APPROVED/REJECTED/CANCELED
  isModifiable: boolean;
  isCancelable: boolean;
  adminMemo?: string | null;
  createdAt: string;
  requestedAt?: string | null;
  approvedAt?: string | null;
  rejectedAt?: string | null;
  canceledAt?: string | null;
  paymentNumber?: string | null;
  paymentInfo?: ReservationPaymentInfo | null;
  attributes?: ReservationAttributes | null;
}

type ApiReservation = {
  reservationId: number;
  reservationName: string;
  email: string;
  name: string;
  phoneNumber: string;
  userId?: number;
  userCount: number;
  meetingDate: string;
  pickupTime: string;
  pickupAddress: string;
  returnAddress: string;
  requests: string | null;
  price: number;
  status: string;
  isModifiable: boolean;
  isCancelable: boolean;
  adminMemo?: string | null;
  createdAt: string;
  requestedAt?: string | null;
  approvedAt?: string | null;
  rejectedAt?: string | null;
  canceledAt?: string | null;
  paymentNumber?: string | null;
  paymentInfo?: ReservationPaymentInfo | null;
  attributes?: ReservationAttributes | null;
};

export default function ResultPage() {
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

    // 비로그인이고 게스트 조회 조건 불충족 시 이동 처리
    if (!isAuthenticated && !guestEnabled) {
      setIsLoading(true);
      if (typeof window !== "undefined") {
        try {
          const logoutRedirectTo =
            window.sessionStorage.getItem("logoutRedirectTo");
          if (logoutRedirectTo) {
            window.sessionStorage.removeItem("logoutRedirectTo");
            router.replace(logoutRedirectTo);
            return;
          }
        } catch {}

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
        reservationId: r.reservationId,
        reservationName: r.reservationName,
        email: r.email,
        name: r.name,
        phoneNumber: r.phoneNumber,
        userId: r.userId,
        userCount: Number(r.userCount ?? 0),
        meetingDate: r.meetingDate,
        pickupTime: r.pickupTime,
        pickupAddress: r.pickupAddress,
        returnAddress: r.returnAddress,
        requests: r.requests ?? null,
        price: Number(r.price ?? 0),
        status: r.status || "PENDING",
        isCancelable: r.isCancelable === true,
        isModifiable: r.isModifiable === true,
        adminMemo: r.adminMemo ?? null,
        createdAt: r.createdAt,
        requestedAt: r.requestedAt ?? null,
        approvedAt: r.approvedAt ?? null,
        rejectedAt: r.rejectedAt ?? null,
        canceledAt: r.canceledAt ?? null,
        paymentNumber: r.paymentNumber ?? null,
        paymentInfo: r.paymentInfo ?? null,
        attributes: r.attributes ?? null,
      } as Reservation;
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
        status: "CANCELED",
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
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Loading text="예약 정보를 준비하는 중..." />
      </div>
    );
  }

  // 예약 정보 로딩 중
  if (isLoading || searchQuery.isLoading || myQuery.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Loading text="예약 정보를 불러오는 중..." />
      </div>
    );
  }

  // 404 상태 - 예약 정보가 없거나 잘못된 접근
  if (notFound || !currentReservation) {
    return (
      <NotFound
        reservations={reservations.map((r) => ({
          reservationId: r.reservationId,
          reservationName: r.reservationName,
          meetingDate: r.meetingDate,
          price: r.price,
          status: r.status,
          createdAt: r.createdAt,
          pickupAddress: r.pickupAddress,
          returnAddress: r.returnAddress,
        }))}
      />
    );
  }

  return (
    <main className="mt-16 min-h-screen bg-gray-50">
      <ReservationHero
        currentReservation={currentReservation}
        formatDate={formatDate}
        formatTime={formatTime}
      />

      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid gap-6 md:grid-cols-2">
          <ReservationInfoCard currentReservation={currentReservation} />
          <DriverInfoCard
            attributes={currentReservation.attributes || null}
            status={currentReservation.status}
          />
        </div>

        <PaymentInfoCard
          reservation={currentReservation}
          isAuthenticated={isAuthenticated}
        />

        <ReservationActions
          currentReservation={{
            reservationId: currentReservation.reservationId,
            reservationName: currentReservation.reservationName,
            price: currentReservation.price,
            status: currentReservation.status,
            isCancelable: currentReservation.isCancelable,
            createdAt: currentReservation.createdAt,
          }}
          reservations={reservations.map((r) => ({
            reservationId: r.reservationId,
            reservationName: r.reservationName,
            meetingDate: r.meetingDate,
            price: r.price,
            status: r.status,
            createdAt: r.createdAt,
            pickupAddress: r.pickupAddress,
            returnAddress: r.returnAddress,
          }))}
          isLoading={isLoading}
          showCancelDialog={showCancelDialog}
          setShowCancelDialog={setShowCancelDialog}
          handleCancelConfirm={handleCancelConfirm}
          canEdit={!!canEdit}
          onEditClick={() => setShowEditDialog(true)}
        />
        <ReservationEditDialog
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
          reservation={{
            ...currentReservation,
            email: currentReservation.email,
            name: currentReservation.name,
            phoneNumber: currentReservation.phoneNumber,
            userCount: currentReservation.userCount,
          }}
          onSaved={(updated) =>
            handleSaved({
              ...currentReservation,
              ...updated,
              email: updated.email || currentReservation.email,
              name: updated.name || currentReservation.name,
              phoneNumber:
                updated.phoneNumber || currentReservation.phoneNumber,
              userCount: updated.userCount || currentReservation.userCount,
            })
          }
        />
      </div>
    </main>
  );
}
