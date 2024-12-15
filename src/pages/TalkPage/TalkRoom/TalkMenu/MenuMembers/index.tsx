import { Dispatch, memo, SetStateAction, useState } from "react";
import { useSelector } from "react-redux";
import { ChatRoomType } from "../../../../../types";
import { RootState } from "../../../../../redux/store";
import Member from "./Member";
import InviteModal from "./InviteModal";
import KickModal from "./KickModal";

interface Props {
  members: {
    createdAt: string;
    deleted: boolean;
    introduction: string;
    isMyParty: boolean;
    nickname: string;
    profileImg: string | null;
    userId: number;
  }[];
  type: ChatRoomType;
  chatRoomId: number;
  getChatRoomDataFunc: () => void;
  setShowProfileModal: Dispatch<SetStateAction<boolean>>;
  setProfileUserId: Dispatch<SetStateAction<number>>;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
}

function MenuMembers({
  members,
  type,
  chatRoomId,
  getChatRoomDataFunc,
  setShowProfileModal,
  setProfileUserId,
  setShowMenu,
}: Props) {
  const user = useSelector((state: RootState) => state.user);
  const [showKickModal, setShowKickModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [kickUser, setKickUser] = useState({
    userId: 0,
    nickname: "",
  });

  return (
    <>
      <div className="h-full px-4 mb-16 custom-scrollbar">
        <div className="h-[30px] mb-3 flex justify-between items-center">
          <p className="text-lg text-black font-bold">대화 상대</p>
          {(type === "GROUP" || type === "PARTY_PUBLIC") && (
            <button
              className="bg-skyblue text-primary py-1.5 px-3 text-xs rounded-lg border border-primary focus:outline-none"
              onClick={() => setShowInviteModal(true)}
            >
              초대하기
            </button>
          )}
        </div>
        {members
          .sort((a, b) => {
            if (a.userId === user.userId) return -1;
            if (b.userId === user.userId) return 1;
            return 0;
          })
          .map((member) => (
            <Member
              key={member.userId}
              setShowProfileModal={setShowProfileModal}
              setProfileUserId={setProfileUserId}
              type={type}
              setKickUser={setKickUser}
              setShowKickModal={setShowKickModal}
              {...member}
            />
          ))}
      </div>

      <KickModal
        showModal={showKickModal}
        setShowModal={setShowKickModal}
        chatRoomId={chatRoomId}
        getChatRoomDataFunc={getChatRoomDataFunc}
        {...kickUser}
      />
      <InviteModal
        showModal={showInviteModal}
        setShowModal={setShowInviteModal}
        chatRoomId={chatRoomId}
        getChatRoomDataFunc={getChatRoomDataFunc}
        setShowMenu={setShowMenu}
      />
    </>
  );
}

export default memo(MenuMembers);
