import { useEffect, useRef, useState } from "react";
import { getChatRoomData } from "../../../api/chat";
import { ACCESSTOKEN } from "../../../global";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs";
import properties from "../../../config/properties";
import TalkRoomHead from "./TalkRoomHead";
import TalkRoomBody from "./TalkRoomBody";
import TalkRoomForm from "./TalkRoomForm";
import TalkRoomWrapper from "./TalkRoomWrapper";

function TalkRoom({ openTalkId, setOpenTalkId, setShowProfileModal }) {
  const client = useRef();
  const [openRoom, setOpenRoom] = useState(false);
  const [openRoomAnimation, setOpenRoomAnimation] = useState(false);
  const [roomData, setRoomData] = useState({});
  const header = { ...ACCESSTOKEN, "room-id": openTalkId };

  const closeRoomHandler = () => {
    if (client.current) client.current.deactivate();

    setOpenTalkId(0);
    setOpenRoomAnimation(false);
    setTimeout(() => setOpenRoom(false), 550);
  };

  const openRoomHandler = () => {
    setOpenRoom(true);
    setTimeout(() => setOpenRoomAnimation(true), 50);
  };

  const readMessage = () => {
    if (!client.current.connected) return;

    client.current.publish({
      destination: "/pub/read",
      headers: header,
    });
  };

  const sendMessageHandler = (message) => {
    if (!client.current.connected) return;

    client.current.publish({
      destination: "/pub/write",
      headers: header,
      body: JSON.stringify({
        type: "TEXT",
        content: message,
      }),
    });
  };

  const subscribeChatRoomWS = () => {
    client.current.subscribe(
      `/sub/room/${openTalkId}`,
      (newChat) => {
        console.log(JSON.parse(newChat.body));
        readMessage();
      },
      ACCESSTOKEN
    );

    readMessage();
  };

  const connectChatRoomWS = () => {
    client.current = Stomp.over(() => {
      const sock = new SockJS(properties.baseURL + "/ws/chat");
      return sock;
    });

    client.current.connect(ACCESSTOKEN, subscribeChatRoomWS);
  };

  const getChatRoomDataFunc = async () => {
    try {
      const result = await getChatRoomData(openTalkId);
      setRoomData(result.payload);
      connectChatRoomWS();
      console.log(result.payload);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (openTalkId === 0) return;

    getChatRoomDataFunc();

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
        <TalkRoomHead
          name={roomData.roomName}
          closeRoomHandler={closeRoomHandler}
        />
        <TalkRoomBody
          messages={roomData.messages}
          setShowProfileModal={setShowProfileModal}
        />
        <TalkRoomForm sendMessageHandler={sendMessageHandler} />
      </TalkRoomWrapper>
    </div>
  );
}

export default TalkRoom;
