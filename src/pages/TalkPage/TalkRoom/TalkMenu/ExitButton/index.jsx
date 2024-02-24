import { useState } from "react";
import { useSelector } from "react-redux";
import { leaveChat } from "../../../../../api/chat";
import ExitCheckModal from "./ExitCheckModal";

function ExitButton({
  chatRoomId,
  getChatListFunc,
  closeRoomHandler,
  setShowMenu,
}) {
  const privateRoomId = useSelector((state) => state.talkRoom.privateRoomId);
  const [showModal, setShowModal] = useState(false);

  const leaveChatHandler = async () => {
    try {
      await leaveChat(privateRoomId || chatRoomId);
      setShowMenu(false);
      setShowModal(false);
      closeRoomHandler();
      getChatListFunc();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <button
        className="absolute bottom-0 left-0 w-full bg-skyblue rounded-bl-2xl text-primary py-4 focus:outline-none"
        onClick={() => setShowModal(true)}
      >
        말랑톡 나가기
      </button>

      <ExitCheckModal
        showModal={showModal}
        setShowModal={setShowModal}
        leaveChatHandler={leaveChatHandler}
      />
    </>
  );
}

export default ExitButton;
