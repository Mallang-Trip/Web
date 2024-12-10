import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Party } from "../../../../../../types";
import clsx from "clsx";

function Body({
  partyId,
  name,
  startDate,
  headcount,
  capacity,
  promotion,
  driverName,
}: Party) {
  const navigation = useNavigate();

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
      <div className="flex justify-center items-center gap-1 relative px-1">
        <span className="text-primary">
          {headcount}/{capacity}
        </span>
        <span className="text-gray700">명</span>
      </div>
      <p
        className={clsx(
          "px-1 font-medium",
          promotion ? "text-primary" : "text-gray500"
        )}
      >
        {promotion ? "O" : "X"}
      </p>
      <p className="px-1 text-gray500">{driverName}</p>
    </div>
  );
}

export default memo(Body);
