import { memo } from "react";

function Head() {
  return (
    <div className="w-full py-3 grid grid-cols-6 items-center text-center bg-skyblue rounded-xl">
      <p>파티명</p>
      <p>기간</p>
      <p>파티원 수</p>
      <p>프로모션</p>
      <p>취소 사유</p>
      <p>드라이버</p>
    </div>
  );
}

export default memo(Head);
