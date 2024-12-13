import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { partyStatusObj } from "../../../../../utils/data";
import { customRoundOne, dateToStringHan } from "../../../../../utils";
import { Party } from "../../../../../types";

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
}: Party) {
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
          <p className="text-sm">{partyStatusObj[status]}</p>
        </div>
      </div>
    </div>
  );
}

export default memo(ReservationItem);
