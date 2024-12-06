import clsx from "clsx";
import {
  Dispatch,
  memo,
  MouseEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from "react";

interface Props {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  getUserInfoFunc: () => void;
  message: string;
}

function ConfirmModal({
  showModal,
  setShowModal,
  getUserInfoFunc,
  message,
}: Props) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const closeModal = useCallback(() => {
    setShowModal(false);
    getUserInfoFunc();
  }, []);

  const modalOutSideClick = useCallback(
    ({ target }: MouseEvent) => {
      if (modalRef.current === target) closeModal();
    },
    [modalRef]
  );

  const handleKeyPress = useCallback(({ key }: KeyboardEvent) => {
    if (key === "Escape" || key === "Enter") closeModal();
  }, []);

  useEffect(() => {
    if (!showModal) return document.body.classList.remove("overflow-hidden");
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
      <div className="m-auto shadow w-96 rounded-xl">
        <div className="flex flex-col justify-center h-64 text-center text-black whitespace-pre bg-white rounded-t-xl">
          {message}
        </div>
        <button
          className="w-full h-16 text-lg text-center text-white rounded-b-xl bg-primary"
          onClick={closeModal}
        >
          확인
        </button>
      </div>
    </div>
  );
}

export default memo(ConfirmModal);
