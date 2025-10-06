import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DocumentIcon,
  UserIcon,
  PhoneIcon,
  UsersIcon,
  CalendarIcon,
  LocationIcon,
  ReturnIcon,
  MessageIcon,
  MoneyIcon,
  CheckCircleIcon,
  CloseCircleIcon,
} from "@/components/ui/icons";

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

  const formatDate = (iso: string) =>
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
          {isCanceled ? (
            <CloseCircleIcon className="h-5 w-5 text-red-500" />
          ) : (
            <CheckCircleIcon className="h-5 w-5" />
          )}
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
          <InfoRow
            icon={
              <DocumentIcon className="mt-1 h-5 w-5 flex-shrink-0 text-blue-500" />
            }
            label="투어 이름"
            value={currentReservation.reservationName}
          />

          <InfoRow
            icon={
              <UserIcon className="mt-1 h-5 w-5 flex-shrink-0 text-blue-500" />
            }
            label="예약자"
            value={`${currentReservation.name} (${currentReservation.email})`}
          />

          <InfoRow
            icon={
              <PhoneIcon className="mt-1 h-5 w-5 flex-shrink-0 text-blue-500" />
            }
            label="전화번호"
            value={currentReservation.phoneNumber}
          />

          <InfoRow
            icon={
              <UsersIcon className="mt-1 h-5 w-5 flex-shrink-0 text-blue-500" />
            }
            label="참가 인원"
            value={`${currentReservation.userCount.toLocaleString()}명`}
          />

          <InfoRow
            icon={
              <CalendarIcon className="mt-1 h-5 w-5 flex-shrink-0 text-blue-500" />
            }
            label="투어 일자"
            value={`${formatDate(currentReservation.meetingDate)} (${currentReservation.pickupTime})`}
          />

          <InfoRow
            icon={
              <LocationIcon className="mt-1 h-5 w-5 flex-shrink-0 text-blue-500" />
            }
            label="출발 위치"
            value={currentReservation.pickupAddress}
          />

          <InfoRow
            icon={
              <ReturnIcon className="mt-1 h-5 w-5 flex-shrink-0 text-blue-500" />
            }
            label="도착 위치"
            value={currentReservation.returnAddress}
          />

          <InfoRow
            icon={
              <MessageIcon className="mt-1 h-5 w-5 flex-shrink-0 text-blue-500" />
            }
            label="요청 사항"
            value={currentReservation.requests || "-"}
          />

          <InfoRow
            icon={
              <MoneyIcon className="mt-1 h-5 w-5 flex-shrink-0 text-blue-500" />
            }
            label="투어 요금"
            value={`₩${currentReservation.price.toLocaleString()}`}
          />
        </div>
      </CardContent>
    </Card>
  );
}

// 정보 행 컴포넌트
function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-start gap-3">
      {icon}
      <div className="flex-1">
        <div className="mb-1 text-sm text-gray-600">{label}</div>
        <div className="font-semibold text-gray-900">{value}</div>
      </div>
    </div>
  );
}
