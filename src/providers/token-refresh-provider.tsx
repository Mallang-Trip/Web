"use client";

import { useCallback, useEffect, useRef } from "react";
import { useAuthStore } from "@/stores/auth-store";

const FIVE_MIN_MS = 5 * 60 * 1000;

export function TokenRefreshProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { refreshToken, setTokens, logout } = useAuthStore();
  const timerRef = useRef<number | null>(null);

  // 공용 호출자: refresh 토큰으로 액세스 토큰 재발급
  const refreshAccessToken = useCallback(async () => {
    if (!refreshToken) return false;
    const backend = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL || "";
    try {
      const resp = await fetch(`${backend}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });
      if (!resp.ok) {
        logout();
        return false;
      }
      const json = await resp.json();
      const newAccess = json?.data?.accessToken as string | undefined;
      if (newAccess) {
        setTokens({ accessToken: newAccess, refreshToken });
        return true;
      }
    } catch {
      // ignore
    }
    return false;
  }, [logout, refreshToken, setTokens]);

  const startInterval = useCallback(() => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(async () => {
      await refreshAccessToken();
    }, FIVE_MIN_MS);
  }, [refreshAccessToken]);

  // 최초 로그인(또는 앱 로드 시 이미 로그인된 상태)이면 즉시 1회 갱신 후 5분 주기 갱신 시작
  useEffect(() => {
    let active = true;
    (async () => {
      if (!active) return;
      if (!refreshToken) return; // 미인증 상태에서는 주기 갱신 시작 안 함

      await refreshAccessToken(); // 즉시 1회 갱신
      if (!active) return;
      startInterval(); // 이후 5분마다 갱신
    })();
    return () => {
      active = false;
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [refreshToken, refreshAccessToken, startInterval]);

  return <>{children}</>;
}
