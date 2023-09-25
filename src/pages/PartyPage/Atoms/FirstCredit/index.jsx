import React from "react";

function FirstCredit() {
  return (
    <div>
      <div className="pb-6 grid grid-rows-2">
        <p className="text-[18px] flex font-bold">
          나의 1차 결제금
          <span className="text-[14px] text-gray pt-1 ml-1">
            (드라이버 & 예약자 전원 동의 시 결제)
          </span>
        </p>
        <div>
          <p className="text-[14px] text-gray">100,000원</p>
        </div>
      </div>
    </div>
  );
}

export default FirstCredit;
