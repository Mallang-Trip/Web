import React, { useState } from "react";
import info from "../../assets/svg/Polygon 3.svg";

function BottomRefund() {
  const [showRefund, setShowRefund] = useState(false);

  return (
    <div className="mt-4 mb-24">
      <div
        className="flex gap-2 items-center mb-5 cursor-pointer"
        onClick={() => setShowRefund(!showRefund)}
      >
        <div className="text-lg font-bold">환불 정책</div>
        <img src={info} />
      </div>
      <div
        className={`text-sm text-darkgray overflow-hidden transition-all duration-500 ${
          showRefund ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p>취소 수수료는 여행 시작 9일 전 하루마다 10%씩 증가합니다.</p>
        <p>
          여행 당일 2차 결제가 이루어 진 후 예약 취소할 경우 환불이
          불가능합니다.
        </p>
        <br />
        <p>~2023년 03월 23일: 취소 수수료 10%</p>
        <p>2023년 03월 24일: 취소 수수료 20%</p>
        <p>2023년 03월 25일: 취소 수수료 30%</p>
        <p>2023년 03월 26일: 취소 수수료 40%</p>
        <p>2023년 03월 27일: 취소 수수료 50%</p>
        <p>2023년 03월 28일: 취소 수수료 60%</p>
        <p>2023년 03월 29일: 취소 수수료 70%</p>
        <p>2023년 03월 30일: 취소 수수료 80%</p>
        <p>2023년 03월 31일: 취소 수수료 90%</p>
        <p>2023년 여행 당일: 취소 수수료 100%</p>
      </div>
    </div>
  );
}

export default BottomRefund;
