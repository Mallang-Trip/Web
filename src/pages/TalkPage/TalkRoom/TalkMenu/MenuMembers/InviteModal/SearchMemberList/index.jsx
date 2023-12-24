import Member from "./Member";

function SearchMemberList({ searchList, inviteMember, setInviteMember }) {
  return (
    <div className="h-full pb-4 overflow-y-auto noScrollBar">
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
