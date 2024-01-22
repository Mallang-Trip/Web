import { useNavigate } from "react-router-dom";
import { customRoundOne, dateToStringHan } from "../../../../../utils";

const statusObj = {
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

function ReservationItem({
  partyId,
  image,
  name,
  startDate,
  headcount,
  capacity,
  price,
  driverName,
  status,
}) {
  const navigation = useNavigate();

  return (
    <div
      className="w-full h-64 relative cursor-pointer rounded-lg"
      onClick={() => navigation(`/party/detail/${partyId}`)}
    >
      <img
        className="absolute top-0 left-0 object-cover object-center w-full h-full overflow-hidden rounded-lg"
        src={image}
        alt={name}
      />
      <div className="z-10 bg-black bg-opacity-30 w-full h-full flex justify-center items-center rounded-lg absolute top-0 left-0">
        <div className="text-center text-white flex flex-col gap-1.5">
          <p className="text-xl font-bold">{name}</p>
          <p className="text-sm">{`${dateToStringHan(startDate).slice(
            6
          )} | ${headcount}/${capacity}명 | ${customRoundOne(
            (price * capacity) / 10000
          )}만원 | ${driverName} 드라이버`}</p>
          <p className="text-sm">{statusObj[status]}</p>
        </div>
      </div>
    </div>
  );
}

export default ReservationItem;
