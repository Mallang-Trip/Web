/**
 * ISO 문자열을 한국어 날짜 형식으로 변환
 * @example "2024년 1월 15일 월요일"
 */
export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  });
}

/**
 * ISO 문자열을 한국어 시간 형식으로 변환
 * @example "오후 2:30"
 */
export function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * ISO 문자열을 한국어 날짜/시간 형식으로 변환
 * @example "2024년 1월 15일 월요일 오후 2:30"
 */
export function formatDateTime(isoString: string): string {
  if (!isoString) return "-";
  const d = new Date(isoString);
  if (Number.isNaN(d.getTime())) return "-";
  return `${formatDate(isoString)} ${formatTime(isoString)}`;
}
