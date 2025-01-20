import { memo } from "react";

function NoParty() {
  return (
    <div className="w-full my-32">
      <p className="text-center text-gray400 text-xl font-bold">
        일정이 아직 없습니다.
        <br />
        지금 바로 일정에 가입해보세요!
      </p>
    </div>
  );
}

export default memo(NoParty);
