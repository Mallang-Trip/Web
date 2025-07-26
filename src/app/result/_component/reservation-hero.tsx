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
  const bookingInfo = {
    tripStatus: currentReservation.tripStatus,
    paymentStatus: currentReservation.paymentStatus,
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-emerald-400 px-6 py-16 text-center text-white">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
          {currentReservation.canceled
            ? "❌ 예약 취소됨"
            : bookingInfo.tripStatus === "여행완료"
              ? "🏆 여행 완료!"
              : bookingInfo.tripStatus === "여행중"
                ? "✈️ 여행 중!"
                : "🎉 예약 완료!"}
        </h1>
        <p className="text-lg opacity-90">
          결제 일시: {formatDate(currentReservation.createdAt)}{" "}
          {formatTime(currentReservation.createdAt)}
        </p>
        <div className="mt-4 flex justify-center gap-2">
          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              currentReservation.canceled
                ? "bg-red-600 text-white"
                : bookingInfo.tripStatus === "여행완료"
                  ? "bg-gray-800 text-white"
                  : bookingInfo.tripStatus === "여행중"
                    ? "bg-green-600 text-white"
                    : "bg-blue-600 text-white"
            }`}
          >
            {bookingInfo.tripStatus}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              bookingInfo.paymentStatus === "결제완료"
                ? "bg-green-600 text-white"
                : "bg-orange-500 text-white"
            }`}
          >
            {bookingInfo.paymentStatus}
          </span>
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
          <span>결제 정보는 문자 메시지로 자동 발송됩니다.</span>
        </div>
      </div>
    </>
  );
}
