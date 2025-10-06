/**
 * 예약 상태 관련 유틸리티 함수
 */

export type ReservationStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "CANCELED";

interface StatusConfig {
  title: string;
  badge: string;
  label: string;
  message: string;
  color: string;
}

const STATUS_CONFIG: Record<string, StatusConfig> = {
  PENDING: {
    title: "🎉 예약 신청 완료!",
    badge: "bg-blue-600 text-white",
    label: "예약 확인 중",
    message: "영업일 기준 24시간 내로 확정 여부를 안내드리겠습니다.",
    color: "text-blue-600 bg-blue-50",
  },
  APPROVED: {
    title: "✅ 예약 승인됨",
    badge: "bg-green-600 text-white",
    label: "예약 승인",
    message: "예약이 승인되었습니다.",
    color: "text-green-600 bg-green-50",
  },
  REJECTED: {
    title: "❌ 예약 반려됨",
    badge: "bg-red-600 text-white",
    label: "예약 반려",
    message: "예약이 반려되었습니다. 3영업일 이내에 결제금액이 환불됩니다.",
    color: "text-red-600 bg-red-50",
  },
  CANCELED: {
    title: "❌ 예약 취소됨",
    badge: "bg-gray-600 text-white",
    label: "예약 취소",
    message: "예약이 취소되었습니다. 3영업일 이내에 결제금액이 환불됩니다.",
    color: "text-gray-600 bg-gray-50",
  },
};

const DEFAULT_CONFIG: StatusConfig = {
  title: "🎉 예약 상태",
  badge: "bg-blue-600 text-white",
  label: "예약 상태",
  message: "즐거운 여행 되세요!",
  color: "text-gray-600 bg-gray-50",
};

/**
 * 예약 상태에 따른 설정 가져오기
 */
export function getStatusConfig(status: string): StatusConfig {
  const normalizedStatus = (status || "").toUpperCase();
  return STATUS_CONFIG[normalizedStatus] || DEFAULT_CONFIG;
}

/**
 * 예약 상태에 따른 제목
 */
export function getStatusTitle(status: string): string {
  return getStatusConfig(status).title;
}

/**
 * 예약 상태에 따른 배지 스타일
 */
export function getStatusBadgeClass(status: string): string {
  return getStatusConfig(status).badge;
}

/**
 * 예약 상태에 따른 라벨 (한글)
 */
export function getStatusLabel(status: string): string {
  return getStatusConfig(status).label;
}

/**
 * 예약 상태에 따른 메시지
 */
export function getStatusMessage(status: string): string {
  return getStatusConfig(status).message;
}

/**
 * 예약 상태에 따른 색상 클래스
 */
export function getStatusColor(status: string): string {
  return getStatusConfig(status).color;
}
