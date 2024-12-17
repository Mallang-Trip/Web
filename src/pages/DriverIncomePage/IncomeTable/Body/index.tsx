import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { priceToString } from "@/utils";
import incomeMoreInfo from "@/assets/svg/income-more-info.svg";
import clsx from "clsx";

interface Props {
  partyName: string;
  date: string;
  afterCommission: number;
  beforeCommission: number;
  commission: number;
  type: string;
  partyId: number;
  remitted: boolean;
}

function Body({
  partyName,
  date,
  afterCommission,
  beforeCommission,
  commission,
  type,
  partyId,
  remitted,
}: Props) {
  const navigation = useNavigate();
  const [showToolTip, setShowToolTip] = useState(false);

  return (
    <div className="w-full py-3 grid grid-cols-4 items-center text-center bg-white border border-gray300 rounded-xl">
      <p
        className="px-1 cursor-pointer"
        onClick={() => navigation(`/party/detail/${partyId}`)}
      >
        {partyName}
      </p>
      <p className="px-1 text-gray500 font-medium">
        {date.replaceAll("-", ".")}
      </p>
      <div className="flex justify-center items-center gap-1 relative px-1">
        <span className="text-primary">{priceToString(afterCommission)}</span>
        <span className="text-gray700">원</span>
        <img
          src={incomeMoreInfo}
          alt="수익금"
          onMouseEnter={() => setShowToolTip(true)}
          onMouseLeave={() => setShowToolTip(false)}
        />
        <div
          className={clsx(
            "absolute top-5 left-1/2 -translate-x-1/2 sm:translate-x-0 p-2.5 text-xs text-gray500 whitespace-pre bg-white border border-gray400 rounded-lg z-10",
            showToolTip ? "block" : "hidden"
          )}
        >
          말랑트립 적용 수수료 :{" "}
          <span className="text-[#FF0000]">
            {((commission / beforeCommission) * 100).toFixed(1)}%
          </span>
          <br />
          수수료 이전 수익 : {priceToString(beforeCommission)}원
        </div>
      </div>
      <p className="px-1 text-gray500">
        {type === "PARTY_INCOME" ? "파티 수익" : "위약금 수익"}
        <br />
        {remitted ? (
          <span className="text-primary">(송금 완료)</span>
        ) : (
          <span className="text-[#ff0000]">(송금 대기)</span>
        )}
      </p>
    </div>
  );
}

export default memo(Body);
