import { useState } from "react";
import ReservationItem from "./ReservationItem";
import infoPrimary from "../../../../assets/svg/more-info-primary.svg";

function ReservationYear({ reservationYearData }) {
  const [showYearData, setShowYearData] = useState(true);

  return (
    <div className="my-9">
      <button
        className="flex gap-2 items-center mb-5"
        onClick={() => setShowYearData(!showYearData)}
      >
        <span className="text-xl text-primary font-bold">{`${reservationYearData[0].startDate.slice(
          0,
          4
        )}년`}</span>
        <img
          src={infoPrimary}
          className={`w-2 transition-transform duration-500 ${
            showYearData ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      <div
        className={`flex flex-col gap-5 mx-auto overflow-hidden transition-all duration-700 ${
          showYearData ? "max-h-full opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {reservationYearData.map((item) => (
          <ReservationItem key={item.partyId + item.status} {...item} />
        ))}
      </div>
    </div>
  );
}

export default ReservationYear;
