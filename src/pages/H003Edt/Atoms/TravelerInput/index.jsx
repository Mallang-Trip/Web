import React from "react";

function TravelerInput() {
  return (
    <div className="grid gap-2">
      <div className="flex">
        <p className="text-[14px] mt-0.5 text-gray">예약자 이름: </p>
        <p className="text-[14px] mt-0.5 text-primary">직접 입력하세요</p>
      </div>
      <div className="flex">
        <p className="text-[14px] mt-0.5 text-gray">핸드폰 번호: </p>
        <p className="text-[14px] mt-0.5 text-primary">직접 입력하세요</p>
      </div>
    </div>
  );
}

export default TravelerInput;
