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
