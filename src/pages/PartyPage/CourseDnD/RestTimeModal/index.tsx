import { RootState } from "@/redux/store";
import clsx from "clsx";
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
import { FiMinus } from "react-icons/fi";
import { LuPlus } from "react-icons/lu";
import { useSelector } from "react-redux";

interface Props {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  onConfirm: (time: number) => void;
  onCancel: () => void;
}

function RestTimeModal({
  showModal,
  setShowModal,
  onConfirm,
  onCancel,
}: Props) {
  const user = useSelector((state: RootState) => state.user);
  const [time, setTime] = useState<number>(1);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const closeModal = useCallback(() => setShowModal(false), []);

  const handleDecrease = () => {
    setTime((prev: number) => (prev > 0 ? prev - 1 : 0)); // 0 이하로 내려가지 않도록 처리
  };

  const handleIncrease = () => {
    setTime((prev) => prev + 1);
  };

  const handleConfirm = () => {
    onConfirm(time);
    closeModal();
  };

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") onCancel();
  }, []);

  useEffect(() => {
    if (!showModal) return document.body.classList.remove("overflow-hidden");
    document.body.classList.add("overflow-hidden");

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [showModal]);

  useEffect(() => {
    setTime(1);
  }, [showModal]);

  return (
    <div
      className={clsx(
        "modal-container fixed top-0 left-0 z-50 w-screen h-screen bg-darkgray bg-opacity-50 scale-100 flex",
        showModal && "active"
      )}
      ref={modalRef}
    >
      <div className="m-auto shadow w-96 rounded-xl bg-white">
        <div className="flex flex-col justify-center items-center gap-6 h-48 p-6 text-black rounded-t-xl">
          <p className="text-lg text-center">
            {user.name} 님의
            <br /> 휴식시간을 설정해주세요.
          </p>

          <div className="flex items-center gap-4 text-2xl font-semibold">
            <button
              className="flex items-center justify-center w-10 h-10 border border-gray-600 rounded-full bg-lightgray text-darkgray hover:bg-mediumgray"
              onClick={handleDecrease}
            >
              <FiMinus className="w-5 h-5" />
            </button>
            <span className="text-lg text-primary">{time}</span>
            <button
              className="flex items-center justify-center w-10 h-10 border border-gray-600 rounded-full bg-lightgray text-darkgray hover:bg-mediumgray"
              onClick={handleIncrease}
            >
              <LuPlus className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex">
          <button
            className="w-full h-14 text-lg text-center text-darkgray rounded-bl-xl bg-lightgray hover:bg-mediumgray"
            onClick={onCancel}
          >
            취소
          </button>
          <button
            className="w-full h-14 text-lg text-center text-white rounded-br-xl bg-primary hover:brightness-105"
            onClick={handleConfirm}
          >
            설정
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(RestTimeModal);
