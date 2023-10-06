import React from "react";

function SecondCredit() {
  return (
    <div>
      <div className="mb-5 grid grid-rows-2">
        <p className="text-lg flex font-bold">
          나의 2차 결제금
          <span className="text-sm text-darkgray font-normal pt-1 ml-1">
            (4월 1일 자정 결제)
          </span>
        </p>
        <p className="text-sm text-primary">모든 인원 예약 시 0원</p>
        <p className="text-sm text-black">여석이 1개 남을 경우 33,333원</p>
        <p className="text-sm text-black">여석이 2개 남을 경우 100,000원</p>
        <p className="text-sm text-black">여석이 3개 남을 경우 300,000원</p>
      </div>
    </div>
  );
}

export default SecondCredit;
