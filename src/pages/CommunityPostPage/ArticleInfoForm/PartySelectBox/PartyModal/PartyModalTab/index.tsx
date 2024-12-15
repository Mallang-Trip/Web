import { Dispatch, memo, SetStateAction } from "react";
import clsx from "clsx";

interface Props {
  isTabHeart: boolean;
  setIsTabHeart: Dispatch<SetStateAction<boolean>>;
}

function PartyModalTab({ isTabHeart, setIsTabHeart }: Props) {
  return (
    <div className="flex gap-2 mt-5 mb-9">
      <button
        className={clsx("border text-sm px-5 py-1.5 rounded-full", {
          "bg-primary text-white border-primary": isTabHeart,
          "bg-white text-darkgray border-darkgray": !isTabHeart,
        })}
        onClick={() => setIsTabHeart(true)}
      >
        찜 목록
      </button>
      <button
        className={clsx("border text-sm px-5 py-1.5 rounded-full", {
          "bg-white text-darkgray border-darkgray": isTabHeart,
          "bg-primary text-white border-primary": !isTabHeart,
        })}
        onClick={() => setIsTabHeart(false)}
      >
        예약 내역
      </button>
    </div>
  );
}

export default memo(PartyModalTab);
