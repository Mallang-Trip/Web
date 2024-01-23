import MemberButton from "./MemberButton";

function JoinMember({ memberCount, setMemberCount, capacity, headcount }) {
  return (
    <div className="flex flex-col gap-1 my-7">
      <div className="flex items-center gap-1.5">
        <p className="text-lg text-black font-bold">참여 인원</p>
        <p className="text-sm text-darkgray font-bold">{`${memberCount}명`}</p>
      </div>
      <div className="flex gap-2 mt-2">
        <MemberButton title={"본인"} selected={memberCount >= 1} />
        {Array.from({ length: memberCount - 1 }, (_, index) => index).map(
          (item) => (
            <MemberButton
              key={item}
              title={"동행자"}
              memberCount={memberCount}
              setMemberCount={setMemberCount}
              selected={true}
            />
          )
        )}
        {headcount + memberCount < capacity && (
          <MemberButton
            title={"동행자"}
            memberCount={memberCount}
            setMemberCount={setMemberCount}
            selected={false}
          />
        )}
      </div>
    </div>
  );
}

export default JoinMember;
