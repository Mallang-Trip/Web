import { Dispatch, memo, SetStateAction, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import clsx from "clsx";

interface Props {
  setShowPriceModal: Dispatch<SetStateAction<boolean>>;
}

function PriceFilter({ setShowPriceModal }: Props) {
  const price = useSelector((state: RootState) => state.partyFilter.price);
  const nowPrice = useMemo(
    () => (typeof price === "string" ? parseInt(price) : price),
    [price]
  );

  return (
    <button
      className="w-full h-full px-8 py-6 flex flex-col justify-between rounded-l-3xl"
      onClick={() => setShowPriceModal(true)}
    >
      <p className="text-base leading-5 text-gray700 font-medium">
        1인당 가격 범위
      </p>
      <p
        className={clsx(
          "text-2xl leading-7 font-bold",
          nowPrice > 300000 ? "text-gray400" : "text-gray800"
        )}
      >
        {nowPrice > 300000 ? "모든 가격" : `~${nowPrice / 10000}만원`}
      </p>
    </button>
  );
}

export default memo(PriceFilter);
