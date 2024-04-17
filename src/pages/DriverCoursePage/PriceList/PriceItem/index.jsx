import { priceToString } from "../../../../utils";

function PriceItem({ hours, price, index, priceIndex, setPriceIndex }) {
  return (
    <button
      className={`shrink-0 px-5 py-2 text-sm border border-current rounded-full ${index === priceIndex ? "bg-primary text-white" : "bg-white hover:bg-primary text-darkgray hover:text-white"}`}
      onClick={() => setPriceIndex(index)}
    >
      {`${hours}시간 ${priceToString(price)}원`}
    </button>
  );
}

export default PriceItem;
