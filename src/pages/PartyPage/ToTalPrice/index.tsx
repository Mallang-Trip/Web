import { memo } from "react";
import { priceToString } from "@/utils";

interface Props {
  totalPrice: number;
  isDriver: boolean;
  partyStatus: string;
}

function ToTalPrice({ totalPrice, isDriver, partyStatus }: Props) {
  if (
    partyStatus === "CANCELED_BY_ALL_QUIT" ||
    partyStatus === "CANCELED_BY_DRIVER_QUIT" ||
    (partyStatus === "CANCELED_BY_DRIVER_REFUSED" && isDriver)
  )
    return null;
  return (
    <div className="flex flex-col gap-1 my-7">
      <p className="text-lg text-black font-bold">
        {isDriver ? "총 수익" : "전체 일정 여행비"}
      </p>
      <p className="text-sm text-darkgray">{`${priceToString(
        totalPrice
      )}원`}</p>
    </div>
  );
}

export default memo(ToTalPrice);
