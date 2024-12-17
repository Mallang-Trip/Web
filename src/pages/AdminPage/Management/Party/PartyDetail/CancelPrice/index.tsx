import { memo } from "react";
import { priceToString } from "@/utils";

interface Props {
  discountPrice: number;
}

function CancelPrice({ discountPrice }: Props) {
  return (
    <div className="flex flex-col gap-1 my-7">
      <p className="text-lg text-black font-bold">총 위약금 수익</p>
      <p className="text-sm text-darkgray">{`${priceToString(
        discountPrice
      )}원`}</p>
    </div>
  );
}

export default memo(CancelPrice);
