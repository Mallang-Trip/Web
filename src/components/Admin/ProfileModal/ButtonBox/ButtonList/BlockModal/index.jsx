import { useEffect, useRef, useState } from "react";
import { blockUser, nonBlockUser } from "../../../../../../api/chat";

function BlockModal({
  showModal,
  setShowModal,
  isChatBlock,
  setIsChatBlock,
  userId,
  nickname,
}) {
  const modalRef = useRef();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  const blockChatUser = async () => {
    if (loading) return;

    try {
      setLoading(true);

      isChatBlock ? await nonBlockUser(userId) : await blockUser(userId);

      if (isChatBlock)
        setMessage(
          <div>
            <span className="text-primary">{nickname}</span>
            님을 차단 해제하였습니다.
          </div>
        );
      else
        setMessage(
          <div>
            <span className="text-primary">{nickname}</span>
            님을 차단하였습니다.
          </div>
        );

      setComplete(true);
      setIsChatBlock(!isChatBlock);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => setShowModal(false);

  const modalOutSideClick = (e) => {
    if (modalRef.current === e.target) closeModal();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Escape") closeModal();
  };

  useEffect(() => {
    if (!showModal) return;

    setComplete(false);

    if (isChatBlock)
      setMessage(
        <div>
          <span className="text-primary">{nickname}</span>
          님을 차단 해제하시겠습니까?
        </div>
      );
    else
      setMessage(
        <div>
          <span className="text-primary">{nickname}</span>
          님을 차단하시겠습니까?
        </div>
      );

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [showModal]);

  return (
    <div
      className={`modal-container fixed top-0 left-0 z-50 w-screen h-real-screen bg-darkgray bg-opacity-50 scale-100 flex ${
        showModal ? "active" : ""
      }`}
      ref={modalRef}
      onClick={(e) => modalOutSideClick(e)}
    >
      <div className="m-auto shadow w-96 rounded-xl">
        <div className="flex flex-col justify-center h-64 text-center text-black whitespace-pre bg-white rounded-t-xl">
          {message}
        </div>
        {!complete ? (
          <div className="flex">
            <button
              className="w-full h-16 text-lg text-center text-darkgray rounded-bl-xl bg-lightgray"
              onClick={closeModal}
            >
              취소
            </button>
            <button
              className="w-full h-16 text-lg text-center text-white rounded-br-xl bg-primary"
              onClick={blockChatUser}
            >
              확인
            </button>
          </div>
        ) : (
          <button
            className="w-full h-16 text-lg text-center text-white rounded-b-xl bg-primary"
            onClick={closeModal}
          >
            확인
          </button>
        )}
      </div>
    </div>
  );
}

export default BlockModal;
