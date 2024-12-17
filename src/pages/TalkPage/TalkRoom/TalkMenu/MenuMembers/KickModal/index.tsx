import {
  Dispatch,
  memo,
  MouseEvent,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { kickPartyChatUser } from "@/api/chat";
import clsx from "clsx";

interface Props {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  chatRoomId: number;
  userId: number;
  nickname: string;
  getChatRoomDataFunc: () => void;
}

function KickModal({
  showModal,
  setShowModal,
  chatRoomId,
  userId,
  nickname,
  getChatRoomDataFunc,
}: Props) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [message, setMessage] = useState<string | ReactNode>("");
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  const kickHandler = useCallback(async () => {
    if (loading) return;

    try {
      setLoading(true);

      const result = await kickPartyChatUser(chatRoomId, userId);

      if (result.statusCode === 403)
        setMessage(
          <div>
            <span className="text-primary">{nickname}</span>
            님은 파티원이므로 강퇴할 수 없습니다.
          </div>
        );
      else {
        setMessage(
          <div>
            <span className="text-primary">{nickname}</span>
            님을 파티 공개방에서 강퇴하였습니다.
          </div>
        );
        getChatRoomDataFunc();
      }

      setComplete(true);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [loading, chatRoomId, userId, nickname]);

  const closeModal = useCallback(() => setShowModal(false), []);

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
    if (!showModal) return;

    setComplete(false);

    setMessage(
      <div>
        <span className="text-primary">{nickname}</span>
        님을 강퇴 하시겠습니까?
      </div>
    );

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [showModal]);

  return createPortal(
    <div
      className={clsx(
        "modal-container fixed top-0 left-0 z-50 w-screen h-real-screen bg-darkgray bg-opacity-50 scale-100 flex",
        showModal && "active"
      )}
      ref={modalRef}
      onClick={modalOutSideClick}
      id="kick-modal"
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
              onClick={kickHandler}
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
    </div>,
    document.body
  );
}

export default memo(KickModal);
