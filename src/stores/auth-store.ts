import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  phoneNumber: string | null;
  hasHydrated: boolean;
}

interface AuthActions {
  loginWithTokens: (
    accessToken: string,
    refreshToken: string,
    phoneNumber: string,
  ) => void;
  setTokens: (tokens: {
    accessToken: string | null;
    refreshToken: string | null;
  }) => void;
  logout: () => void;
  clearAuth: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // State
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      phoneNumber: null,
      hasHydrated: false,

      // Actions
      loginWithTokens: (
        accessToken: string,
        refreshToken: string,
        phoneNumber: string,
      ) => {
        set({
          accessToken,
          refreshToken,
          isAuthenticated: true,
          phoneNumber,
        });

        // 쿠키에도 인증 상태 저장 (미들웨어에서 사용)
        if (typeof document !== "undefined") {
          document.cookie = `auth-token=${accessToken}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7일
          document.cookie = `is-authenticated=true; path=/; max-age=${60 * 60 * 24 * 7}`;
        }
      },

      setTokens: ({ accessToken, refreshToken }) => {
        set(() => ({
          accessToken,
          refreshToken,
          isAuthenticated: !!accessToken,
        }));
        if (typeof document !== "undefined") {
          if (accessToken) {
            document.cookie = `auth-token=${accessToken}; path=/; max-age=${60 * 60 * 24 * 7}`;
            document.cookie = `is-authenticated=true; path=/; max-age=${60 * 60 * 24 * 7}`;
          } else {
            document.cookie =
              "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            document.cookie =
              "is-authenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
          }
        }
      },

      logout: () => {
        set({
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          phoneNumber: null,
        });

        // 쿠키도 삭제
        if (typeof document !== "undefined") {
          document.cookie =
            "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
          document.cookie =
            "is-authenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }

        try {
          // GA4 logout 이벤트
          const w = window as unknown as { dataLayer?: unknown[] };
          w.dataLayer = w.dataLayer || [];
          (w.dataLayer as Array<Record<string, unknown>>).push({
            event: "logout",
          });
        } catch {}
      },

      clearAuth: () => {
        set({
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          phoneNumber: null,
        });

        // 쿠키도 삭제
        if (typeof document !== "undefined") {
          document.cookie =
            "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
          document.cookie =
            "is-authenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
      },
    }),
    {
      name: "auth-storage", // localStorage key
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
        phoneNumber: state.phoneNumber,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hasHydrated = true;
        }
      },
    },
  ),
);
