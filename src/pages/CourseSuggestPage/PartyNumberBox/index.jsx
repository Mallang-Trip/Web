import React from "react";
import NumberText from "../Atoms/NumberText";
import ProfileButton from "./ProfileButton";

function PartyNumberBox({ memberCount, setMemberCount }) {
  return (
    <div className="pb-6">
      <NumberText memberCount={memberCount} />
      <div className="flex gap-2 mt-2">
        <ProfileButton title={"본인"} />
        <ProfileButton
          title={"동행자"}
          memberCount={memberCount}
          setMemberCount={setMemberCount}
        />
        <ProfileButton
          title={"동행자"}
          memberCount={memberCount}
          setMemberCount={setMemberCount}
        />
        <ProfileButton
          title={"동행자"}
          memberCount={memberCount}
          setMemberCount={setMemberCount}
        />
      </div>
    </div>
  );
}

export default PartyNumberBox;
