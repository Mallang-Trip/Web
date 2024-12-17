import { memo, useCallback, useState } from "react";
import { Party } from "@/types";
import ReservationItem from "./ReservationItem";
import infoPrimary from "@/assets/svg/more-info-primary.svg";
import clsx from "clsx";

interface Props {
  reservationYearData: Party[];
}

function ReservationYear({ reservationYearData }: Props) {
  const [showYearData, setShowYearData] = useState(true);

  const clickHandler = useCallback(() => {
    setShowYearData(!showYearData);
  }, [showYearData]);

  return (
    <div className="my-9">
      <button className="flex gap-2 items-center mb-5" onClick={clickHandler}>
        <span className="text-xl text-primary font-bold">{`${reservationYearData[0].startDate.slice(
          0,
          4
        )}년`}</span>
        <img
          src={infoPrimary}
          className={clsx(
            "w-2 transition-transform duration-500",
            showYearData ? "rotate-180" : "rotate-0"
          )}
        />
      </button>
      <div
        className={clsx(
          "flex flex-col gap-5 mx-auto overflow-hidden transition-all duration-500",
          showYearData ? "max-h-full opacity-100" : "max-h-0 opacity-0"
        )}
      >
        {reservationYearData.map((item) => (
          <ReservationItem key={item.partyId + item.status} {...item} />
        ))}
      </div>
    </div>
  );
}

export default memo(ReservationYear);
