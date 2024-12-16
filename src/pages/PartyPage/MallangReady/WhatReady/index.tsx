import { memo, useState } from "react";
import info from "../../../../assets/svg/more-info-darkgray.svg";
import clsx from "clsx";

function WhatReady() {
  const [showWhat, setShowWhat] = useState(false);

  return (
    <div>
      <button
        className="flex gap-1.5 items-center mb-1.5"
        onClick={() => setShowWhat(!showWhat)}
      >
        <span className="text-base text-darkgray font-bold">말랑레디란?</span>
        <img
          src={info}
          className={clsx(
            "transition-transform duration-500",
            showWhat ? "rotate-180" : "rotate-0"
          )}
        />
      </button>
      <div
        className={clsx(
          "text-sm text-darkgray font-medium overflow-hidden transition-all duration-500",
          showWhat ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <p>
          가입된 파티원들끼리 여행을 확정하고 여행비 결제를 진행하기 위해
          드라이버를 포함한 모든 파티원들이 투표하는 것을 말합니다.
          <br />
          말랑레디 버튼을 클릭해서 말랑레디 ON 상태로 바꿀 수 있습니다.
        </p>
        <p className="mt-3">
          <span className="text-primary">
            모든 파티원들이 말랑레디 버튼을 ON으로 선택하면 예약금 결제가
            이루어지며, 이후에는 위약금 정책이 적용됩니다.
          </span>
          <br />
          말랑레디를 여행 당일 전까지 만장일치하지 못한다면 파티는 자동으로
          해산됩니다.
          <br />
          말랑레디를 파티원들과 상의하여 결정해보세요!
          <br />
        </p>
      </div>
    </div>
  );
}

export default memo(WhatReady);
