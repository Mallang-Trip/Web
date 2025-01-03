import { Dispatch, memo, SetStateAction, useCallback, useEffect } from "react";
import clsx from "clsx";

interface Props {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  message: string;
  noText: string;
  yesText: string;
  yesHandler: () => void;
}

function CheckModal({
  showModal,
  setShowModal,
  message,
  noText,
  yesText,
  yesHandler,
}: Props) {
  const closeModal = useCallback(() => setShowModal(false), []);

  useEffect(() => {
    if (!showModal) return document.body.classList.remove("overflow-hidden");
    document.body.classList.add("overflow-hidden");
  }, [showModal]);

  return (
    <div
      className={clsx(
        "modal-container fixed top-0 left-0 z-50 w-screen h-real-screen bg-darkgray bg-opacity-50 scale-100 flex",
        showModal && "active"
      )}
    >
      <div className="m-auto shadow w-96 rounded-xl">
        <div className="flex flex-col justify-center h-64 text-center text-black whitespace-pre bg-white rounded-t-xl">
          {message}
        </div>
        <div className="flex">
          <button
            className="w-full h-16 text-lg text-center text-darkgray rounded-bl-xl bg-lightgray"
            onClick={closeModal}
          >
            {noText}
          </button>
          <button
            className="w-full h-16 text-lg text-center text-white rounded-br-xl bg-primary"
            onClick={yesHandler}
          >
            {yesText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(CheckModal);
