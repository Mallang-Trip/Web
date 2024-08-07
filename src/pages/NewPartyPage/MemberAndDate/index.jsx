import Member from "./Member";
import PartyDate from "./PartyDate";
import PageButton from "./PageButton";

function MemberAndDate({
  region,
  driverId,
  member,
  setMember,
  date,
  setDate,
  driverInfo,
  selectedCourseId,
}) {
  return (
    <>
      <Member member={member} setMember={setMember} />
      <PartyDate date={date} setDate={setDate} />
      <PageButton
        region={region}
        member={member}
        date={date}
        driverId={driverId}
        driverInfo={driverInfo}
        selectedCourseId={selectedCourseId}
      />
    </>
  );
}

export default MemberAndDate;
