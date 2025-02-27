import {
  Dispatch,
  memo,
  MouseEvent,
  SetStateAction,
  useCallback,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

interface Props {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  leaveChatHandler: () => void;
}

function ExitCheckModal({ showModal, setShowModal, leaveChatHandler }: Props) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const closeModal = useCallback(() => setShowModal(false), []);

  const modalOutSideClick = useCallback(
    (e: MouseEvent) => {
      if (modalRef.current === e.target) closeModal();
    },
    [modalRef]
  );

  return createPortal(
    <div
      className={clsx(
        "modal-container fixed top-0 left-0 z-50 w-screen h-real-screen bg-darkgray bg-opacity-50 scale-100 flex",
        showModal && "active"
      )}
      ref={modalRef}
      onClick={modalOutSideClick}
      id="leave-chat-modal"
    >
      <div className="m-auto shadow w-96 rounded-xl">
        <div className="flex flex-col justify-center h-64 text-center text-black whitespace-pre bg-white rounded-t-xl">
          말랑챗을 나가시겠습니까?
        </div>
        <div className="flex">
          <button
            className="w-full h-16 text-lg text-center text-darkgray rounded-bl-xl bg-lightgray"
            onClick={closeModal}
          >
            취소
          </button>
          <button
            className="w-full h-16 text-lg text-center text-white rounded-br-xl bg-primary"
            onClick={leaveChatHandler}
          >
            나가기
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default memo(ExitCheckModal);
