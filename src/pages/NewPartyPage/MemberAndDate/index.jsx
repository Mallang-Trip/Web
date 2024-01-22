import { useEffect } from "react";
import PartyDate from "./PartyDate";
import Member from "./Member";

function MemberAndDate({ member, setMember, date, setDate, setNextOK }) {
  useEffect(() => setNextOK(true));

  return (
    <>
      <Member member={member} setMember={setMember} />
      <PartyDate date={date} setDate={setDate} />
    </>
  );
}

export default MemberAndDate;
