import PageButton from "../PageButton";
import Date from "./Date";
import Member from "./Member";

function MemberAndDate({ member, setMember, date, setDate }) {
  return (
    <>
      <Member member={member} setMember={setMember} />
      <Date date={date} setDate={setDate} />
      <PageButton />
    </>
  );
}

export default MemberAndDate;
