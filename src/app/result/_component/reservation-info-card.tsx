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
import { useTranslation } from "@/hooks/use-translation";

import { formatPrice } from "@/utils/currency";

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
  const { t, lang } = useTranslation();
  const tData = t.result.reservationInfo;

  // 제주 투어 판별 (한국어, 영어, 중국어)
  const isJejuTour = /제주|jeju|济州/i.test(currentReservation.reservationName);

  const isCanceled =
    (currentReservation.status || "").toUpperCase() === "CANCELED" ||
    !!currentReservation.canceledAt;

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(lang === "ko" ? "ko-KR" : "en-US", {
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
            {tData.title}
          </span>
          {isCanceled && (
            <span className="text-sm font-normal text-red-600">
              ({tData.canceled})
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className={isCanceled ? "text-gray-600" : ""}>
        <div className="space-y-4">
          {/* 투어 이름 */}
          <InfoRow
            icon={
              <DocumentIcon className="mt-1 h-5 w-5 flex-shrink-0 text-blue-500" />
            }
            label={tData.tourName}
            value={currentReservation.reservationName}
          />

          {/* 예약자 */}
          <InfoRow
            icon={
              <UserIcon className="mt-1 h-5 w-5 flex-shrink-0 text-blue-500" />
            }
            label={tData.booker}
            value={`${currentReservation.name} (${currentReservation.email})`}
          />

          {/* 전화번호 */}
          <InfoRow
            icon={
              <PhoneIcon className="mt-1 h-5 w-5 flex-shrink-0 text-blue-500" />
            }
            label={tData.phone}
            value={currentReservation.phoneNumber}
          />

          {/* 참여 인원 */}
          <InfoRow
            icon={
              <UsersIcon className="mt-1 h-5 w-5 flex-shrink-0 text-blue-500" />
            }
            label={tData.participants}
            value={`${currentReservation.userCount.toLocaleString()}${tData.people}`}
          />

          {/* 투어 날짜 */}
          <InfoRow
            icon={
              <CalendarIcon className="mt-1 h-5 w-5 flex-shrink-0 text-blue-500" />
            }
            label={tData.tourDate}
            value={formatDate(currentReservation.meetingDate)}
          />

          {/* 제주 투어: 이용 시간 추가 */}
          {isJejuTour && currentReservation.reservationName && (
            <InfoRow
              icon={
                <CalendarIcon className="mt-1 h-5 w-5 flex-shrink-0 text-blue-500" />
              }
              label="이용 시간"
              value={
                currentReservation.reservationName.match(/(\d+)시간/)?.[0] ||
                "-"
              }
            />
          )}

          {/* 픽업 시간 */}
          <InfoRow
            icon={
              <CalendarIcon className="mt-1 h-5 w-5 flex-shrink-0 text-blue-500" />
            }
            label={isJejuTour ? "픽업 시간" : tData.tourDate}
            value={currentReservation.pickupTime}
          />

          {isJejuTour ? (
            /* 제주 투어: 픽업 및 복귀 주소를 포함한 대략적인 경로 */
            <InfoRow
              icon={
                <LocationIcon className="mt-1 h-5 w-5 flex-shrink-0 text-blue-500" />
              }
              label="픽업 및 복귀 주소를 포함한 대략적인 경로"
              value={currentReservation.pickupAddress}
            />
          ) : (
            /* 일반 투어: 픽업 장소와 하차 장소 분리 */
            <>
              <InfoRow
                icon={
                  <LocationIcon className="mt-1 h-5 w-5 flex-shrink-0 text-blue-500" />
                }
                label={tData.pickupLocation}
                value={currentReservation.pickupAddress}
              />

              <InfoRow
                icon={
                  <ReturnIcon className="mt-1 h-5 w-5 flex-shrink-0 text-blue-500" />
                }
                label={tData.dropLocation}
                value={currentReservation.returnAddress}
              />
            </>
          )}

          {/* 요청사항 */}
          <InfoRow
            icon={
              <MessageIcon className="mt-1 h-5 w-5 flex-shrink-0 text-blue-500" />
            }
            label={tData.requests}
            value={currentReservation.requests || tData.noRequests}
          />

          {/* 투어 요금 */}
          <InfoRow
            icon={
              <MoneyIcon className="mt-1 h-5 w-5 flex-shrink-0 text-blue-500" />
            }
            label={tData.tourFee}
            value={formatPrice(currentReservation.price, lang as "ko" | "en")}
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
