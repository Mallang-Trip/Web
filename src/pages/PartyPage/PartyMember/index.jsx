import MemberProfile from "./MemberProfile";

function PartyMember({
  headcount,
  capacity,
  members,
  driverId,
  driverName,
  myParty,
}) {
  return (
    <div className="my-7">
      <div className="flex flex-col gap-1 mb-7">
        <p className="text-lg text-black font-bold">참여 여행자</p>
        <p className="text-sm text-darkgray font-medium">{`${headcount}/${capacity}명`}</p>
      </div>
      <div className="w-full flex gap-2.5 flex-nowrap overflow-x-auto noScrollBar">
        <MemberProfile
          id={driverId}
          profileImg={null}
          nickname={driverName}
          myParty={myParty}
        />
        {members.map((item) => (
          <MemberProfile key={item.userId} myParty={myParty} {...item} />
        ))}
      </div>
    </div>
  );
}

export default PartyMember;
