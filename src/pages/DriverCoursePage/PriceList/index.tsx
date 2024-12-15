import { Dispatch, memo, SetStateAction } from "react";
import PriceItem from "./PriceItem";

interface Props {
  prices: { hours: number; price: number }[];
  priceIndex: number;
  setPriceIndex: Dispatch<SetStateAction<number>>;
}

function PriceList({ prices, priceIndex, setPriceIndex }: Props) {
  return (
    <div className="flex gap-2 custom-scrollbar">
      {prices.map((item, index) => (
        <PriceItem
          key={index}
          index={index}
          priceIndex={priceIndex}
          setPriceIndex={setPriceIndex}
          {...item}
        />
      ))}
    </div>
  );
}

export default memo(PriceList);
