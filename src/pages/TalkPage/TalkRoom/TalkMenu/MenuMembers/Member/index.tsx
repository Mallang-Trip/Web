import { Dispatch, memo, MouseEvent, SetStateAction, useCallback } from "react";
import { useSelector } from "react-redux";
import { ChatRoomType } from "../../../../../../types";
import { RootState } from "../../../../../../redux/store";
import basicProfileImage from "../../../../../../assets/images/profileImage.png";

interface Props {
  userId: number;
  profileImg: string | null;
  nickname: string;
  isMyParty: boolean;
  introduction: string;
  setShowProfileModal: Dispatch<SetStateAction<boolean>>;
  setProfileUserId: Dispatch<SetStateAction<number>>;
  type: ChatRoomType;
  setKickUser: Dispatch<SetStateAction<{ userId: number; nickname: string }>>;
  setShowKickModal: Dispatch<SetStateAction<boolean>>;
}

function Member({
  userId,
  profileImg,
  nickname,
  isMyParty,
  introduction,
  setShowProfileModal,
  setProfileUserId,
  type,
  setKickUser,
  setShowKickModal,
}: Props) {
  const publicRoomId = useSelector(
    (state: RootState) => state.talkRoom.publicRoomId
  );

  const showProfileHandler = useCallback(() => {
    setProfileUserId(userId);
    setShowProfileModal(true);
  }, [userId]);

  const kickHandler = useCallback(
    async (e: MouseEvent) => {
      e.stopPropagation();
      setKickUser({
        userId: userId,
        nickname: nickname,
      });
      setShowKickModal(true);
    },
    [userId, nickname]
  );

  return (
    <button
      className="w-full my-1 p-2 flex items-center hover:bg-lightgray rounded-lg focus:outline-none"
      onClick={showProfileHandler}
    >
      <img
        className="mr-3 w-10 h-10 rounded-full shrink-0"
        src={profileImg || basicProfileImage}
        alt={nickname}
      />
      <div className="w-full h-full flex flex-col gap-0.5 text-left">
        <p className="w-full text-sm text-black font-bold">{nickname}</p>
        <p className="w-full text-xs text-darkgray font-medium overflow-hidden line-clamp-1">
          {introduction}
        </p>
      </div>
      {type === "PARTY_PUBLIC" && publicRoomId && !isMyParty && (
        <div
          className="w-16 bg-[#FFEAEA] text-[#E30000] py-1.5 px-2 text-xs rounded-lg border border-[#E30000] focus:outline-none"
          onClick={kickHandler}
        >
          강퇴
        </div>
      )}
    </button>
  );
}

export default memo(Member);
