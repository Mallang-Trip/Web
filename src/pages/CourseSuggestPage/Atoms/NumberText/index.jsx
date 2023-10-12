import React from "react";

function NumberText({ memberCount }) {
  return (
    <div className="flex">
      <p className="text-lg font-bold">참여 인원</p>
      <p className="text-sm mt-1 ml-1.5 font-normal text-darkgray">{`${memberCount}명`}</p>
    </div>
  );
}

export default NumberText;
