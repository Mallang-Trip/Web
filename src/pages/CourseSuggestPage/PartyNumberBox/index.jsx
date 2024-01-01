import NumberText from "../Atoms/NumberText";
import ProfileButton from "./ProfileButton";

function PartyNumberBox({ memberCount, setMemberCount }) {
  return (
    <div className="pb-6">
      <NumberText memberCount={memberCount} />
      <div className="flex gap-2 mt-2">
        <ProfileButton title={"본인"} selected={memberCount >= 1} />
        <ProfileButton
          title={"동행자"}
          memberCount={memberCount}
          setMemberCount={setMemberCount}
          selected={memberCount >= 2}
        />
        <ProfileButton
          title={"동행자"}
          memberCount={memberCount}
          setMemberCount={setMemberCount}
          selected={memberCount >= 3}
        />
        <ProfileButton
          title={"동행자"}
          memberCount={memberCount}
          setMemberCount={setMemberCount}
          selected={memberCount >= 4}
        />
      </div>
    </div>
  );
}

export default PartyNumberBox;
