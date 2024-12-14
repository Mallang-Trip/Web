import { Dispatch, memo, SetStateAction } from "react";
import { InviteChatMember } from "../../../../../../../types";
import Member from "./Member";

interface Props {
  inviteMember: InviteChatMember[];
  setInviteMember: Dispatch<SetStateAction<InviteChatMember[]>>;
}

function SelectMembers({ inviteMember, setInviteMember }: Props) {
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

export default memo(SelectMembers);
