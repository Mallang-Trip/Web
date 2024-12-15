import { Dispatch, memo, SetStateAction } from "react";
import Member from "./Member";
import PartyDate from "./PartyDate";
import PageButton from "./PageButton";

interface Props {
  region: string;
  driverId: number | string;
  member: number;
  setMember: Dispatch<SetStateAction<number>>;
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
  selectedCourseId: number | string;
}

function MemberAndDate({
  region,
  driverId,
  member,
  setMember,
  date,
  setDate,
  selectedCourseId,
}: Props) {
  return (
    <>
      <Member member={member} setMember={setMember} />
      <PartyDate date={date} setDate={setDate} />
      <PageButton
        region={region}
        member={member}
        date={date}
        driverId={driverId}
        selectedCourseId={selectedCourseId}
      />
    </>
  );
}

export default memo(MemberAndDate);
