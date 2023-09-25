import React from "react";

function SecondCredit() {
  return (
    <div>
      <div className="pb-6 grid grid-rows-2">
        <p className="text-[18px] flex font-bold">
          나의 2차 결제금
          <span className="text-[14px] text-gray pt-1 ml-1">
            (4월 1일 자정 결제)
          </span>
        </p>
        <p className="text-[14px] text-primary pt-1">모든 인원 예약 시 0원</p>
        <p>여석이 1개 남을 경우 33,333원</p>
        <p>여석이 2개 남을 경우 100,000원</p>
        <p>여석이 3개 남을 경우 300,000원</p>
      </div>
    </div>
  );
}

export default SecondCredit;
