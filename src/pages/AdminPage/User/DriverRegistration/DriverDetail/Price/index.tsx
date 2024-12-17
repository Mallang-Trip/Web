import { memo } from "react";
import { priceToString } from "@/utils";
import PriceInfo from "./PriceInfo";

interface Props {
  prices: {
    hours: number;
    price: number;
  }[];
}

function Price({ prices }: Props) {
  return (
    <>
      <p className="text-lg font-bold text-black mt-12 mb-5">가격 설정</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {prices.map((price) => (
          <PriceInfo
            key={price.hours + price.price}
            content={`${price.hours}시간당 ${priceToString(price.price)}원`}
          />
        ))}
      </div>
    </>
  );
}

export default memo(Price);
