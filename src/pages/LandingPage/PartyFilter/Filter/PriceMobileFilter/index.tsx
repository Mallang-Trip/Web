import { Dispatch, memo, SetStateAction, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import partyFilterPrice from "../../../../../assets/svg/party_filter_price.svg";
import clsx from "clsx";

interface Props {
  setShowPriceModal: Dispatch<SetStateAction<boolean>>;
}

function PriceMobileFilter({ setShowPriceModal }: Props) {
  const price = useSelector((state: RootState) => state.partyFilter.price);
  const nowPrice = useMemo(
    () => (typeof price === "string" ? parseInt(price) : price),
    [price]
  );

  return (
    <button
      className="w-full h-12 flex gap-4 items-center px-4 text-sm font-bold bg-lightgray rounded-lg"
      onClick={() => setShowPriceModal(true)}
    >
      <img src={partyFilterPrice} alt="가격" />
      <span
        className={clsx(nowPrice > 300000 ? "text-textgray" : "text-boldgray")}
      >
        {nowPrice > 300000 ? "가격 범위" : `~${nowPrice / 10000}만원`}
      </span>
    </button>
  );
}

export default memo(PriceMobileFilter);
