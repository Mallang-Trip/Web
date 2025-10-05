import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Reservation {
  reservationId: number | string;
  reservationName: string;
  email: string;
  name: string;
  phoneNumber: string;
  userCount: number;
  meetingDate: string;
  pickupTime: string;
  pickupAddress: string;
  returnAddress: string;
  requests: string | null;
  price: number;
  status: string;
  isCancelable: boolean;
  isModifiable: boolean;
  canceledAt?: string | null;
}

interface ReservationInfoCardProps {
  currentReservation: Reservation;
}

export default function ReservationInfoCard({
  currentReservation,
}: ReservationInfoCardProps) {
  const isCanceled =
    (currentReservation.status || "").toUpperCase() === "CANCELED" ||
    !!currentReservation.canceledAt;

  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
    });

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
          {/* 투어 이름 */}
          <InfoRow
            iconPath="M3 7h14a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V9a2 2 0 012-2zm0-4h10l4 4"
            label="투어 이름"
            value={currentReservation.reservationName}
          />

          {/* 예약자 */}
          <InfoRow
            iconPath="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            label="예약자"
            value={`${currentReservation.name} (${currentReservation.email})`}
          />

          {/* 전화번호 */}
          <InfoRow
            iconPath="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            label="전화번호"
            value={currentReservation.phoneNumber}
          />

          {/* 참가 인원 */}
          <InfoRow
            iconPath="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87m0 0a4 4 0 100-8 4 4 0 000 8m10 0a4 4 0 10-8 0"
            label="참가 인원"
            value={`${currentReservation.userCount.toLocaleString()}명`}
          />

          {/* 투어 일자 */}
          <InfoRow
            iconPath="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6a2 2 0 012 2v12a2 2 0 01-2 2H8a2 2 0 01-2-2V9a2 2 0 012-2z"
            label="투어 일자"
            value={`${fmtDate(currentReservation.meetingDate)} (${currentReservation.pickupTime})`}
          />

          {/* 출발 위치 */}
          <InfoRow
            iconPath="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            label="출발 위치"
            value={currentReservation.pickupAddress}
          />

          {/* 도착 위치 */}
          <InfoRow
            iconPath="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
            label="도착 위치"
            value={currentReservation.returnAddress}
          />

          {/* 요청 사항 */}
          <InfoRow
            iconPath="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            label="요청 사항"
            value={currentReservation.requests || "-"}
          />

          {/* 투어 요금 */}
          <InfoRow
            iconPath="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
            label="투어 요금"
            value={`₩${currentReservation.price.toLocaleString()}`}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function InfoRow({
  iconPath,
  label,
  value,
}: {
  iconPath: string;
  label: string;
  value: string | number;
}) {
  return (
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
          d={iconPath}
        />
      </svg>
      <div className="flex-1">
        <div className="mb-1 text-sm text-gray-600">{label}</div>
        <div className="font-semibold text-gray-900">{value}</div>
      </div>
    </div>
  );
}
