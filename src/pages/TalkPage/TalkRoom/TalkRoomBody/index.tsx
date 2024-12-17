import {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import TalkBubble from "./TalkBubble";
import chatArrowIcon from "../../../../assets/svg/right-arrow.svg";

interface Props {
  messages: {
    content: string;
    createdAt: string;
    messageId: number;
    nickname: string;
    profileImg: string | null;
    type: string;
    userId: number;
  }[];
  setShowProfileModal: Dispatch<SetStateAction<boolean>>;
  setProfileUserId: Dispatch<SetStateAction<number>>;
}

function TalkRoomBody({
  messages,
  setShowProfileModal,
  setProfileUserId,
}: Props) {
  const talkRoomRef = useRef<HTMLDivElement | null>(null);
  const user = useSelector((state: RootState) => state.user);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollDownHandler = useCallback(
    (smooth: boolean = false) => {
      const talkRoomSpace = talkRoomRef.current;
      if (talkRoomSpace) {
        const { scrollHeight, clientHeight } = talkRoomSpace;
        talkRoomSpace.scrollTo({
          top: scrollHeight - clientHeight,
          behavior: smooth ? "smooth" : "auto",
        });
      }
    },
    [talkRoomRef]
  );

  useEffect(() => {
    const handleResize = () => {
      scrollDownHandler();
    };

    window.addEventListener("resize", handleResize);
    scrollDownHandler();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [scrollDownHandler]);

  useEffect(() => {
    const handleScroll = () => {
      if (!talkRoomRef.current) return;
      const { scrollHeight, clientHeight, scrollTop } = talkRoomRef.current;
      const isScrolledToBottom = scrollHeight - clientHeight <= scrollTop + 200;
      setShowScrollButton(!isScrolledToBottom);
    };

    const currentRef = talkRoomRef.current;
    currentRef?.addEventListener("scroll", handleScroll);
    return () => {
      currentRef?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!showScrollButton) {
      scrollDownHandler(true);
    }
  }, [messages, showScrollButton, scrollDownHandler]);

  return (
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
          isMyMessage={message.userId === user.userId}
          {...message}
        />
      ))}
      {showScrollButton && (
        <div
          className="fixed right-0 bottom-20 mr-3 flex justify-center animate-bounce"
          style={{
            width: `${talkRoomRef.current?.clientWidth}px`,
          }}
        >
          <button onClick={() => scrollDownHandler(true)}>
            <img
              src={chatArrowIcon}
              alt="chat-down"
              className="w-10 h-10 rounded-full rotate-90"
            />
          </button>
        </div>
      )}
    </div>
  );
}

export default memo(TalkRoomBody);
