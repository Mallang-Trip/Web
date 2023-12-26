import Member from "./Member";

function SelectMembers({ inviteMember, setInviteMember }) {
  return (
    <div className="w-full my-3 flex flex-wrap gap-1.5">
      {inviteMember.map((member) => (
        <Member
          key={member.userId}
          inviteMember={inviteMember}
          setInviteMember={setInviteMember}
          {...member}
        />
      ))}
    </div>
  );
}

export default SelectMembers;
