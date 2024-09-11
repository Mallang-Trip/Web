import { memo } from "react";
import { useNavigate } from "react-router-dom";
import Vector from "../../../src/assets/svg/Vector.svg";

interface Props {
  name: string;
  driverName: string;
  driverId: number;
  isDriver: boolean;
  partyStatus: string;
  myParty: boolean;
}

function HeadTitle({
  name,
  driverName,
  driverId,
  isDriver,
  partyStatus,
  myParty,
}: Props) {
  const navigation = useNavigate();

  return (
    <>
      <div className="text-2xl font-bold text-black flex gap-2 items-center">
        <p>{name}</p>
        {(partyStatus === "WAITING_JOIN_APPROVAL" ||
          partyStatus === "WAITING_COURSE_CHANGE_APPROVAL") && (
          <p className="text-primary text-lg">
            {myParty ? "수정 제안 결정 중" : "코스 변경 제안 중"}
          </p>
        )}
        {partyStatus === "CANCELED_BY_EXPIRATION" && (
          <p className="text-[#E30000] text-lg">모집 기간 만료</p>
        )}
      </div>
      {isDriver && (
        <div
          className="mt-1 text-sm text-darkgray cursor-pointer flex gap-1 items-center"
          onClick={() => navigation(`/driver/profile/${driverId}`)}
        >
          <span>{`${driverName} 드라이버`}</span>
          <img src={Vector} alt={driverName} />
        </div>
      )}
    </>
  );
}

export default memo(HeadTitle);
