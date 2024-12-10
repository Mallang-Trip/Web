import { Dispatch, memo, SetStateAction } from "react";
import clsx from "clsx";

interface Props {
  placeType: number;
  setPlaceType: Dispatch<SetStateAction<number>>;
}

function PlaceTab({ placeType, setPlaceType }: Props) {
  return (
    <div className="w-full grid grid-cols-2 rounded-lg border border-primary">
      <button
        className={clsx(
          "h-12 rounded-l-lg border-r border-primary text-sm font-semibold",
          placeType === 0 ? "text-white bg-primary" : "text-primary bg-white"
        )}
        onClick={() => setPlaceType(0)}
      >
        여행지 관리
      </button>
      <button
        className={clsx(
          "h-12 rounded-r-lg text-sm font-semibold",
          placeType === 1 ? "text-white bg-primary" : "text-primary bg-white"
        )}
        onClick={() => setPlaceType(1)}
      >
        여행지 목록
      </button>
    </div>
  );
}

export default memo(PlaceTab);
