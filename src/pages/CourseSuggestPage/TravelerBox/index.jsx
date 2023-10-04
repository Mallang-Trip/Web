import React from "react";
import TravelerInfo from "../Atoms/TravelerInfo";
import TravelerTitle from "../Atoms/TravelerTitle";
import TravelerInput from "../Atoms/TravelerInput";

function TravelerBox() {
  return (
    <div className="mb-6">
      <TravelerTitle />
      <TravelerInfo />
      <TravelerInput />
    </div>
  );
}

export default TravelerBox;
