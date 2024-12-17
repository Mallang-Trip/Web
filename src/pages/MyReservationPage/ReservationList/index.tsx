import { memo, useCallback, useEffect, useState } from "react";
import { Party } from "@/types";
import ReservationYear from "./ReservationYear";

interface Props {
  myReservationData: Party[];
}

function ReservationList({ myReservationData }: Props) {
  const [groupYearData, setGroupYearData] = useState<Party[][]>([]);

  const groupYear = useCallback(() => {
    const yearData: Record<string, Party[]> = {};

    myReservationData.forEach((item) => {
      const year = item.startDate.slice(0, 4);
      yearData[year] = [...(yearData[year] || []), item];
    });

    setGroupYearData(
      Object.values(yearData).sort(
        (a, b) =>
          parseInt(b[0].startDate.slice(0, 4)) -
          parseInt(a[0].startDate.slice(0, 4))
      )
    );
  }, [myReservationData]);

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

export default memo(ReservationList);
