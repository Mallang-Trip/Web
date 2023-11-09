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
