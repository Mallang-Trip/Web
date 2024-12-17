import { memo } from "react";
import star from "@/assets/svg/star.svg";

interface Props {
  name: string;
  views: number;
  avgRate: number | null;
  address: string;
}

function PlaceInfoTitle({ name, views, avgRate, address }: Props) {
  return (
    <div className="mb-4">
      <div className="mb-1 pt-6 flex">
        <p className="text-2xl font-bold">{name}</p>
        <div className="flex gap-1 items-center m-2 mt-3 text-xs">
          <span>{`조회수 ${views}회`}</span>
          <span>|</span>
          <img src={star} />
          <span>{avgRate ? avgRate.toFixed(1) : "0.0"}</span>
        </div>
      </div>
      <div className="text-sm">{address.replace("()", "")}</div>
    </div>
  );
}

export default memo(PlaceInfoTitle);
