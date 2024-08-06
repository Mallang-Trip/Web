import { useState } from "react";
import { useSelector } from "react-redux";
import { leaveChat } from "../../../../../api/chat";
import ExitCheckModal from "./ExitCheckModal";
import ConfirmModal from "../../../../../components/ConfirmModal";

function ExitButton({
  chatRoomId,
  getChatListFunc,
  closeRoomHandler,
  setShowMenu,
}) {
  const privateRoomId = useSelector((state) => state.talkRoom.privateRoomId);
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const leaveChatHandler = async () => {
    try {
      const result = await leaveChat(privateRoomId || chatRoomId);
      if (result.statusCode === 200) {
        setShowMenu(false);
        setShowModal(false);
        closeRoomHandler();
        getChatListFunc();
      } else {
        setErrorMessage(result.message || "채팅방을 나갈 수 없습니다.");
        setShowErrorModal(true);
        setShowModal(false);
      }
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
        말랑챗 나가기
      </button>

      <ExitCheckModal
        showModal={showModal}
        setShowModal={setShowModal}
        leaveChatHandler={leaveChatHandler}
      />
      <ConfirmModal
        showModal={showErrorModal}
        setShowModal={setShowErrorModal}
        message={errorMessage}
      />
    </>
  );
}

export default ExitButton;
