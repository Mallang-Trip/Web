import React from "react";

function FirstCredit({ primary }) {
  return (
    <div>
      <div className="mb-5 grid grid-rows-2">
        <p className="text-lg flex font-bold">
          나의 1차 결제금
          <span className="text-sm text-darkgray font-normal pt-1 ml-1">
            (드라이버 & 예약자 전원 동의 시 결제)
          </span>
        </p>
        <p className={`text-sm ${primary ? "text-primary" : "text-darkgray"}`}>
          100,000원
        </p>
      </div>
    </div>
  );
}

export default FirstCredit;
