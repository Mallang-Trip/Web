import {
  Dispatch,
  memo,
  MouseEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import appIcon from "../../../assets/images/app-icon.png";
import clsx from "clsx";

interface Props {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  handleInstallClick: () => void;
}

function InstallModal({ showModal, setShowModal, handleInstallClick }: Props) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const modalOutSideClick = useCallback((e: MouseEvent) => {
    if (modalRef.current === e.target) setShowModal(false);
  }, []);

  useEffect(() => {
    if (!showModal) return document.body.classList.remove("overflow-hidden");
    document.body.classList.add("overflow-hidden");
  }, [showModal]);

  return createPortal(
    <div
      className={clsx(
        "modal-container fixed top-0 left-0 z-50 w-screen h-real-screen bg-darkgray bg-opacity-50 scale-100 flex",
        showModal && "active"
      )}
      ref={modalRef}
      onClick={modalOutSideClick}
    >
      <div
        className={clsx(
          "mx-auto mt-auto shadow w-full max-w-[500px] rounded-xl duration-700",
          showModal ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="w-full h-80 text-center bg-white rounded-t-xl relative">
          <div className="absolute top-0 left-0 text-left px-6 pt-5">
            <p className="text-lg font-bold text-black mb-1">
              말랑트립 앱 다운로드
            </p>
            <p className="text-sm font-medium text-boldgray">
              편리한 말랑트립을 위해 스토어에서 앱을 다운로드하세요.
            </p>
          </div>
          <button
            type="button"
            className="absolute top-4 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-black rounded-lg text-sm p-1.5 ml-auto inline-flex items-center z-10"
            onClick={() => setShowModal(false)}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div className="w-full h-full pt-20 pb-20 flex flex-col justify-center gap-10 relative">
            <div className="flex flex-col justify-center items-center gap-2">
              <img
                src={appIcon}
                alt="말랑트립"
                className="w-20 h-20 rounded-xl ring ring-primary/50"
              />
              <p className="text-base text-black font-bold">말랑트립</p>
            </div>
            <div className="absolute bottom-0 left-0 w-full p-5">
              <button
                className="w-full h-12 bg-primary text-white text-sm text-bold rounded-lg"
                onClick={handleInstallClick}
              >
                말랑트립 앱 다운로드
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default memo(InstallModal);
