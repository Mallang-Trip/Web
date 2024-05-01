import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";
import { postSuspension } from "../../../api/admin";

function SuspensionModal({
  showModal,
  setShowModal,
  duration,
  userId,
  reportId,
  handleClose,
}) {
  const modalRef = useRef();
  const location = useLocation();

  const closeModal = () => {
    setShowModal(false);
    postSuspensionFunc();
    handleClose();
  };

  const [durationInput, setDurationInput] = useState(duration);
  const [content, setContent] = useState(null);

  const postSuspensionFunc = async () => {
    try {
      await postSuspension({ userId, content, durationInput, reportId });
    } catch (e) {
      console.log(e);
    }
  };
  const handleInput = (type, e) => {
    if (type === "duration") setDurationInput(e.target.value);
    else setContent(e.target.value);
  };

  const modalOutSideClick = (e) => {
    if (modalRef.current === e.target) closeModal();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Escape" || event.key === "Enter") closeModal();
  };

  useEffect(() => {
    if (!showModal) {
      if (location.pathname !== "/talk")
        document.body.classList.remove("overflow-hidden");
      return;
    }
    document.body.classList.add("overflow-hidden");

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [showModal]);

  return createPortal(
    <div
      className={`modal-container fixed top-0 left-0 z-50 w-screen h-real-screen bg-darkgray bg-opacity-50 scale-100 flex ${
        showModal ? "active" : ""
      }`}
      ref={modalRef}
      onClick={(e) => modalOutSideClick(e)}
    >
      <div className="flex flex-col items-center m-auto shadow w-[32.35rem] rounded-xl bg-white font-semibold">
        <p className="py-10 text-xl text-gray-900 ">제재하기</p>
        <div className="flex w-full flex-col text-lg text-gray700 whitespace-pre px-12 mb-10">
          <div className="mb-2">제재 일 수를 입력해주세요.</div>
          <input
            className="h-14 rounded-xl outline-0 text-textgray bg-lightgray font-semibold text-base text-center mb-2"
            placeholder={duration ? duration : "10"}
            onChange={(e) => handleInput("duration", e)}
          />
          <button
            className="text-[#F00] text-xs underline font-bold"
            onClick={() => setDurationInput(-1)}
          >
            영구 제재
          </button>
        </div>
        <div className="flex w-full flex-col text-lg text-gray700 whitespace-pre px-12 mb-10">
          <div className="mb-2">제재 사유를 입력해주세요.</div>
          <div className="">
            <textarea
              className="w-full h-40 rounded-xl outline-0 text-textgray bg-lightgray font-semibold text-base text-start mb-2 px-4 py-6 resize-none"
              placeholder="내용을 입력해주세요."
              onChange={(e) => handleInput("duration", e)}
            />
          </div>
        </div>
        <button
          className="w-full h-16 text-lg text-center text-white rounded-b-xl bg-primary"
          onClick={closeModal}
        >
          확인
        </button>
      </div>
    </div>,
    document.body
  );
}

export default SuspensionModal;
