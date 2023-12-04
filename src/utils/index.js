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

  if (!withTime)
    return `${pivot.getFullYear()}년 ${
      pivot.getMonth() + 1
    }월 ${pivot.getDate()}일`;
  else
    return `${pivot.getFullYear()}년 ${
      pivot.getMonth() + 1
    }월 ${pivot.getDate()}일 ${pivot.getHours() >= 12 ? "오후" : "오전"} ${
      pivot.getHours() % 12 || 12
    }시 ${pivot.getMinutes()}분`;
};
