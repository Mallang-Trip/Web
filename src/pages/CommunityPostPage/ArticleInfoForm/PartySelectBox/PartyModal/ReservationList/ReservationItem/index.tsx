import { memo } from "react";
import { HeartParty } from "../../../../../../../types";
import { customRoundOne, dateToStringHan } from "../../../../../../../utils";
import { partyStatusObj } from "../../../../../../../utils/data";

interface Props extends HeartParty {
  selectPartyHandler: (party: { name: string; partyId: number }) => void;
}

function ReservationItem({
  selectPartyHandler,
  partyId,
  image,
  name,
  startDate,
  headcount,
  capacity,
  price,
  driverName,
  status,
}: Props) {
  return (
    <div
      className="w-full relative h-64 mb-5 cursor-pointer rounded-lg"
      onClick={() =>
        selectPartyHandler({
          name: name,
          partyId: partyId,
        })
      }
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
