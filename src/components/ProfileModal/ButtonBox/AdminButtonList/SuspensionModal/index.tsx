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
import { useLocation } from "react-router-dom";
import { postSuspension } from "../../../../../api/admin";
import clsx from "clsx";

interface Props {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  userId: number | undefined;
  reportId: number;
  setShowConfirmModal: Dispatch<SetStateAction<boolean>>;
}

function SuspensionModal({
  showModal,
  setShowModal,
  userId,
  reportId,
  setShowConfirmModal,
}: Props) {
  const location = useLocation();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [durationInput, setDurationInput] = useState("");
  const [content, setContent] = useState("");

  const closeModal = useCallback(() => setShowModal(false), []);

  const postSuspensionFunc = useCallback(async () => {
    if (!durationInput) return alert("제재 일 수를 입력해주세요.");
    if (!content) return alert("제재 사유를 입력해주세요.");

    try {
      const body = {
        content: content,
        duration: parseInt(durationInput),
        reportId: reportId,
      };
      await postSuspension(userId, body);
      closeModal();
      setShowConfirmModal(true);
    } catch (e) {
      console.log(e);
    }
  }, [durationInput, content, reportId, userId]);

  const modalOutSideClick = useCallback(
    ({ target }: MouseEvent) => {
      if (modalRef.current === target) closeModal();
    },
    [modalRef]
  );

  const handleKeyPress = useCallback(({ key }: KeyboardEvent) => {
    if (key === "Escape") closeModal();
  }, []);

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

  return (
    <div
      className={clsx(
        "modal-container fixed top-0 left-0 z-50 w-screen h-real-screen bg-darkgray bg-opacity-50 scale-100 flex",
        showModal && "active"
      )}
      ref={modalRef}
      onClick={modalOutSideClick}
    >
      <div className="flex flex-col items-center m-auto shadow w-96 rounded-xl bg-white font-semibold">
        <p className="py-10 text-xl text-gray-900 font-bold">제재하기</p>
        <div className="flex w-full flex-col text-lg text-gray700 whitespace-pre px-8 mb-10">
          <div className="mb-2 text-base font-medium">
            제재 일 수를 입력해주세요.
          </div>
          <input
            className="h-12 rounded-lg outline-0 text-gray700 bg-lightgray font-medium text-sm text-center mb-2"
            placeholder="10일"
            value={durationInput === "-1" ? "영구" : durationInput}
            onChange={(e) => setDurationInput(e.target.value)}
          />
          <button
            className="text-[#FF0000] text-xs font-bold underline underline-[#FF0000] underline-offset-2"
            onClick={() => setDurationInput("-1")}
          >
            영구 제재
          </button>
        </div>
        <div className="flex w-full flex-col text-lg text-gray700 whitespace-pre px-8 mb-8">
          <div className="mb-2 text-base font-medium">
            제재 사유를 입력해주세요.
          </div>
          <textarea
            className="w-full h-40 rounded-lg outline-0 text-gray700 bg-lightgray font-medium text-sm text-start mb-2 p-4 resize-none"
            placeholder="내용을 입력해주세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="w-full flex">
          <button
            className="w-full h-16 text-lg text-center text-darkgray rounded-bl-xl bg-lightgray"
            onClick={closeModal}
          >
            취소
          </button>
          <button
            className="w-full h-16 text-lg text-center text-white rounded-br-xl bg-primary"
            onClick={postSuspensionFunc}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(SuspensionModal);
