import { memo } from "react";

function Head() {
  return (
    <div className="w-full py-3 grid grid-cols-4 items-center text-center bg-skyblue rounded-xl">
      <p>일정명</p>
      <p>날짜</p>
      <p>수익금</p>
      <p>상세 내역</p>
    </div>
  );
}

export default memo(Head);
