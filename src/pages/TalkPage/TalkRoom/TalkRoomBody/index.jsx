import { useSelector } from "react-redux";
import TalkBubble from "./TalkBubble";

function TalkRoomBody({ messages = [], setShowProfileModal }) {
  const user = useSelector((state) => state.user);

  return (
    <div className="flex flex-col h-full overflow-y-auto px-2 noScrollBar">
      {messages.map((message, index) => (
        <TalkBubble
          key={message.messageId}
          setShowProfileModal={setShowProfileModal}
          isPrevSameDate={
            index > 0 &&
            message.createdAt.slice(0, 10) ===
              messages[index - 1].createdAt.slice(0, 10)
          }
          isPrevSameUser={
            index > 0 && message.userId === messages[index - 1].userId
          }
          isNextSameUser={
            index < messages.length - 1 &&
            message.userId === messages[index + 1].userId
          }
          isMyMessage={message.userId === user.userId}
          {...message}
        />
      ))}
    </div>
  );
}

export default TalkRoomBody;
