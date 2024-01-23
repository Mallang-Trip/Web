export function setScreenHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
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

export function makePhoneNumber(value) {
  value = value.replace(/[^0-9]/g, "");
  return value.replace(
    /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,
    "$1-$2-$3"
  );
}

export function onlyNumber(value) {
  return value.replace(/[^0-9]/g, "");
}

export const priceToString = (price) => {
  return price.toLocaleString("en-US");
};

export const numberTo00 = (value) => {
  if (value >= 10) {
    return value;
  }

  return `0${value}`;
};

export const dateToString = (source, delimiter = "-") => {
  const year = source.getFullYear();
  const month = numberTo00(source.getMonth() + 1);
  const day = numberTo00(source.getDate());

  return [year, month, day].join(delimiter);
};

export const dateToStringHan = (date) => {
  return `${date.slice(0, 4)}년 ${date.slice(5, 7)}월 ${date.slice(8, 10)}일`;
};

export const dateToGapKorean = (date, withTime) => {
  const pivot = new Date(date);
  const now = new Date();
  const diffMinute = (now - pivot) / (1000 * 60);

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

export const dateToKoreanDataTime = (date) => {
  const year = date.slice(0, 4);
  const month = date.slice(5, 7);
  const day = date.slice(8, 10);
  const hours = date.slice(11, 13);
  const minutes = date.slice(14, 16);
  const seconds = date.slice(17, 19);

  return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}:${seconds}`;
};

export const computeGapDay = (date) => {
  const now = new Date();
  const pivot = new Date(date);

  const diff = pivot.getTime() - now.getTime();
  const diffDay = Math.ceil(diff / (24 * 60 * 60 * 1000));

  return diffDay - 1;
};

export const chatListDateToGapKorean = (date) => {
  const pivot = new Date(date);
  const now = new Date();
  const diffMinute = (now - pivot) / (1000 * 60);

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

export const dateToKoreanDay = (date) => {
  const koreanDay = ["일", "월", "화", "수", "목", "금", "토"];
  const pivot = new Date(date);

  const year = pivot.getFullYear();
  const month = pivot.getMonth() + 1;
  const day = pivot.getDate();
  const dayOfWeek = pivot.getDay();

  return `${year}년 ${month}월 ${day}일 ${koreanDay[dayOfWeek]}요일`;
};

export const dateToKoreanTime = (date) => {
  const pivot = new Date(date);

  const hours = pivot.getHours();
  const minutes = pivot.getMinutes();

  return `${hours >= 12 ? "오후" : "오전"} ${numberTo00(
    hours % 12 || 12
  )}:${numberTo00(minutes)}`;
};

export const customRoundOne = (number) => {
  const roundedNumber = Math.round(number * 10) / 10;

  return Math.floor(roundedNumber) === roundedNumber
    ? Math.floor(roundedNumber)
    : roundedNumber;
};
