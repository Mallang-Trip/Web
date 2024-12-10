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
import { createPortal } from "react-dom";
import { getChatDetail } from "../../../../api/admin";
import { Message } from "../../../../types";
import ProfileModal from "../../../../components/ProfileModal";
import TalkBubble from "../../../TalkPage/TalkRoom/TalkRoomBody/TalkBubble";
import clsx from "clsx";

interface Props {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  mallangTalkInfo: {
    partyName: string;
    partyPrivateChatRoomId: number;
    partyPublicChatRoomId: number;
  };
}

function MallangTalkModal({ showModal, setShowModal, mallangTalkInfo }: Props) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const talkRoomRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [roomId, setRoomId] = useState<number | null>(null);
  const [profileUserId, setProfileUserId] = useState(0);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const getChatDetailFunc = useCallback(async () => {
    try {
      const result = await getChatDetail(roomId);
      setMessages(result.payload);
    } catch (e) {
      console.log(e);
    }
  }, [roomId]);

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
    if (!roomId) return;
    getChatDetailFunc();
  }, [roomId]);

  useEffect(() => {
    if (!showModal) {
      return document.body.classList.remove("overflow-hidden");
    }
    document.body.classList.add("overflow-hidden");

    setRoomId(mallangTalkInfo.partyPrivateChatRoomId);

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [showModal]);

  return createPortal(
    <>
      <div
        className={clsx(
          "modal-container fixed top-0 left-0 z-50 w-screen h-real-screen bg-darkgray bg-opacity-50 scale-100 flex",
          showModal && "active"
        )}
        ref={modalRef}
        onClick={modalOutSideClick}
      >
        <div className="mx-auto w-96 h-full rounded-xl flex flex-col justify-center items-center">
          <div className="w-full flex flex-col h-3/5 px-2 bg-white rounded-t-xl">
            <div className="my-4">
              <p className="mb-3 text-xl text-black font-bold text-center">
                {mallangTalkInfo.partyName}
              </p>
              <div className="w-72 mx-auto flex justify-between border border-primary rounded-full relative">
                <button
                  className={clsx(
                    "w-36 py-3 text-center text-sm transform duration-700 rounded-full",
                    roomId === mallangTalkInfo.partyPrivateChatRoomId
                      ? "text-white bg-primary"
                      : "text-darkgray"
                  )}
                  onClick={() =>
                    setRoomId(mallangTalkInfo.partyPrivateChatRoomId)
                  }
                >
                  파티 전용방
                </button>
                <button
                  className={clsx(
                    "w-36 py-3 text-center text-sm transform duration-700 rounded-full",
                    roomId === mallangTalkInfo.partyPublicChatRoomId
                      ? "text-white bg-primary"
                      : "text-darkgray"
                  )}
                  onClick={() =>
                    setRoomId(mallangTalkInfo.partyPublicChatRoomId)
                  }
                >
                  파티 공개방
                </button>
              </div>
            </div>
            <div
              className="flex flex-col h-full px-2 custom-scrollbar"
              ref={talkRoomRef}
            >
              {messages.map((message, index) => (
                <TalkBubble
                  key={message.messageId}
                  setShowProfileModal={setShowProfileModal}
                  setProfileUserId={setProfileUserId}
                  isPrevSameDate={
                    index > 0 &&
                    message.createdAt.slice(0, 10) ===
                      messages[index - 1].createdAt.slice(0, 10)
                  }
                  isNextSameDate={
                    index < messages.length - 1 &&
                    message.createdAt.slice(0, 10) ===
                      messages[index + 1].createdAt.slice(0, 10)
                  }
                  isPrevSameUser={
                    index > 0 &&
                    message.userId === messages[index - 1].userId &&
                    messages[index - 1].type !== "INFO"
                  }
                  isNextSameUser={
                    index < messages.length - 1 &&
                    message.userId === messages[index + 1].userId &&
                    messages[index + 1].type !== "INFO"
                  }
                  isMyMessage={false}
                  {...message}
                />
              ))}
            </div>
          </div>
          <button
            className="w-full h-16 text-lg text-center text-white rounded-b-xl bg-primary"
            onClick={closeModal}
          >
            닫기
          </button>
        </div>
      </div>
      <ProfileModal
        showModal={showProfileModal}
        setShowModal={setShowProfileModal}
        userId={profileUserId}
        driverName={false}
      />
    </>,
    document.body
  );
}

export default memo(MallangTalkModal);
