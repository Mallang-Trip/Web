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
import { useNavigate } from "react-router-dom";
import { deleteDriverApply } from "@/api/driver";
import clsx from "clsx";

interface Props {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

function CancelModal({ showModal, setShowModal }: Props) {
  const navigation = useNavigate();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  const cancelHandler = useCallback(async () => {
    if (loading) return;

    try {
      setLoading(true);

      await deleteDriverApply();

      setMessage(
        "드라이버 지원서 제출을 취소하였습니다.\n\n언제든지, 드라이버 등록을 위한 지원서를\n다시 제출하실 수 있습니다."
      );
      setComplete(true);
      localStorage.removeItem("driverApplyBackup");
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  const closeModal = useCallback(() => {
    if (complete) navigation("/", { replace: true });
    setShowModal(false);
  }, [complete]);

  const modalOutSideClick = useCallback(
    (event: MouseEvent) => {
      if (modalRef.current === event.target) closeModal();
    },
    [modalRef]
  );

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") closeModal();
  }, []);

  useEffect(() => {
    if (!showModal) return document.body.classList.remove("overflow-hidden");
    document.body.classList.add("overflow-hidden");

    setComplete(false);

    setMessage(
      "드라이버 등록을 위한 심사가 진행 중입니다.\n\n지원서 제출을 취소하시겠습니까?"
    );

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
              onClick={cancelHandler}
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

export default memo(CancelModal);
