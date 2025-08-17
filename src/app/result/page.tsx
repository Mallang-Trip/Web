"use client";

import { Suspense } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebase";
import { toast } from "sonner";
import ReservationHero from "./_component/reservation-hero";
import ReservationInfoCard from "./_component/reservation-info-card";
import DriverInfoCard from "./_component/driver-info-card";
import PaymentInfoCard from "./_component/payment-info-card";
import ReservationActions from "./_component/reservation-actions";
import { Button } from "@/components/ui/button";
import ReservationListDrawer from "@/app/result/_component/reservation-list-drawer";

interface Reservation {
  reservationId: string;
  tripName: string;
  startTime: string;
  endTime: string;
  price: number;
  tripStatus: string;
  paymentStatus: string;
  canceled: boolean;
  refunded: boolean;
  createdAt: string;
  pickupLocation?: string;
  dropLocation?: string;
  courseDetail?: string;
}

function ResultPageContent() {
  const { isAuthenticated, hasHydrated, requireAuth, phoneNumber } = useAuth();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [currentReservation, setCurrentReservation] =
    useState<Reservation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const searchParams = useSearchParams();
  const reservationId = searchParams.get("reservationId");

  // 인증 확인 (hydration이 완료된 후에만 실행)
  useEffect(() => {
    if (!hasHydrated) {
      return; // hydration이 완료될 때까지 대기
    }

    if (!requireAuth()) {
      return; // requireAuth()가 false를 반환하면 자동으로 로그인 페이지로 리다이렉트
    }
  }, [hasHydrated, isAuthenticated, requireAuth]);

  // 예약 정보 조회 (일반 + 취소된 예약)
  useEffect(() => {
    if (!isAuthenticated || !phoneNumber) return;

    const fetchReservations = async () => {
      try {
        setIsLoading(true);

        // 일반 예약과 취소된 예약을 동시에 조회
        const [getTrips, getCanceledTrips] = [
          httpsCallable(functions, "getTrips"),
          httpsCallable(functions, "getCanceledTrips"),
        ];

        const [activeResult, canceledResult] = await Promise.all([
          getTrips({ phone: phoneNumber, isAdmin: false }),
          getCanceledTrips({ phone: phoneNumber }),
        ]);

        const activeReservations = (
          activeResult.data as { reservations: Reservation[] }
        ).reservations;
        const canceledReservations = (
          canceledResult.data as { reservations: Reservation[] }
        ).reservations;

        // 모든 예약을 합쳐서 날짜순으로 정렬
        const allReservations = [
          ...activeReservations,
          ...canceledReservations,
        ].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );

        setReservations(allReservations);

        // reservationId가 있으면 해당 예약 찾기
        if (reservationId) {
          const found = allReservations.find(
            (r) => r.reservationId === reservationId,
          );
          if (found) {
            setCurrentReservation(found);
          } else {
            setNotFound(true);
          }
        } else if (allReservations.length > 0) {
          // reservationId가 없으면 가장 최근 예약 표시
          setCurrentReservation(allReservations[0]);
        } else {
          setNotFound(true);
        }
      } catch (error: any) {
        console.error("예약 조회 실패:", error);
        toast.error("예약 정보를 불러오는데 실패했습니다.");
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReservations();
  }, [isAuthenticated, phoneNumber, reservationId]);

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
    if (!currentReservation || currentReservation.canceled) {
      return;
    }
    setShowCancelDialog(true);
  };

  const handleCancelConfirm = async () => {
    try {
      setIsLoading(true);
      setShowCancelDialog(false);

      const cancelTrip = httpsCallable(functions, "cancelTrip");

      await cancelTrip({
        reservationId: currentReservation!.reservationId,
      });

      // 현재 예약 상태를 취소로 업데이트
      const updatedReservation = {
        ...currentReservation!,
        canceled: true,
        tripStatus: "취소됨",
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
    } catch (error: any) {
      console.error("예약 취소 실패:", error);
      toast.error("예약 취소 중 오류가 발생했습니다.", {
        description: error.message || "잠시 후 다시 시도해주세요.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // hydration이 완료되지 않았거나 인증되지 않은 사용자에게는 로딩 화면 표시
  if (!hasHydrated || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
          <p className="text-gray-600">
            {!hasHydrated ? "데이터 로딩 중..." : "인증 확인 중..."}
          </p>
        </div>
      </div>
    );
  }

  // 예약 정보 로딩 중
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
            <p className="text-gray-600">예약 정보를 불러오는 중...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // 404 상태 - 예약 정보가 없거나 잘못된 접근
  if (notFound || !currentReservation) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
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
        <Footer />
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
          <DriverInfoCard handleCopyPhone={handleCopyPhone} />
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
