"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/stores/auth-store";

const ONE_HOUR_MS = 60 * 60 * 1000;
const FIVE_MIN_MS = 5 * 60 * 1000;

export function TokenRefreshProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { accessToken, refreshToken, setTokens, logout } = useAuthStore();
  const timerRef = useRef<number | null>(null);

  // 공용 호출자: refresh 토큰으로 액세스 토큰 재발급
  const refreshAccessToken = async () => {
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
  };

  // 액세스 토큰 유효성 검증
  const validateAccessToken = async (): Promise<{
    valid: boolean;
    expiresAt?: number;
  }> => {
    const backend = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL || "";
    if (!accessToken) return { valid: false };
    try {
      const resp = await fetch(`${backend}/auth/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken }),
      });
      if (!resp.ok) return { valid: false };
      const json = await resp.json();
      const valid = Boolean(json?.data?.valid);
      const expiresAt = json?.data?.expiresAt as number | undefined;
      return { valid, expiresAt };
    } catch {
      return { valid: false };
    }
  };

  const schedule = (ms: number) => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(
      async () => {
        const ok = await refreshAccessToken();
        // 갱신 성공 시 다음 스케줄은 55분 후 (명세상 1시간 유효)
        if (ok) schedule(ONE_HOUR_MS - FIVE_MIN_MS);
      },
      Math.max(ms, FIVE_MIN_MS),
    );
  };

  // 앱 최초 진입: 유효성 검증 후 스케줄링 (임박/무효 시 즉시 갱신)
  useEffect(() => {
    let active = true;
    (async () => {
      if (!active) return;
      if (!refreshToken) return; // 인증 안 된 상태

      // accessToken 없으면 즉시 갱신
      if (!accessToken) {
        const ok = await refreshAccessToken();
        if (!active) return;
        if (ok) schedule(ONE_HOUR_MS - FIVE_MIN_MS);
        return;
      }

      const result = await validateAccessToken();
      if (!active) return;
      if (!result.valid) {
        const ok = await refreshAccessToken();
        if (!active) return;
        if (ok) schedule(ONE_HOUR_MS - FIVE_MIN_MS);
        return;
      }

      const expiresAt = result.expiresAt;
      if (!expiresAt) {
        // 만료 시간이 없으면 안전하게 55분 주기
        schedule(ONE_HOUR_MS - FIVE_MIN_MS);
        return;
      }
      const msToExpiry = expiresAt - Date.now();
      if (msToExpiry <= FIVE_MIN_MS) {
        const ok = await refreshAccessToken();
        if (!active) return;
        if (ok) schedule(ONE_HOUR_MS - FIVE_MIN_MS);
        return;
      }
      // 만료 5분 전으로 스케줄
      schedule(msToExpiry - FIVE_MIN_MS);
    })();
    return () => {
      active = false;
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [accessToken, refreshToken]);

  return <>{children}</>;
}
