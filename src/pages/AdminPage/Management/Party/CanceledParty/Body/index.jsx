import { useNavigate } from "react-router-dom";

function Body({
  partyId,
  name,
  startDate,
  headcount,
  capacity,
  driverName,
  status,
}) {
  const navigation = useNavigate();
  const statusObj = {
    CANCELED_BY_DRIVER_REFUSED: "드라이버 파티 생성 거절",
    CANCELED_BY_PROPOSER: "여행자 파티 생성 취소",
    CANCELED_BY_EXPIRATION: "파티 모집 기간 만료",
    CANCELED_BY_ALL_QUIT: "여행자 전원 탈퇴/취소",
    CANCELED_BY_DRIVER_QUIT: "드라이버 탈퇴/취소",
  };

  return (
    <div className="w-full py-3 grid grid-cols-5 items-center text-center bg-white border border-gray300 rounded-xl">
      <p
        className="px-1 cursor-pointer"
        onClick={() => navigation(`/admin/party?party_id=${partyId}`)}
      >
        {name}
      </p>
      <p className="px-1 text-gray500 font-medium">
        {startDate.replaceAll("-", ".")}
      </p>
      <p className="px-1 text-gray500 font-medium">
        {headcount}/{capacity} 명
      </p>
      <p className="px-1 text-[#FF0000]">{statusObj[status] || status}</p>
      <p className="px-1 text-gray500">{driverName}</p>
    </div>
  );
}

export default Body;
