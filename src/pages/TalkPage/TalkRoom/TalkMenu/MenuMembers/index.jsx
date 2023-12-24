import { useState } from "react";
import Member from "./Member";
import InviteModal from "./InviteModal";

function MenuMembers({
  members,
  isGroup,
  chatRoomId,
  getChatRoomDataFunc,
  setShowProfileModal,
  setProfileUserId,
}) {
  const [showInviteModal, setShowInviteModal] = useState(false);

  return (
    <>
      <div className="h-full px-4 pb-16 overflow-y-auto noScrollBar">
        <div className="mb-3 flex justify-between items-center">
          <p className="text-lg text-black font-bold">대화 상대</p>
          {isGroup && (
            <button
              className="bg-skyblue text-primary py-1.5 px-3 text-xs rounded-lg border border-primary focus:outline-none"
              onClick={() => setShowInviteModal(true)}
            >
              초대하기
            </button>
          )}
        </div>
        {members.map((member) => (
          <Member
            key={member.userId}
            setShowProfileModal={setShowProfileModal}
            setProfileUserId={setProfileUserId}
            {...member}
          />
        ))}
      </div>

      <InviteModal
        showModal={showInviteModal}
        setShowModal={setShowInviteModal}
        chatRoomId={chatRoomId}
        getChatRoomDataFunc={getChatRoomDataFunc}
      />
    </>
  );
}

export default MenuMembers;
