import { useEffect, useRef, useState } from "react";
import MenuCloser from "./MenuCloser";
import MenuHead from "./MenuHead";
import MenuMembers from "./MenuMembers";
import ExitButton from "./ExitButton";

function TalkMenu({
  showMenu,
  setShowMenu,
  chatRoomId,
  roomName,
  headCount,
  type,
  members,
  getChatRoomDataFunc,
  getChatListFunc,
  closeRoomHandler,
  setShowProfileModal,
  setProfileUserId,
  openTalkId,
  setRoomId,
  partyId,
}) {
  const modalRef = useRef();
  const [openMenu, setOpenMenu] = useState(false);
  const [openMenuAnimation, setOpenMenuAnimation] = useState(false);

  const closeMenuHandler = () => {
    setOpenMenuAnimation(false);
    setTimeout(() => setOpenMenu(false), 550);
  };

  const openMenuHandler = () => {
    setOpenMenu(true);
    setTimeout(() => setOpenMenuAnimation(true), 50);
  };

  const modalOutSideClick = (e) => {
    if (modalRef.current === e.target) setShowMenu(false);
  };

  const handleKeyPress = (event) => {
    const $inviteModal = document.getElementById("invite-modal");
    if ($inviteModal && $inviteModal.classList.contains("active")) return;

    const $leaveChatModal = document.getElementById("leave-chat-modal");
    if ($leaveChatModal && $leaveChatModal.classList.contains("active")) return;

    const $userProfileModal = document.getElementById("user-profile-modal");
    if ($userProfileModal && $userProfileModal.classList.contains("active"))
      return;

    if (event.key === "Escape") setShowMenu(false);
  };

  useEffect(() => {
    if (showMenu) openMenuHandler();
    else closeMenuHandler();

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [showMenu]);

  if (!openMenu) return null;
  return (
    <div
      className={`fixed top-0 left-0 z-50 md:z-20 md:pt-16 w-full h-real-screen bg-darkgray transition-all duration-700 ${
        openMenuAnimation ? "bg-opacity-50" : "bg-opacity-0"
      }`}
      ref={modalRef}
      onClick={(e) => modalOutSideClick(e)}
    >
      <div
        className={`w-80 h-full flex flex-col ml-auto bg-white transition-transform duration-500 relative ${
          openMenuAnimation ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <MenuCloser setShowMenu={setShowMenu} />
        <MenuHead
          roomName={roomName}
          headCount={headCount}
          type={type}
          openTalkId={openTalkId}
          setRoomId={setRoomId}
          partyId={partyId}
        />
        <MenuMembers
          members={members}
          type={type}
          chatRoomId={chatRoomId}
          getChatRoomDataFunc={getChatRoomDataFunc}
          setShowProfileModal={setShowProfileModal}
          setProfileUserId={setProfileUserId}
          setShowMenu={setShowMenu}
        />
        <ExitButton
          chatRoomId={chatRoomId}
          getChatListFunc={getChatListFunc}
          closeRoomHandler={closeRoomHandler}
          setShowMenu={setShowMenu}
        />
      </div>
    </div>
  );
}

export default TalkMenu;
