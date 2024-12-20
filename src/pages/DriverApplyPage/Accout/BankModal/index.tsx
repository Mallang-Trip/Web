import {
  Dispatch,
  memo,
  MouseEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from "react";
import BankButton from "./BankButton";
import clsx from "clsx";

const bankList = [
  "KB국민",
  "전북",
  "대구",
  "케이뱅크",
  "신한",
  "신협",
  "수협",
  "경남",
  "우리",
  "IBK기업",
  "제주",
  "부산",
  "토스뱅크",
  "시티",
  "SBI저축",
  "우체국",
  "광주",
  "카카오뱅크",
  "NH농협",
  "새마을금고",
  "KDB산업",
  "하나",
  "SC제일",
  "저축",
];

interface Props {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  bank: string;
  setBank: Dispatch<SetStateAction<string>>;
}

function BankModal({ showModal, setShowModal, bank, setBank }: Props) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const closeModal = useCallback(() => setShowModal(false), []);

  const modalOutSideClick = useCallback(
    (event: MouseEvent) => {
      if (modalRef.current === event.target) closeModal();
    },
    [modalRef]
  );

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape" || event.key === "Enter") closeModal();
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
        <div className="grid grid-cols-4 gap-2 h-96 bg-white rounded-t-xl p-4">
          {bankList.map((item) => (
            <BankButton key={item} name={item} bank={bank} setBank={setBank} />
          ))}
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

export default memo(BankModal);
