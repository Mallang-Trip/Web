/**
 * Google Analytics 4 이벤트 타입 및 상수 정의
 *
 * 네이밍 규칙:
 * - snake_case 사용
 * - click_ 접두사로 사용자 클릭 이벤트 구분
 * - 비즈니스 플로우별로 그룹화
 */

// ============================================================================
// 예약 플로우 이벤트
// ============================================================================

export const GA_EVENTS = {
  // 예약 진입점
  TOUR_BOOKING_SIDEBAR: "click_tour_booking_sidebar",
  TOUR_BOOKING_MOBILE_BOTTOM: "click_tour_booking_mobile_bottom",
  JEJU_BOOKING_SIDEBAR: "click_jeju_booking_sidebar",
  JEJU_BOOKING_MOBILE_BOTTOM: "click_jeju_booking_mobile_bottom",

  // 예약 제출
  TOUR_RESERVATION_SUBMIT: "click_tour_reservation_submit",
  JEJU_RESERVATION_SUBMIT: "click_jeju_reservation_submit",

  // 예약 관리
  CANCEL_RESERVATION: "click_cancel_reservation",
  EDIT_RESERVATION: "click_edit_reservation",
  SAVE_RESERVATION_EDIT: "click_save_reservation_edit",
  CANCEL_RESERVATION_EDIT: "click_cancel_reservation_edit",
  VIEW_ALL_RESERVATIONS: "click_view_all_reservations",
  VIEW_RESERVATIONS_FROM_NOT_FOUND: "click_view_reservations_from_not_found",

  // 결제 및 문서
  ISSUE_TRANSACTION_STATEMENT: "click_issue_transaction_statement",
  ISSUE_CANCELLATION_RECEIPT: "click_issue_cancellation_receipt",
  DOWNLOAD_TRANSACTION_PDF: "click_download_transaction_pdf",
  DOWNLOAD_TRANSACTION_PDF_MOBILE: "click_download_transaction_pdf_mobile",
  DOWNLOAD_CANCELLATION_PDF: "click_download_cancellation_pdf",
  DOWNLOAD_CANCELLATION_PDF_MOBILE: "click_download_cancellation_pdf_mobile",
  CLOSE_PAYMENT_FAILURE: "click_close_payment_failure",
  CLOSE_PAYPAL_CANCELLATION: "click_close_paypal_cancellation",

  // 인증 플로우
  SEND_OTP: "click_send_otp",
  VERIFY_OTP: "click_verify_otp",
  AGREE_TERMS: "click_agree_terms",

  // 네비게이션
  HEADER_LOGIN_DESKTOP: "click_header_login_desktop",
  HEADER_LOGIN_MOBILE: "click_header_login_mobile",
  HEADER_LOGOUT: "click_header_logout",
  HEADER_LOGOUT_MOBILE: "click_header_logout_mobile",
  HEADER_RESERVATIONS: "click_header_reservations",
  HEADER_RESERVATIONS_MOBILE: "click_header_reservations_mobile",
  HEADER_ADMIN: "click_header_admin",

  // 랜딩 및 CTA
  HOME_CTA_START_TOUR: "click_home_cta_start_tour",
  VIP_GUIDE_VIEW_MAP: "click_vip_guide_view_map",
  GO_HOME_FROM_NOT_FOUND: "click_go_home_from_not_found",

  // 관리자 액션
  ADMIN_APPROVE_RESERVATION: "click_admin_approve_reservation",
  ADMIN_REJECT_RESERVATION: "click_admin_reject_reservation",
  ADMIN_VIEW_RESERVATION_DETAIL: "click_admin_view_reservation_detail",
} as const;

export type GAEventName = (typeof GA_EVENTS)[keyof typeof GA_EVENTS];

// ============================================================================
// 이벤트 파라미터 타입 정의
// ============================================================================

export interface BaseGAParams {
  [key: string]:
    | string
    | number
    | boolean
    | undefined
    | null
    | string[]
    | number[];
}

// 예약 관련 파라미터
export interface ReservationGAParams extends BaseGAParams {
  reservation_id?: string | number;
  destination_id?: number;
  tour_name?: string;
  people_count?: number;
  payment_amount?: number;
  reservation_status?: string;
}

// 투어 관련 파라미터
export interface TourGAParams extends BaseGAParams {
  tour_name?: string;
  destination_id?: number;
  tour_hours?: number;
  scroll_position?: string;
  device_type?: "desktop" | "mobile";
}

// 결제 관련 파라미터
export interface PaymentGAParams extends BaseGAParams {
  payment_number?: string;
  payment_amount?: number;
  document_type?: "transaction_statement" | "cancellation_receipt";
  refund_amount?: number;
}

// 인증 관련 파라미터
export interface AuthGAParams extends BaseGAParams {
  phone_prefix?: string;
  login_method?: "phone_otp" | "email";
  otp_length?: number;
  agreed_terms?: string[];
}

// 네비게이션 관련 파라미터
export interface NavigationGAParams extends BaseGAParams {
  source_page?: string;
  destination_page?: string;
  device_type?: "desktop" | "mobile";
}

// 관리자 관련 파라미터
export interface AdminGAParams extends BaseGAParams {
  reservation_id?: string | number;
  action_type?: "approve" | "reject" | "view";
  admin_role?: string;
}

// 통합 GA 파라미터 타입
export type GAParams =
  | ReservationGAParams
  | TourGAParams
  | PaymentGAParams
  | AuthGAParams
  | NavigationGAParams
  | AdminGAParams
  | BaseGAParams;

// ============================================================================
// 유틸리티 타입 및 헬퍼
// ============================================================================

/**
 * Button 컴포넌트에서 사용할 GA 이벤트 Props 타입
 */
export interface GAEventProps {
  /**
   * GA 이벤트 이름 (GA_EVENTS에서 선택하거나 커스텀 문자열)
   */
  gaEvent?: GAEventName | string;

  /**
   * GA 이벤트 파라미터
   */
  gaParams?: GAParams;

  /**
   * 카테고리 (선택 사항, 추가 분류를 위한)
   */
  gaCategory?: string;

  /**
   * 라벨 (선택 사항, 추가 설명을 위한)
   */
  gaLabel?: string;
}

/**
 * 이벤트 파라미터 유효성 검사 및 정리
 */
export function sanitizeGAParams(params?: GAParams): Record<string, unknown> {
  if (!params) return {};

  const sanitized: Record<string, unknown> = {};

  Object.entries(params).forEach(([key, value]) => {
    // undefined, null 값 제거
    if (value === undefined || value === null) return;

    // 빈 문자열 제거
    if (typeof value === "string" && value.trim() === "") return;

    sanitized[key] = value;
  });

  return sanitized;
}

/**
 * 이벤트 이름 유효성 검사 (GA4 규칙 준수)
 */
export function validateEventName(eventName: string): boolean {
  // GA4 이벤트 이름 규칙:
  // - 최대 40자
  // - 영문자로 시작
  // - 영문자, 숫자, 언더스코어(_)만 사용
  const eventNameRegex = /^[a-zA-Z][a-zA-Z0-9_]{0,39}$/;
  return eventNameRegex.test(eventName);
}
