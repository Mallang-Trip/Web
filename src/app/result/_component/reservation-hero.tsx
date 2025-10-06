import {
  getStatusTitle,
  getStatusBadgeClass,
  getStatusLabel,
  getStatusMessage,
} from "@/utils/status";

interface Reservation {
  reservationId: string | number;
  reservationName: string;
  price: number;
  status: string;
  createdAt: string;
  requestedAt?: string | null;
  approvedAt?: string | null;
  rejectedAt?: string | null;
  canceledAt?: string | null;
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
  const { status, requestedAt, canceledAt } = currentReservation;

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-emerald-400 px-6 py-16 text-center text-white">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
          {getStatusTitle(status)}
        </h1>
        <DateTimeInfo
          requestedAt={requestedAt}
          canceledAt={canceledAt}
          formatDate={formatDate}
          formatTime={formatTime}
        />
        <StatusBadge status={status} />
      </section>

      {/* Receipt Banner */}
      <ReceiptBanner status={status} />
    </>
  );
}

// 날짜/시간 정보 컴포넌트
function DateTimeInfo({
  requestedAt,
  canceledAt,
  formatDate,
  formatTime,
}: {
  requestedAt?: string | null;
  canceledAt?: string | null;
  formatDate: (isoString: string) => string;
  formatTime: (isoString: string) => string;
}) {
  if (!requestedAt && !canceledAt) return null;

  return (
    <div className="space-y-1 text-lg opacity-90">
      {requestedAt && (
        <p>
          예약 일시: {formatDate(requestedAt)} {formatTime(requestedAt)}
        </p>
      )}
      {canceledAt && (
        <p>
          취소 일시: {formatDate(canceledAt)} {formatTime(canceledAt)}
        </p>
      )}
    </div>
  );
}

// 상태 배지 컴포넌트
function StatusBadge({ status }: { status: string }) {
  return (
    <div className="mt-4 flex justify-center gap-2">
      <span
        className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusBadgeClass(status)}`}
      >
        {getStatusLabel(status)}
      </span>
    </div>
  );
}

// 영수증 배너 컴포넌트
function ReceiptBanner({ status }: { status: string }) {
  return (
    <div className="relative z-10 mx-auto -mt-6 max-w-xl px-6">
      <div className="flex items-center gap-3 rounded-xl bg-white p-4 text-sm text-gray-600 shadow-lg">
        <MailIcon />
        <span>{getStatusMessage(status)}</span>
      </div>
    </div>
  );
}

// 메일 아이콘
function MailIcon() {
  return (
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
  );
}
