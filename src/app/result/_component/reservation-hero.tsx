interface Reservation {
  reservationId: string | number;
  tripName: string;
  startTime: string;
  endTime: string;
  price: number;
  tripStatus: string; // PENDING | APPROVED | REJECTED | CANCELED
  paymentStatus: string;
  createdAt: string; // 결제/요청 시점과는 무관 - 서버 생성 시간
  requestedAt?: string | null;
  approvedAt?: string | null;
  rejectedAt?: string | null;
  canceledAt?: string | null;
  pickupLocation?: string;
  dropLocation?: string;
  courseDetail?: string;
}

interface ReservationHeroProps {
  currentReservation: Reservation;
  formatDate: (isoString: string) => string;
  formatTime: (isoString: string) => string;
}

export default function ReservationHero({
  currentReservation,
  formatDate,
  formatTime,
}: ReservationHeroProps) {
  const status = (currentReservation.tripStatus || "").toUpperCase();
  // const paymentStatus = currentReservation.paymentStatus;

  const titleByStatus = (() => {
    switch (status) {
      case "PENDING":
        return "🎉 예약 신청 완료!";
      case "APPROVED":
        return "✅ 예약 승인됨";
      case "REJECTED":
        return "❌ 예약 반려됨";
      case "CANCELED":
        return "❌ 예약 취소됨";
      default:
        return "🎉 예약 상태";
    }
  })();

  const statusBadgeClass = (() => {
    switch (status) {
      case "PENDING":
        return "bg-blue-600 text-white";
      case "APPROVED":
        return "bg-green-600 text-white";
      case "REJECTED":
        return "bg-red-600 text-white";
      case "CANCELED":
        return "bg-gray-600 text-white";
      default:
        return "bg-blue-600 text-white";
    }
  })();

  const statusLabelKo = (() => {
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
        return status || "예약 상태";
    }
  })();

  const messageByStatus = (() => {
    switch (status) {
      case "PENDING":
        return "영업일 기준 24시간 내로 확정 여부를 안내드리겠습니다.";
      case "APPROVED":
        return "예약이 승인되었습니다.";
      case "REJECTED":
        return "예약이 반려되었습니다. 3영업일 이내에 결제금액이 환불됩니다.";
      case "CANCELED":
        return "예약이 취소되었습니다. 3영업일 이내에 결제금액이 환불됩니다.";
      default:
        return "즐거운 여행 되세요!";
    }
  })();

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-emerald-400 px-6 py-16 text-center text-white">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">{titleByStatus}</h1>
        <div className="space-y-1 text-lg opacity-90">
          {currentReservation.requestedAt && (
            <p>
              예약 일시: {formatDate(currentReservation.requestedAt)}{" "}
              {formatTime(currentReservation.requestedAt)}
            </p>
          )}
          {currentReservation.canceledAt && (
            <p>
              취소 일시: {formatDate(currentReservation.canceledAt)}{" "}
              {formatTime(currentReservation.canceledAt)}
            </p>
          )}
        </div>
        <div className="mt-4 flex justify-center gap-2">
          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${statusBadgeClass}`}
          >
            {statusLabelKo}
          </span>
          {/* <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              paymentStatus === "결제완료"
                ? "bg-green-600 text-white"
                : "bg-orange-500 text-white"
            }`}
          >
            {paymentStatus}
          </span> */}
        </div>
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
          <span>{messageByStatus}</span>
        </div>
      </div>
    </>
  );
}
