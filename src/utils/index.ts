import { DriverData } from "@/types";

export function setScreenHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

export function setAutoLogin() {
  if (localStorage.getItem("autoLogin") !== "false") return;
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("autoLogin");
}

export function setColorTheme() {
  // if (
  //   localStorage.getItem("color-theme") === "dark" ||
  //   (!("color-theme" in localStorage) &&
  //     window.matchMedia("(prefers-color-scheme: dark)").matches)
  // ) {
  //   document.documentElement.classList.add("dark");
  //   localStorage.setItem("color-theme", "dark");
  // } else {
  //   document.documentElement.classList.remove("dark");
  //   localStorage.setItem("color-theme", "light");
  // }

  /* 우선, 라이트 모드만 적용 (다크 모드 기획 없음) */
  document.documentElement.classList.remove("dark");
  localStorage.setItem("color-theme", "light");
}

export function makePhoneNumber(value: string) {
  value = value.replace(/[^0-9]/g, "");
  return value.replace(
    /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,
    "$1-$2-$3"
  );
}

export function onlyNumber(value: string) {
  return value.replace(/[^0-9]/g, "");
}

export const priceToString = (price: number) => {
  return price.toLocaleString("en-US");
};

export const numberTo00 = (value: number) => {
  if (value >= 10) {
    return value;
  }

  return `0${value}`;
};

export const dateToString = (source: Date, delimiter = "-") => {
  const year = source.getFullYear();
  const month = numberTo00(source.getMonth() + 1);
  const day = numberTo00(source.getDate());

  return [year, month, day].join(delimiter);
};

export const dateToStringHan = (date: string) => {
  return `${date.slice(0, 4)}년 ${date.slice(5, 7)}월 ${date.slice(8, 10)}일`;
};

export const dateToGapKorean = (date: string, withTime: boolean) => {
  const pivot = new Date(date);
  const now = new Date();
  const diffMinute = (Number(now) - Number(pivot)) / (1000 * 60);

  if (diffMinute < 60)
    return `${Math.floor(diffMinute) > 0 ? Math.floor(diffMinute) : 0}분 전`;
  if (diffMinute < 60 * 24) return `${Math.floor(diffMinute / 60)}시간 전`;

  const year = pivot.getFullYear();
  const month = pivot.getMonth() + 1;
  const day = pivot.getDate();
  const hours = pivot.getHours();
  const minutes = pivot.getMinutes();

  if (!withTime) return `${year}년 ${month}월 ${day}일`;
  else
    return `${year}년 ${month}월 ${day}일 ${hours >= 12 ? "오후" : "오전"} ${
      hours % 12 || 12
    }시 ${minutes}분`;
};

export const dateToKoreanDataTime = (date: string) => {
  const year = date.slice(0, 4);
  const month = date.slice(5, 7);
  const day = date.slice(8, 10);
  const hours = date.slice(11, 13);
  const minutes = date.slice(14, 16);
  const seconds = date.slice(17, 19);

  return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}:${seconds}`;
};

export const computeGapDay = (date: string) => {
  const now = new Date();
  const pivot = new Date(date);

  const diff = pivot.getTime() - now.getTime();
  const diffDay = Math.ceil(diff / (24 * 60 * 60 * 1000));

  return diffDay;
};

export const chatListDateToGapKorean = (date: string) => {
  const pivot = new Date(date);
  const now = new Date();
  const diffMinute = (Number(now) - Number(pivot)) / (1000 * 60);

  if (diffMinute < 60)
    return `${Math.floor(diffMinute) > 0 ? Math.floor(diffMinute) : 0}분 전`;
  if (diffMinute < 60 * 24) return `${Math.floor(diffMinute / 60)}시간 전`;
  if (diffMinute < 60 * 24 * 7)
    return `${Math.floor(diffMinute / (60 * 24))}일 전`;

  const year = pivot.getFullYear();
  const month = pivot.getMonth() + 1;
  const day = pivot.getDate();

  return `${year}년 ${month}월 ${day}일`;
};

export const dateToKoreanDay = (date: string) => {
  const koreanDay = ["일", "월", "화", "수", "목", "금", "토"];
  const pivot = new Date(date);

  const year = pivot.getFullYear();
  const month = pivot.getMonth() + 1;
  const day = pivot.getDate();
  const dayOfWeek = pivot.getDay();

  return `${year}년 ${month}월 ${day}일 ${koreanDay[dayOfWeek]}요일`;
};

export const dateToKoreanTime = (date: string) => {
  const pivot = new Date(date);

  const hours = pivot.getHours();
  const minutes = pivot.getMinutes();

  return `${hours >= 12 ? "오후" : "오전"} ${numberTo00(
    hours % 12 || 12
  )}:${numberTo00(minutes)}`;
};

export const notificationDateToGapKorean = (date: string) => {
  const pivot = new Date(date);
  const now = new Date();
  const diffMinute = (Number(now) - Number(pivot)) / (1000 * 60);

  if (diffMinute < 60)
    return `${Math.floor(diffMinute) > 0 ? Math.floor(diffMinute) : 0}분 전`;
  if (diffMinute < 60 * 24) return `${Math.floor(diffMinute / 60)}시간 전`;
  if (diffMinute < 60 * 24 * 7)
    return `${Math.floor(diffMinute / (60 * 24))}일 전`;

  const month = pivot.getMonth() + 1;
  const day = pivot.getDate();

  return `${month}월 ${day}일`;
};

export const customRoundOne = (number: number) => {
  const roundedNumber = Math.round(number * 10) / 10;

  return Math.floor(roundedNumber) === roundedNumber
    ? Math.floor(roundedNumber)
    : roundedNumber;
};

export const isIos = () => {
  const UA = navigator.userAgent.toLowerCase();

  return (
    UA.indexOf("iphone") > -1 ||
    UA.indexOf("ipad") > -1 ||
    UA.indexOf("ipod") > -1
  );
};

export const shuffleArray = (array: DriverData[], seed: number) => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(seed % (i + 1));
    [result[i], result[randomIndex]] = [result[randomIndex], result[i]];
    seed = (seed * 9301 + 49297) % 233280; // 간단한 난수 생성
  }
  return result;
};

export const isIosPwa = () => {
  const UA = navigator.userAgent.toLowerCase();
  const isIOS =
    UA.indexOf("iphone") > -1 ||
    UA.indexOf("ipad") > -1 ||
    UA.indexOf("ipod") > -1;
  const isPWA = UA.indexOf("pwa") > -1;

  return isIOS && isPWA;
};
