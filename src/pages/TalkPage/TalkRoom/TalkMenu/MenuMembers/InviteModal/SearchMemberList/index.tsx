import { Dispatch, memo, SetStateAction } from "react";
import { ChatMember, InviteChatMember } from "@/types";
import Member from "./Member";

interface Props {
  searchList: ChatMember[];
  inviteMember: InviteChatMember[];
  setInviteMember: Dispatch<SetStateAction<InviteChatMember[]>>;
}

function SearchMemberList({
  searchList,
  inviteMember,
  setInviteMember,
}: Props) {
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

export default memo(SearchMemberList);
