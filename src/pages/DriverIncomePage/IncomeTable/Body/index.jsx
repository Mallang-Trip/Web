import { useState } from "react";
import incomeMoreInfo from "../../../../assets/svg/income-more-info.svg";

function Body() {
  const [showToolTip, setShowToolTip] = useState(false);

  return (
    <div className="w-full py-3 grid grid-cols-4 items-center text-center bg-white border border-gray300 rounded-xl">
      <p className="px-1">짱 좋은 파티</p>
      <p className="px-1 text-gray500 font-medium">2024.03.30</p>
      <div className="flex justify-center items-center gap-1 relative px-1">
        <span className="text-primary">193,000</span>
        <span className="text-gray700">원</span>
        <img
          src={incomeMoreInfo}
          alt="수익금"
          onMouseEnter={() => setShowToolTip(true)}
          onMouseLeave={() => setShowToolTip(false)}
        />
        <div
          className={`${showToolTip ? "block" : "hidden"} absolute top-5 left-1/2 -translate-x-1/2 sm:translate-x-0 p-2.5 text-xs text-gray500 whitespace-pre bg-white border border-gray400 rounded-lg z-10`}
        >
          말랑트립 적용 수수료 : <span className="text-[#FF0000]">1.7%</span>
          <br />
          수수료 이전 수익 : 25,000원
        </div>
      </div>
      <p className="px-1 text-gray500">위약금 수익</p>
    </div>
  );
}

export default Body;
