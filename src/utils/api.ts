import { useAuthStore } from "@/stores/auth-store";

// API 기본 설정
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL || "";

// 표준화된 API 에러
export class ApiError extends Error {
  status: number;
  errorCode?: string;
  responseBody?: unknown;

  constructor(
    message: string,
    status: number,
    errorCode?: string,
    responseBody?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errorCode = errorCode;
    this.responseBody = responseBody;
  }
}

export type ApiEnvelope<T> = {
  success: boolean;
  data: T;
  message?: string;
  errorCode?: string;
  timestamp?: string;
};

// 토큰을 포함한 헤더 생성
const getAuthHeaders = () => {
  const { accessToken } = useAuthStore.getState();
  return {
    "Content-Type": "application/json",
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };
};

async function tryRefreshToken(): Promise<boolean> {
  const { refreshToken, setTokens, logout } = useAuthStore.getState();
  if (!refreshToken) return false;
  try {
    const resp = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });
    if (!resp.ok) {
      logout();
      return false;
    }
    const json = await resp.json();
    const newAccessToken = json?.data?.accessToken;
    if (!newAccessToken) return false;
    setTokens({ accessToken: newAccessToken, refreshToken });
    return true;
  } catch {
    return false;
  }
}

// 기본 fetch wrapper (401 시 1회 토큰 갱신 후 재시도)
export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {},
): Promise<Response> => {
  const url = `${API_BASE_URL}${endpoint}`;

  const doFetch = async () =>
    fetch(url, {
      ...options,
      headers: {
        ...getAuthHeaders(),
        ...options.headers,
      },
    });

  let response = await doFetch();
  // 1) 순수 401 처리: 리프레시 후 1회 재시도
  if (response.status === 401) {
    const refreshed = await tryRefreshToken();
    if (refreshed) {
      response = await doFetch();
    }
    return response;
  }

  // 2) 200이지만 { success:false, errorCode: UNAUTHORIZED/TOKEN_EXPIRED/COMMON_005/INVALID_TOKEN } 형태 처리
  try {
    const cloned = response.clone();
    const json = (await cloned.json()) as {
      success?: boolean;
      errorCode?: string;
    };
    const errorCode = json?.errorCode || "";
    const isAuthError =
      json?.success === false &&
      ["UNAUTHORIZED", "TOKEN_EXPIRED", "COMMON_005", "INVALID_TOKEN"].includes(
        errorCode,
      );
    if (isAuthError) {
      const refreshed = await tryRefreshToken();
      if (refreshed) {
        response = await doFetch();
      }
    }
  } catch {
    // JSON 아닌 응답이면 무시
  }

  return response;
};

// 공통 응답 파서
const parseJson = async <T = unknown>(
  response: Response,
): Promise<ApiEnvelope<T>> => {
  let json: ApiEnvelope<T> | null = null;
  try {
    json = (await response.json()) as ApiEnvelope<T>;
  } catch {
    // no-op: 비 JSON 응답 대비
  }
  if (!response.ok || json?.success === false) {
    const message =
      (json as { message?: string } | null)?.message ||
      `API Error: ${response.status}`;
    const errorCode = (json as { errorCode?: string } | null)?.errorCode;
    throw new ApiError(message, response.status, errorCode, json ?? undefined);
  }
  return json as ApiEnvelope<T>;
};

// GET 요청
export const apiGet = async <T = unknown>(
  endpoint: string,
): Promise<ApiEnvelope<T>> => {
  const response = await apiRequest(endpoint, { method: "GET" });
  return parseJson<T>(response);
};

