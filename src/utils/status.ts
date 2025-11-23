/**
 * 예약 상태 관련 유틸리티 함수
 */

import { translations } from "@/locales";

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

const getStatusConfigByLanguage = (lang: "ko" | "en" = "ko") => {
  const t = translations[lang].result.status;

  return {
    PENDING: {
      title: t.pending.title,
      badge: "bg-blue-600 text-white",
      label: t.pending.label,
      message: t.pending.message,
      color: "text-blue-600 bg-blue-50",
    },
    APPROVED: {
      title: t.approved.title,
      badge: "bg-green-600 text-white",
      label: t.approved.label,
      message: t.approved.message,
      color: "text-green-600 bg-green-50",
    },
    REJECTED: {
      title: t.rejected.title,
      badge: "bg-red-600 text-white",
      label: t.rejected.label,
      message: t.rejected.message,
      color: "text-red-600 bg-red-50",
    },
    CANCELED: {
      title: t.canceled.title,
      badge: "bg-gray-600 text-white",
      label: t.canceled.label,
      message: t.canceled.message,
      color: "text-gray-600 bg-gray-50",
    },
  };
};

const getDefaultConfig = (lang: "ko" | "en" = "ko"): StatusConfig => {
  const t = translations[lang].result.status.default;
  return {
    title: t.title,
    badge: "bg-blue-600 text-white",
    label: t.label,
    message: t.message,
    color: "text-gray-600 bg-gray-50",
  };
};

/**
 * 예약 상태에 따른 설정 가져오기
 */
export function getStatusConfig(
  status: string,
  lang: "ko" | "en" = "ko",
): StatusConfig {
  const normalizedStatus = (status || "").toUpperCase();
  const STATUS_CONFIG = getStatusConfigByLanguage(lang);
  return (
    STATUS_CONFIG[normalizedStatus as keyof typeof STATUS_CONFIG] ||
    getDefaultConfig(lang)
  );
}

/**
 * 예약 상태에 따른 제목
 */
export function getStatusTitle(
  status: string,
  lang: "ko" | "en" = "ko",
): string {
  return getStatusConfig(status, lang).title;
}

/**
 * 예약 상태에 따른 배지 스타일
 */
export function getStatusBadgeClass(
  status: string,
  lang: "ko" | "en" = "ko",
): string {
  return getStatusConfig(status, lang).badge;
}

/**
 * 예약 상태에 따른 라벨
 */
export function getStatusLabel(
  status: string,
  lang: "ko" | "en" = "ko",
): string {
  return getStatusConfig(status, lang).label;
}

/**
 * 예약 상태에 따른 메시지
 */
export function getStatusMessage(
  status: string,
  lang: "ko" | "en" = "ko",
): string {
  return getStatusConfig(status, lang).message;
}

/**
 * 예약 상태에 따른 색상 클래스
 */
export function getStatusColor(
  status: string,
  lang: "ko" | "en" = "ko",
): string {
  return getStatusConfig(status, lang).color;
}
