import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  region: string;
  member: number;
  date: string;
  driverId: number | string;
  selectedCourseId: number | string;
}

function PageButton({
  region,
  member,
  date,
  driverId,
  selectedCourseId,
}: Props) {
  const navigation = useNavigate();

  const prevHandler = useCallback(() => {
    navigation(-1);
  }, []);

  const nextHandler = useCallback(() => {
    if ((typeof driverId === "number" && driverId <= 0) || driverId === "null")
      navigation(
        `/party/new/3?region=${region}&member=${member}&date=${date}&driverId=${driverId}`
      );
    else if (
      (typeof selectedCourseId === "string" &&
        parseInt(selectedCourseId) > 0) ||
      (typeof selectedCourseId === "number" && selectedCourseId > 0)
    )
      navigation(
        `/party/new/4?region=${region}&member=${member}&date=${date}&driverId=${driverId}`
      );
    else
      navigation(
        `/party/new/5?region=${region}&member=${member}&date=${date}&driverId=${driverId}`
      );
  }, [driverId, region, member, date, selectedCourseId]);

  return (
    <div className="w-full flex justify-center gap-7 my-24 mx-auto px-4">
      <button
        className="h-12 bg-white rounded-full text-darkgray text-sm w-64 border border-darkgray"
        onClick={prevHandler}
      >
        뒤로가기
      </button>
      <button
        className="h-12 rounded-full text-sm w-64 border text-white bg-primary border-primary"
        onClick={nextHandler}
      >
        다음
      </button>
    </div>
  );
}

export default memo(PageButton);
