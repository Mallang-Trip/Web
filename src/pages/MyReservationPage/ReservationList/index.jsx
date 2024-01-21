import { useEffect, useState } from "react";
import ReservationYear from "./ReservationYear";

function ReservationList({ myReservationData }) {
  const [groupYearData, setGroupYearData] = useState([]);

  const groupYear = () => {
    const yearData = {};

    myReservationData.forEach((item) => {
      const year = item.startDate.slice(0, 4);
      yearData[year] = [...(yearData[year] || []), item];
    });

    setGroupYearData(
      Object.values(yearData).sort(
        (a, b) => b[0].startDate.slice(0, 4) - a[0].startDate.slice(0, 4)
      )
    );
  };

  useEffect(() => groupYear(), [myReservationData]);

  if (groupYearData.length === 0) return null;
  return (
    <>
      {groupYearData.map((item) => (
        <ReservationYear key={item[0].startDate} reservationYearData={item} />
      ))}
    </>
  );
}

export default ReservationList;
