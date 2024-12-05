import clsx from "clsx";
import {
  ChangeEvent,
  Dispatch,
  memo,
  MouseEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface Props {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  titleMessage: string;
  subMessage: string;
  placeholder: string;
  noText: string;
  yesText: string;
  yesHandler: (amount: string) => void;
}

function InputModal({
  showModal,
  setShowModal,
  titleMessage,
  subMessage,
  placeholder,
  noText,
  yesText,
  yesHandler,
}: Props) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [data, setData] = useState("");

  const closeModal = useCallback(() => setShowModal(false), []);

  const handleInput = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      setData(target.value);
    },
    []
  );

  const modalOutSideClick = useCallback(
    ({ target }: MouseEvent) => {
      if (modalRef.current === target) closeModal();
    },
    [modalRef]
  );

  const handleKeyPress = useCallback(({ key }: KeyboardEvent) => {
    if (key === "Escape") closeModal();
    else if (key === "Enter") yesHandler(data);
  }, []);

  useEffect(() => {
    if (!showModal) return document.body.classList.remove("overflow-hidden");
    document.body.classList.add("overflow-hidden");

    setData(placeholder);

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
        <div className="flex flex-col justify-center text-center text-[#1C1B1F] whitespace-pre bg-white rounded-t-xl text-xl font-bold pt-16 pb-8">
          {titleMessage}
          <div className="mt-2 text-gray500 text-sm font-medium">
            {subMessage}
          </div>
        </div>
        <div className="flex items-center justify-center bg-white">
          <input
            className="w-4/5 h-12 rounded-xl outline-0 text-gray700 bg-lightgray font-semibold text-sm text-center mb-12"
            placeholder={placeholder}
            value={data}
            onChange={handleInput}
          />
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
            onClick={() => yesHandler(data)}
          >
            {yesText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(InputModal);
