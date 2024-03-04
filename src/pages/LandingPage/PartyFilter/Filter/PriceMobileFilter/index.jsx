import { useSelector } from "react-redux";
import partyFilterPrice from "../../../../../assets/svg/party_filter_price.svg";

function PriceMobileFilter({ setShowPriceModal }) {
  const price = useSelector((state) => state.partyFilter.price);

  return (
    <button
      className="w-full h-12 flex gap-4 items-center px-4 text-sm font-bold bg-lightgray rounded-lg"
      onClick={() => setShowPriceModal(true)}
    >
      <img src={partyFilterPrice} />
      <span className={price > 1000000 ? "text-textgray" : "text-boldgray"}>
        {price > 1000000 ? "가격 범위" : `~${price / 10000}만원`}
      </span>
    </button>
  );
}

export default PriceMobileFilter;
