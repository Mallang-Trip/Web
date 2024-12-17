import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { priceToString } from "@/utils";
import { Party } from "@/types";
import clsx from "clsx";

function Body({
  partyId,
  name,
  startDate,
  headcount,
  capacity,
  promotion,
  driverName,
  price,
}: Party) {
  const navigation = useNavigate();

  return (
    <div className="w-full py-3 grid grid-cols-6 items-center text-center bg-white border border-gray300 rounded-xl">
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
      <p
        className={clsx(
          "px-1 font-medium",
          promotion ? "text-primary" : "text-gray500"
        )}
      >
        {promotion ? "O" : "X"}
      </p>
      <p className="px-1 text-primary">{priceToString(price * capacity)} 원</p>
      <p className="px-1 text-gray500">{driverName}</p>
    </div>
  );
}

export default memo(Body);
