import React from "react";
import info from "../../assets/svg/Polygon 3.svg";

function BottomRefund() {
  return (
    <div className="">
      <div className="flex gap-2 pt-9">
        <div className="text-lg pb-4 ">환불 정책</div>
        <img src={info} className="pb-5" />
      </div>
      <div className="text-sm text-gray ">
        취소 수수료는 여행 시작 9일 전 하루마다 10%씩 증가합니다.
      </div>
      <div className="text-sm text-gray">
        여행 당일 2차 결제가 이루어 진 후 예약 취소할 경우 환불이 불가능합니다.
      </div>
    </div>
  );
}

export default BottomRefund;
