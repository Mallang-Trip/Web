import React from "react";

function TravelerInfo() {
  return (
    <div className="grid gap-2 pb-8">
      <div className="flex">
        <p className="text-[14px] mt-0.5 text-gray">예약자 이름: </p>
        <p className="text-[14px] mt-0.5 text-gray">김재윤</p>
      </div>
      <div className="flex">
        <p className="text-[14px] mt-0.5 text-gray">핸드폰 번호: </p>
        <p className="text-[14px] mt-0.5 text-gray">010-1234-5678</p>
      </div>
    </div>
  );
}

export default TravelerInfo;
