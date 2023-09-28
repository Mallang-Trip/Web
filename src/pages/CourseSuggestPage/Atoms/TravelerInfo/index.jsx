import React from "react";

function TravelerInfo() {
  return (
    <div className="flex flex-col gap-4 mt-6 text-sm text-darkgray">
      <p>여행자1</p>
      <p>{`예약자 이름: 김재윤`}</p>
      <p>{`핸드폰 번호: 010-1234-5678`}</p>
    </div>
  );
}

export default TravelerInfo;
