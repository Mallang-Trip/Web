import { useAuthStore } from "@/stores/auth-store";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const { userToken, isAuthenticated, phoneNumber, hasHydrated, logout } =
    useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const requireAuth = () => {
    if (!isAuthenticated) {
      // 현재 경로를 저장하고 로그인 페이지로 이동
      if (typeof window !== "undefined") {
        const currentPath = window.location.pathname;
        localStorage.setItem("returnUrl", currentPath);

        console.log("🔒 인증 필요 - 로그인 페이지로 리다이렉트:", currentPath);
        router.push(`/login?returnUrl=${encodeURIComponent(currentPath)}`);
      } else {
        router.push("/login");
      }
      return false;
    }
    return true;
  };

  return {
    userToken,
    isAuthenticated,
    phoneNumber,
    hasHydrated,
    logout: handleLogout,
    requireAuth,
  };
};
