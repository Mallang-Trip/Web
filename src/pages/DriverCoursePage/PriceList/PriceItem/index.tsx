import { Dispatch, memo, SetStateAction } from "react";
import { priceToString } from "@/utils";
import clsx from "clsx";

interface Props {
  hours: number;
  price: number;
  index: number;
  priceIndex: number;
  setPriceIndex: Dispatch<SetStateAction<number>>;
}

function PriceItem({ hours, price, index, priceIndex, setPriceIndex }: Props) {
  return (
    <button
      className={clsx(
        "shrink-0 px-5 py-2 text-sm border border-current rounded-full",
        index === priceIndex
          ? "bg-primary text-white"
          : "bg-white hover:bg-primary text-darkgray hover:text-white"
      )}
      onClick={() => setPriceIndex(index)}
    >
      {`${hours}시간 ${priceToString(price)}원`}
    </button>
  );
}

export default memo(PriceItem);
