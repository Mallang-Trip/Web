import jeju from "../assets/images/제주도 이미지.jpg";
import gangwon from "../assets/images/강원도 이미지.jpg";
import uleng from "../assets/images/울릉도 이미지.jpg";
import jinhye from "../assets/images/진해.jpg";

export const days = [
  {
    eng: "MONDAY",
    kor: "월",
  },
  {
    eng: "TUESDAY",
    kor: "화",
  },
  {
    eng: "WEDNESDAY",
    kor: "수",
  },
  {
    eng: "THURSDAY",
    kor: "목",
  },
  {
    eng: "FRIDAY",
    kor: "금",
  },
  {
    eng: "SATURDAY",
    kor: "토",
  },
  {
    eng: "SUNDAY",
    kor: "일",
  },
];

export const regionData = [
  {
    image: jeju,
    name: "제주도",
  },
  {
    image: gangwon,
    name: "강원도",
  },
  {
    image: uleng,
    name: "울릉도",
  },
  {
    image: jinhye,
    name: "진해",
  },
];

export const partyStatusObj = {
  RECRUITING: "가입 중",
  WAITING_DRIVER_APPROVAL: "드라이버 승인 대기 중",
  WAITING_JOIN_APPROVAL: "코스 변경 제안 중",
  WAITING_COURSE_CHANGE_APPROVAL: "코스 변경 제안 중",
  SEALED: "예약 중",
  CANCELED_BY_DRIVER_REFUSED: "파티 제안 거절",
  CANCELED_BY_PROPOSER: "파티 제안 취소",
  CANCELED_BY_EXPIRATION: "모집 기간 만료",
  CANCELED_BY_ALL_QUIT: "파티 취소",
  CANCELED_BY_DRIVER_QUIT: "파티 취소",
  DAY_OF_TRAVEL: "여행 당일",
  FINISHED: "여행 완료",
};
