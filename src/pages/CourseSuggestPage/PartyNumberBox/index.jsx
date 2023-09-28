import React from "react";
import NumberText from "../Atoms/NumberText";
import ProfileButton from "./ProfileButton";

function PartyNumberBox() {
  return (
    <div className="pb-6">
      <NumberText />
      <div className="flex gap-2 mt-2">
        <ProfileButton title={"프로필 1"} />
        <ProfileButton title={"프로필 2"} />
        <ProfileButton title={"+"} />
        <ProfileButton title={"+"} />
      </div>
    </div>
  );
}

export default PartyNumberBox;
