import Member from "./Member";

function SearchMemberList({ searchList, inviteMember, setInviteMember }) {
  return (
    <div className="h-full flex flex-col gap-2 custom-scrollbar">
      {searchList.map((member) => (
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

export default SearchMemberList;
