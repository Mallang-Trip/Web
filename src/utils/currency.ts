/**
 * 통화 변환 유틸리티
 * 환율: 1 USD = 1400 KRW
 */

const EXCHANGE_RATE = 1400;

/**
 * 원화를 달러로 변환
 * @param krw 원화 금액
 * @returns 달러 금액
 */
export function krwToUsd(krw: number): number {
  return Math.round(krw / EXCHANGE_RATE);
}

/**
 * 달러를 원화로 변환
 * @param usd 달러 금액
 * @returns 원화 금액
 */
export function usdToKrw(usd: number): number {
  return usd * EXCHANGE_RATE;
}

/**
 * 원화를 언어에 맞는 통화 문자열로 포맷
 * @param krw 원화 금액
 * @param lang 언어 ('ko' | 'en' | 'zh')
 * @returns 포맷된 가격 문자열
 */
export function formatPrice(krw: number, lang: "ko" | "en" | "zh" = "ko"): string {
  if (lang === "en" || lang === "zh") {
    const usd = krwToUsd(krw);
    return `$${usd.toLocaleString()}`;
  }
  return `${krw.toLocaleString()}원`;
}

/**
 * 가격 문자열을 숫자로 파싱
 * @param priceStr 가격 문자열 (예: "1,160,000원", "$829")
 * @returns 숫자 금액 또는 null
 */
export function parsePrice(priceStr: string): number | null {
  const cleaned = priceStr.replace(/[^0-9]/g, "");
  const num = parseInt(cleaned, 10);
  return isNaN(num) ? null : num;
}
