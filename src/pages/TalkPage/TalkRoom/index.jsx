import { useEffect, useState } from "react";
import TalkRoomHead from "./TalkRoomHead";
import TalkRoomBody from "./TalkRoomBody";
import TalkRoomForm from "./TalkRoomForm";
import TalkRoomWrapper from "./TalkRoomWrapper";

function TalkRoom({ openTalkId, setOpenTalkId }) {
  const [openRoom, setOpenRoom] = useState(false);
  const [openRoomAnimation, setOpenRoomAnimation] = useState(false);

  const closeRoomHandler = () => {
    setOpenTalkId(0);
    setOpenRoomAnimation(false);
    setTimeout(() => setOpenRoom(false), 550);
  };

  const openRoomHandler = () => {
    setOpenRoom(true);
    setTimeout(() => setOpenRoomAnimation(true), 50);
  };

  useEffect(() => {
    if (openTalkId === 0) return;

    // TODO: 채팅 내역 불러오기 (API)

    // 채팅방 등장
    if (!openRoom) return openRoomHandler();
    setOpenRoom(false);
    setOpenRoomAnimation(false);
    setTimeout(openRoomHandler, 50);
  }, [openTalkId]);

  if (!openRoom) return null;
  return (
    <div
      className={`fixed top-0 left-0 z-50 md:z-20 md:pt-16 w-full pl-0 md:pl-[450px] h-screen transition-transform duration-500 bg-white ${
        openRoomAnimation ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <TalkRoomWrapper>
        <TalkRoomHead name={"jelly217"} closeRoomHandler={closeRoomHandler} />
        <TalkRoomBody />
        <TalkRoomForm />
      </TalkRoomWrapper>
    </div>
  );
}

export default TalkRoom;
