import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Reservation {
  reservationId: string | number;
  tripName: string;
  startTime: string;
  endTime: string;
  price: number;
  tripStatus: string;
  paymentStatus: string;
  requestedAt?: string | null;
  approvedAt?: string | null;
  rejectedAt?: string | null;
  canceledAt?: string | null;
  createdAt: string;
  pickupLocation?: string;
  dropLocation?: string;
  courseDetail?: string;
}

interface ReservationInfoCardProps {
  currentReservation: Reservation;
  formatDate: (isoString: string) => string;
  formatTime: (isoString: string) => string;
  calculateEndTime: (startTime: string) => string;
}

export default function ReservationInfoCard({
  currentReservation,
  formatDate,
  formatTime,
  calculateEndTime,
}: ReservationInfoCardProps) {
  const bookingInfo = {
    pickupDate: formatDate(currentReservation.startTime),
    pickupTime: formatTime(currentReservation.startTime),
    endTime: calculateEndTime(currentReservation.startTime),
    tripName: currentReservation.tripName || "제주 여행",
    price: currentReservation.price,
    meetingPoint: currentReservation.pickupLocation || "정보 없음",
    returnAddress: currentReservation.dropLocation || "정보 없음",
    plannedCourse: currentReservation.courseDetail || "정보 없음",
  };

  const isCanceled =
    (currentReservation.tripStatus || "").toUpperCase() === "CANCELED" ||
    !!currentReservation.canceledAt;

  return (
    <Card className={isCanceled ? "bg-gray-50 opacity-75" : ""}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <svg
            className={`h-5 w-5 ${isCanceled ? "text-red-500" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isCanceled
                  ? "M6 18L18 6M6 6l12 12"
                  : "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              }
            />
          </svg>
          <span className={isCanceled ? "text-gray-600 line-through" : ""}>
            예약 정보
          </span>
          {isCanceled && (
            <span className="text-sm font-normal text-red-600">(취소됨)</span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className={isCanceled ? "text-gray-600" : ""}>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <svg
              className="mt-1 h-5 w-5 flex-shrink-0 text-blue-500"
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
            <div className="flex-1">
              <div className="mb-1 text-sm text-gray-600">픽업 날짜</div>
              <div className="font-semibold text-gray-900">
                {bookingInfo.pickupDate}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <svg
              className="mt-1 h-5 w-5 flex-shrink-0 text-blue-500"
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
            <div className="flex-1">
              <div className="mb-1 text-sm text-gray-600">픽업 시간</div>
              <div className="font-semibold text-gray-900">
                {bookingInfo.pickupTime}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <svg
              className="mt-1 h-5 w-5 flex-shrink-0 text-blue-500"
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
            <div className="flex-1">
              <div className="mb-1 text-sm text-gray-600">미팅 장소</div>
              <div className="font-semibold text-gray-900">
                {bookingInfo.meetingPoint}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <svg
              className="mt-1 h-5 w-5 flex-shrink-0 text-blue-500"
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
            <div className="flex-1">
              <div className="mb-1 text-sm text-gray-600">하차 장소</div>
              <div className="font-semibold text-gray-900">
                {bookingInfo.returnAddress}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <svg
              className="mt-1 h-5 w-5 flex-shrink-0 text-blue-500"
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
            <div className="flex-1">
              <div className="mb-1 text-sm text-gray-600">요청사항</div>
              <div className="leading-relaxed font-semibold text-gray-900">
                {bookingInfo.plannedCourse}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <svg
              className="mt-1 h-5 w-5 flex-shrink-0 text-blue-500"
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
            <div className="flex-1">
              <div className="mb-1 text-sm text-gray-600">여행 요금</div>
              <div className="font-semibold text-gray-900">
                ₩{bookingInfo.price.toLocaleString()} (9시간)
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
