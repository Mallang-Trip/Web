import React from "react";
import NumberText from "../Atoms/NumberText";
import FilterBtn from "../../LandingPage/Atoms/FilterBtn";

function PartyNumberBox() {
  return (
    <div className="pb-6">
      <NumberText />
      <div className="flex gap-2">
        <FilterBtn title={"프로필 1"} />
        <FilterBtn title={"프로필 2"} />
        <FilterBtn title={"프로필 3"} />
        <FilterBtn title={"프로필 4"} />
      </div>
    </div>
  );
}

export default PartyNumberBox;
