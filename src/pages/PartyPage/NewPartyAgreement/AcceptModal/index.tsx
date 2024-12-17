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
import { useParams } from "react-router-dom";
import { putNewPartyAccept } from "@/api/party";
import clsx from "clsx";

interface Props {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  getPartyData: (toScrollTop?: boolean) => void;
  accept: boolean;
}

function AcceptModal({ showModal, setShowModal, getPartyData, accept }: Props) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { partyId } = useParams();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  const acceptHandler = useCallback(async () => {
    if (loading || !partyId) return;

    try {
      setLoading(true);

      await putNewPartyAccept(partyId, accept);

      if (accept) setMessage("파티 가입을 승인하였습니다.");
      else setMessage("파티 가입을 거절하였습니다.");
      setComplete(true);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [loading, partyId, accept]);

  const closeModal = useCallback(() => {
    if (complete) getPartyData(true);
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

    if (accept) setMessage("파티 가입을 승인하겠습니까?");
    else setMessage("파티 가입을 거절하겠습니까?");

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
              onClick={acceptHandler}
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

export default memo(AcceptModal);
