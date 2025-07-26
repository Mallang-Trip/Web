import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  userToken: string | null;
  isAuthenticated: boolean;
  phoneNumber: string | null;
  hasHydrated: boolean;
}

interface AuthActions {
  login: (userToken: string, phoneNumber: string) => void;
  logout: () => void;
  clearAuth: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // State
      userToken: null,
      isAuthenticated: false,
      phoneNumber: null,
      hasHydrated: false,

      // Actions
      login: (userToken: string, phoneNumber: string) => {
        set({
          userToken,
          isAuthenticated: true,
          phoneNumber,
        });

        // 쿠키에도 인증 상태 저장 (미들웨어에서 사용)
        if (typeof document !== "undefined") {
          document.cookie = `auth-token=${userToken}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7일
          document.cookie = `is-authenticated=true; path=/; max-age=${60 * 60 * 24 * 7}`;
        }

        console.log("로그인 완료:", { userToken, phoneNumber });
      },

      logout: () => {
        set({
          userToken: null,
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

        console.log("로그아웃 완료");
      },

      clearAuth: () => {
        set({
          userToken: null,
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
        userToken: state.userToken,
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
