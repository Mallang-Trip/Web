import { Dispatch, memo, SetStateAction, useCallback } from "react";
import { InviteChatMember } from "../../../../../../../../types";
import deleteMemberIcon from "../../../../../../../../assets/svg/invite-member-x.svg";

interface Props {
  inviteMember: InviteChatMember[];
  setInviteMember: Dispatch<SetStateAction<InviteChatMember[]>>;
  userId: number;
  nickName: string;
}

function Member({ inviteMember, setInviteMember, userId, nickName }: Props) {
  const deleteHandler = useCallback(() => {
    setInviteMember(inviteMember.filter((member) => member.userId !== userId));
  }, [inviteMember, userId]);

  return (
    <div className="flex gap-2 items-center bg-skyblue text-primary text-xs font-medium px-2.5 py-2 rounded">
      <span>{nickName}</span>
      <button onClick={deleteHandler}>
        <img src={deleteMemberIcon} alt="취소" />
      </button>
    </div>
  );
}

export default memo(Member);
