import React from "react";
import TravelerInfo from "../Atoms/TravelerInfo";
import TravelerTitle from "../Atoms/TravelerTitle";
import TravelerInput from "../Atoms/TravelerInput";
function TravelerBox() {
  return (
    <div className="pb-6">
      <TravelerTitle />
      <p className="text-[14px] mb-4 text-gray">여행자1</p>
      <TravelerInfo />
      <p className="text-[14px] mb-4 text-gray">여행자2</p>
      <TravelerInput />
    </div>
  );
}

export default TravelerBox;
