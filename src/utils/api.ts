import { useAuthStore } from "@/stores/auth-store";

// API 기본 설정
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

// 토큰을 포함한 헤더 생성
const getAuthHeaders = () => {
  const { userToken } = useAuthStore.getState();
  return {
    "Content-Type": "application/json",
    ...(userToken && { Authorization: `Bearer ${userToken}` }),
  };
};

// 기본 fetch wrapper
export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {},
): Promise<Response> => {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
  });

  // 토큰이 만료되었거나 인증에 문제가 있는 경우
  if (response.status === 401) {
    const { logout } = useAuthStore.getState();
    logout();
    // 로그인 페이지로 리다이렉트 (필요시)
    // window.location.href = '/login';
  }

  return response;
};

// GET 요청
export const apiGet = async (endpoint: string): Promise<any> => {
  const response = await apiRequest(endpoint, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
};

// POST 요청
export const apiPost = async (endpoint: string, data: any): Promise<any> => {
  const response = await apiRequest(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
};

// PUT 요청
export const apiPut = async (endpoint: string, data: any): Promise<any> => {
  const response = await apiRequest(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
};

// DELETE 요청
export const apiDelete = async (endpoint: string): Promise<any> => {
  const response = await apiRequest(endpoint, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
};

// 사용 예시:
// const userData = await apiGet('/api/user/profile');
// const result = await apiPost('/api/orders', { productId: 123 });
