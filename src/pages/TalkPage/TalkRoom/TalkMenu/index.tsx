import {
  Dispatch,
  memo,
  MouseEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ChatRoomDetail } from "@/types";
import MenuCloser from "./MenuCloser";
import MenuHead from "./MenuHead";
import MenuMembers from "./MenuMembers";
import ExitButton from "./ExitButton";
import clsx from "clsx";

interface Props extends ChatRoomDetail {
  showMenu: boolean;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
  getChatRoomDataFunc: () => void;
  getChatListFunc: () => void;
  closeRoomHandler: () => void;
  setShowProfileModal: Dispatch<SetStateAction<boolean>>;
  setProfileUserId: Dispatch<SetStateAction<number>>;
  openTalkId: number;
  setRoomId: Dispatch<SetStateAction<number>>;
}

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
}: Props) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [openMenuAnimation, setOpenMenuAnimation] = useState(false);

  const closeMenuHandler = useCallback(() => {
    setOpenMenuAnimation(false);
    setTimeout(() => setOpenMenu(false), 550);
  }, []);

  const openMenuHandler = useCallback(() => {
    setOpenMenu(true);
    setTimeout(() => setOpenMenuAnimation(true), 50);
  }, []);

  const modalOutSideClick = useCallback(
    (event: MouseEvent) => {
      if (modalRef.current === event.target) setShowMenu(false);
    },
    [modalRef]
  );

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    const $kickModal = document.getElementById("kick-modal");
    if ($kickModal && $kickModal.classList.contains("active")) return;

    const $inviteModal = document.getElementById("invite-modal");
    if ($inviteModal && $inviteModal.classList.contains("active")) return;

    const $leaveChatModal = document.getElementById("leave-chat-modal");
    if ($leaveChatModal && $leaveChatModal.classList.contains("active")) return;

    const $userProfileModal = document.getElementById("user-profile-modal");
    if ($userProfileModal && $userProfileModal.classList.contains("active"))
      return;

    if (event.key === "Escape") setShowMenu(false);
  }, []);

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
      className={clsx(
        "fixed top-0 left-0 z-50 md:z-20 md:pt-16 w-full h-real-screen bg-darkgray transition-all duration-700",
        openMenuAnimation ? "bg-opacity-50" : "bg-opacity-0"
      )}
      ref={modalRef}
      onClick={modalOutSideClick}
    >
      <div
        className={clsx(
          "w-80 h-full flex flex-col ml-auto bg-white rounded-l-2xl transition-transform duration-500 relative",
          openMenuAnimation ? "translate-x-0" : "translate-x-full"
        )}
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

export default memo(TalkMenu);
