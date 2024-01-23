import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setPublicRoomId } from "../../../redux/modules/talkRoomSlice";
import { getChatRoomData } from "../../../api/chat";
import { uploadImage } from "../../../api/image";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs";
import properties from "../../../config/properties";
import TalkRoomHead from "./TalkRoomHead";
import TalkRoomBody from "./TalkRoomBody";
import TalkRoomForm from "./TalkRoomForm";
import TalkRoomWrapper from "./TalkRoomWrapper";
import ImageModal from "./ImageModal";
import TalkMenu from "./TalkMenu";
import ProfileModal from "../../../components/ProfileModal";

function TalkRoom({ openTalkId, setOpenTalkId, getChatListFunc }) {
  const dispatch = useDispatch();
  const client = useRef();
  const [openRoom, setOpenRoom] = useState(false);
  const [openRoomAnimation, setOpenRoomAnimation] = useState(false);
  const [roomData, setRoomData] = useState({});
  const [showImageModal, setShowImageModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileUserId, setProfileUserId] = useState(0);
  const [sendImageLoading, setSendImageLoading] = useState(false);
  const [roomId, setRoomId] = useState(0);
  const ACCESSTOKEN = {
    "access-token": `Bearer ${localStorage.getItem("accessToken")}`,
  };
  const header = { ...ACCESSTOKEN, "room-id": roomId };

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

  const sendImageHandler = async (image) => {
    if (!client.current.connected) return;
    if (!image) return alert("사진을 첨부해주세요.");

    try {
      setSendImageLoading(true);
      const imageURL = await uploadImage(image);

      client.current.publish({
        destination: "/pub/write",
        headers: header,
        body: JSON.stringify({
          type: "IMAGE",
          content: imageURL,
        }),
      });

      setShowImageModal(false);
    } catch (e) {
      console.log(e);
    } finally {
      setSendImageLoading(false);
    }
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
      `/sub/room/${roomId}`,
      (messages) => {
        setRoomData((roomData) => {
          return {
            ...roomData,
            messages: [...roomData.messages, JSON.parse(messages.body)],
          };
        });

        readMessage();
      },
      ACCESSTOKEN
    );

    readMessage();
  };

  const connectChatRoomWS = () => {
    if (client.current) client.current.deactivate();

    client.current = Stomp.over(() => {
      const sock = new SockJS(properties.baseURL + "/ws/chat");
      return sock;
    });

    client.current.connect(ACCESSTOKEN, subscribeChatRoomWS);
  };

  const getChatRoomDataFunc = async () => {
    try {
      const result = await getChatRoomData(roomId);
      setRoomData(result.payload);
      connectChatRoomWS();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!roomData.myParty) dispatch(setPublicRoomId(null));
    else if (roomData.publicRoomId)
      dispatch(setPublicRoomId(roomData.publicRoomId));
  }, [roomData]);

  useEffect(() => {
    if (roomId === 0) return;

    getChatRoomDataFunc();
  }, [roomId]);

  useEffect(() => {
    if (openTalkId === 0) return;

    setRoomId(openTalkId);

    if (!openRoom) return openRoomHandler();
    setOpenRoom(false);
    setOpenRoomAnimation(false);
    setTimeout(openRoomHandler, 50);
  }, [openTalkId]);

  if (!openRoom) return null;
  return (
    <div
      className={`fixed top-0 left-0 z-50 md:z-20 md:pt-16 w-full pl-0 md:pl-[450px] h-real-screen transition-transform duration-500 bg-white ${
        openRoomAnimation ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <TalkRoomWrapper>
        <TalkRoomHead
          name={roomData.roomName}
          closeRoomHandler={closeRoomHandler}
          setShowMenu={setShowMenu}
        />
        <TalkRoomBody
          messages={roomData.messages}
          setShowProfileModal={setShowProfileModal}
          setProfileUserId={setProfileUserId}
        />
        <TalkRoomForm
          sendMessageHandler={sendMessageHandler}
          setShowImageModal={setShowImageModal}
        />

        <TalkMenu
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          getChatRoomDataFunc={getChatRoomDataFunc}
          getChatListFunc={getChatListFunc}
          closeRoomHandler={closeRoomHandler}
          setShowProfileModal={setShowProfileModal}
          setProfileUserId={setProfileUserId}
          openTalkId={openTalkId}
          setRoomId={setRoomId}
          partyId={roomData.partyId}
          {...roomData}
        />
      </TalkRoomWrapper>

      <ImageModal
        showModal={showImageModal}
        setShowModal={setShowImageModal}
        sendImageHandler={sendImageHandler}
        sendImageLoading={sendImageLoading}
      />
      <ProfileModal
        showModal={showProfileModal}
        setShowModal={setShowProfileModal}
        userId={profileUserId}
      />
    </div>
  );
}

export default TalkRoom;
