import { memo } from "react";

function Head() {
  return (
    <div className="w-full py-3 grid grid-cols-6 items-center text-center bg-skyblue rounded-xl">
      <p>일정명</p>
      <p>일정 날짜</p>
      <p>결제/취소 일자</p>
      <p>처리 금액</p>
      <p>상태</p>
      <p>영수증</p>
    </div>
  );
}

export default memo(Head);
