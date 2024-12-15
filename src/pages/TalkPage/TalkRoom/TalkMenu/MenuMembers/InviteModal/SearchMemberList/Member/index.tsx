import { Dispatch, memo, SetStateAction, useCallback, useMemo } from "react";
import { ChatMember, InviteChatMember } from "../../../../../../../../types";
import basicProfileImage from "../../../../../../../../assets/images/profileImage.png";
import clsx from "clsx";

interface Props extends ChatMember {
  inviteMember: InviteChatMember[];
  setInviteMember: Dispatch<SetStateAction<InviteChatMember[]>>;
}

function Member({
  userId,
  profileImg,
  nickname,
  introduction,
  inviteMember,
  setInviteMember,
}: Props) {
  const isSelected = useMemo(
    () => inviteMember.some((member) => member.userId === userId),
    [inviteMember, userId]
  );

  const clickHandler = useCallback(() => {
    if (isSelected) return;
    setInviteMember([
      ...inviteMember,
      { userId: userId, nickName: nickname, profileImg: profileImg },
    ]);
  }, [isSelected, inviteMember, userId, nickname, profileImg]);

  return (
    <button
      className={clsx(
        "w-full p-2 flex items-center hover:bg-lightgray rounded-lg border focus:outline-none",
        isSelected ? "bg-lightgray border-primary" : "bg-white border-white"
      )}
      onClick={clickHandler}
    >
      <img
        className="mr-3 w-10 h-10 rounded-full object-cover shrink-0"
        src={profileImg || basicProfileImage}
        alt={nickname}
      />
      <div className="w-full h-full flex flex-col gap-0.5 text-left">
        <p className="w-full text-sm text-black font-bold">{nickname}</p>
        <p className="w-full text-xs text-darkgray font-medium overflow-hidden line-clamp-1">
          {introduction}
        </p>
      </div>
    </button>
  );
}

export default memo(Member);
