import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import TalkBubble from "./TalkBubble";
import chatArrowIcon from "../../../../assets/svg/right-arrow.svg";

function TalkRoomBody({
  messages = [],
  setShowProfileModal,
  setProfileUserId,
}) {
  const talkRoomRef = useRef();
  const user = useSelector((state) => state.user);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollDownHandler = () => {
    const talkRoomSpace = talkRoomRef.current;
    const { scrollHeight, clientHeight } = talkRoomSpace;

    talkRoomSpace.scrollTo({
      top: scrollHeight - clientHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const talkRoomSpace = talkRoomRef.current;

    const handleScroll = () => {
      const { scrollHeight, clientHeight, scrollTop } = talkRoomSpace;
      const isScrolledToBottom = scrollHeight - clientHeight <= scrollTop + 200;

      setShowScrollButton(!isScrolledToBottom);
    };

    talkRoomSpace.addEventListener("scroll", handleScroll);

    return () => {
      talkRoomSpace.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (showScrollButton) return;
    scrollDownHandler();
  }, [messages]);

  return (
    <div
      className="flex flex-col h-full overflow-y-auto px-2 noScrollBar"
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
          <button onClick={scrollDownHandler}>
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

export default TalkRoomBody;