// POST 요청
export const apiPost = async <T = unknown>(
  endpoint: string,
  data: Record<string, unknown>,
): Promise<ApiEnvelope<T>> => {
  const response = await apiRequest(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return parseJson<T>(response);
};

// PUT 요청
export const apiPut = async <T = unknown>(
  endpoint: string,
  data: Record<string, unknown>,
): Promise<ApiEnvelope<T>> => {
  const response = await apiRequest(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return parseJson<T>(response);
};

// DELETE 요청
export const apiDelete = async <T = unknown>(
  endpoint: string,
): Promise<ApiEnvelope<T>> => {
  const response = await apiRequest(endpoint, { method: "DELETE" });
  return parseJson<T>(response);
};

// 도메인별 API 헬퍼
export const AuthAPI = {
  sendLoginSms: (phoneNumber: string) =>
    apiPost<{
      txId: string;
      expiresAt: string;
      maskedPhoneNumber: string;
      message: string;
    }>(`/auth/login/sms/send`, { phoneNumber }),
  verifyLoginSms: (params: { txId: string; verificationCode: string }) =>
    apiPost<{
      accessToken: string;
      refreshToken: string;
      tokenType: string;
      expiresIn: number;
      userId: number;
      isNewUser: boolean;
      user: Record<string, unknown>;
    }>(`/auth/login/sms/verify`, {
      txId: params.txId,
      verificationCode: params.verificationCode,
    }),
  sendRegisterSms: (phoneNumber: string) =>
    apiPost<{
      txId: string;
      expiresAt: string;
      maskedPhoneNumber: string;
      message: string;
    }>(`/auth/register/sms/send`, { phoneNumber }),
  verifyRegisterSms: (params: { txId: string; verificationCode: string }) =>
    apiPost<{
      userId: number;
      isNewUser: boolean;
      accessToken: string;
      refreshToken: string;
      tokenType: string;
      expiresIn: number;
      user: Record<string, unknown>;
    }>(`/auth/register/sms/verify`, {
      txId: params.txId,
      verificationCode: params.verificationCode,
    }),
};

export const ReservationAPI = {
  create: <T = unknown>(body: Record<string, unknown>) =>
    apiPost<T>(`/reservations`, body),
  // 관리자 전체 예약 목록 조회 (페이지네이션)
  adminAll: <T = unknown>(params: { offset?: number; limit?: number } = {}) =>
    apiGet<T>(
      `/reservations/admin/all?offset=${encodeURIComponent(
        String(params.offset ?? 0),
      )}&limit=${encodeURIComponent(String(params.limit ?? 50))}`,
    ),
  // 사용자 검색 조회 (비회원 포함)
  search: <T = unknown>(params: { email: string; phoneNumber: string }) =>
    apiGet<T>(
      `/reservations/search?email=${encodeURIComponent(
        params.email,
      )}&phoneNumber=${encodeURIComponent(params.phoneNumber)}`,
    ),
  // ID 기반 상세 조회 (공개)
  getById: <T = unknown>(reservationId: number | string) =>
    apiGet<T>(`/reservations/${reservationId}`),
  // 로그인 사용자의 내 예약 목록
  my: <T = unknown>() => apiGet<T>(`/reservations/my`),
  // 취소 (회원) - POST /reservations/{id}/cancel with optional requests
  cancel: <T = unknown>(reservationId: number | string, requests?: string) =>
    apiPost<T>(`/reservations/${reservationId}/cancel`, {
      ...(requests ? { requests } : {}),
    }),
  approve: (reservationId: number | string, adminMemo?: string) =>
    apiPost(`/reservations/${reservationId}/approve`, {
      ...(adminMemo ? { adminMemo } : {}),
    }),
  reject: (
    reservationId: number | string,
    params: { reason: string; adminMemo?: string },
  ) => apiPost(`/reservations/${reservationId}/reject`, params),
  update: (reservationId: number | string, body: Record<string, unknown>) =>
    apiPut(`/reservations/${reservationId}`, body),
  // 여행지 예약 가능 여부 조회 (MVP: 단일 여행지라면 destinationId를 기반으로 상태 확인)
  availability: <T = unknown>(destinationId: number) =>
    apiGet<T>(`/reservations/availability/${destinationId}`),
};
