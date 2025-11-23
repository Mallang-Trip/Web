export const sleep = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const elapsedTime = (date: string): string => {
  const start = new Date(date);
  const end = new Date();

  const seconds = Math.floor((end.getTime() - start.getTime()) / 1000);
  if (seconds < 60) return "방금 전";

  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;

  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;

  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일 전`;

  return `${start.toLocaleDateString("ko-KR")}`;
};

export const getBaseUrl = (): string => {
  return "https://mallangtrip.com";
};

export const getBackendBaseUrl = (): string => {
  return process.env.NEXT_PUBLIC_BACKEND_SERVER_URL || "";
};

// 첫 접속 경로 기록 및 로고/로그인 리디렉트 목적지 계산
export const computeFirstEntryTargetFrom = (firstUrl: string): string => {
  try {
    const path = firstUrl || "/";
    // URL 전체가 들어올 수 있으므로, 호스트를 제거하고 경로만 사용
    const parsed = (() => {
      if (path.startsWith("http://") || path.startsWith("https://")) {
        try {
          const u = new URL(path);
          return u.pathname + u.search + u.hash;
        } catch {
          return path;
        }
      }
      return path;
    })();

    if (parsed === "/") return "/";
    if (parsed.startsWith("/detail")) return parsed;
    return "/";
  } catch {
    return "/";
  }
};

export const captureFirstEntryIfNeeded = (): string => {
  if (typeof window === "undefined") return "/";
  try {
    const ss = window.sessionStorage;
    const existing = ss.getItem("firstEntryUrl");
    if (existing) return existing;

    const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    ss.setItem("firstEntryUrl", current);

    const target = computeFirstEntryTargetFrom(current);
    ss.setItem("firstEntryTarget", target);
    return current;
  } catch {
    return "/";
  }
};

export const getFirstEntryTarget = (): string => {
  if (typeof window === "undefined") return "/";
  try {
    const ss = window.sessionStorage;
    const storedTarget = ss.getItem("firstEntryTarget");
    if (storedTarget) return storedTarget;

    const firstUrl = ss.getItem("firstEntryUrl");
    if (firstUrl) {
      const computed = computeFirstEntryTargetFrom(firstUrl);
      ss.setItem("firstEntryTarget", computed);
      return computed;
    }

    const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    ss.setItem("firstEntryUrl", current);
    const computed = computeFirstEntryTargetFrom(current);
    ss.setItem("firstEntryTarget", computed);
    return computed;
  } catch {
    return "/";
  }
};
