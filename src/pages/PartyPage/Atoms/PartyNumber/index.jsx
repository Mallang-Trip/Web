import React from "react";

function PartyNumber({ headcount, capacity }) {
  return (
    <div className="pb-6">
      <p className="text-lg font-bold">참여 인원</p>
      <p className="text-sm text-darkgray">{`${headcount}/${capacity}명`}</p>
    </div>
  );
}

export default PartyNumber;
