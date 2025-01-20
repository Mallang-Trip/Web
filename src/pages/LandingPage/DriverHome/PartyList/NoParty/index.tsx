import { memo } from "react";

function NoParty() {
  return (
    <div className="w-full my-32">
      <p className="text-center text-gray400 text-xl font-bold">
        일정이 아직 없습니다.
        <br />
        여행자들의 신청을 기다려주세요!
      </p>
    </div>
  );
}

export default memo(NoParty);
