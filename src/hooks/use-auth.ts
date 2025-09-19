import { useAuthStore } from "@/stores/auth-store";
import { useRouter } from "next/navigation";
import { getFirstEntryTarget } from "@/utils";

export const useAuth = (logoHref?: string) => {
  const {
    accessToken,
    refreshToken,
    isAuthenticated,
    phoneNumber,
    hasHydrated,
    logout,
  } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    const target =
      logoHref || (typeof window !== "undefined" ? getFirstEntryTarget() : "/");
    try {
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem("logoutRedirectTo", target);
      }
    } catch {}
    logout();
    router.replace(target);
  };

  const requireAuth = () => {
    if (!isAuthenticated) {
      // 로그아웃 직후라면 로그인 대신 지정된 경로로 이동
      if (typeof window !== "undefined") {
        try {
          const logoutRedirectTo =
            window.sessionStorage.getItem("logoutRedirectTo");
          if (logoutRedirectTo) {
            window.sessionStorage.removeItem("logoutRedirectTo");
            router.replace(logoutRedirectTo);
            return false;
          }
        } catch {}

        // 현재 경로를 저장하고 로그인 페이지로 이동
        const currentPath = window.location.pathname;
        localStorage.setItem("returnUrl", currentPath);
        router.push(`/login?returnUrl=${encodeURIComponent(currentPath)}`);
      } else {
        router.push("/login");
      }
      return false;
    }
    return true;
  };

  return {
    accessToken,
    refreshToken,
    isAuthenticated,
    phoneNumber,
    hasHydrated,
    logout: handleLogout,
    requireAuth,
  };
};
