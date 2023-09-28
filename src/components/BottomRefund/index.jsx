import React from "react";
import info from "../../assets/svg/Polygon 3.svg";

function BottomRefund() {
  return (
    <div className="mt-4 mb-24">
      <div className="flex gap-2 items-center mb-5">
        <div className="text-lg font-bold">환불 정책</div>
        <img src={info} />
      </div>
      <div className="text-sm text-darkgray">
        <p>취소 수수료는 여행 시작 9일 전 하루마다 10%씩 증가합니다.</p>
        <p>
          여행 당일 2차 결제가 이루어 진 후 예약 취소할 경우 환불이
          불가능합니다.
        </p>
      </div>
    </div>
  );
}

export default BottomRefund;
