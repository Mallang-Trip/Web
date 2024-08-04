import { useState } from "react";
import { useSelector } from "react-redux";
import Member from "./Member";
import InviteModal from "./InviteModal";
import KickModal from "./KickModal";

function MenuMembers({
  members,
  type,
  chatRoomId,
  getChatRoomDataFunc,
  setShowProfileModal,
  setProfileUserId,
  setShowMenu,
}) {
  const user = useSelector((state) => state.user);
  const [kickUser, setKickUser] = useState({
    userId: 0,
    nickname: "",
  });
  const [showKickModal, setShowKickModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);

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

export default MenuMembers;
