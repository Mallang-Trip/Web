import {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  setPrivateRoomId,
  setPublicRoomId,
} from "../../../redux/modules/talkRoomSlice";
import { useDispatch } from "react-redux";
import { getChatRoomData } from "../../../api/chat";
import { uploadImage } from "../../../api/image";
import { Client, Stomp } from "@stomp/stompjs";
import { ChatRoomDetail } from "../../../types";
import { BASE_SERVER_URL } from "../../../utils/axios";
import SockJS from "sockjs-client/dist/sockjs";
import TalkRoomHead from "./TalkRoomHead";
import TalkRoomBody from "./TalkRoomBody";
import TalkRoomForm from "./TalkRoomForm";
import TalkRoomWrapper from "./TalkRoomWrapper";
import ImageModal from "./ImageModal";
import TalkMenu from "./TalkMenu";
import ProfileModal from "../../../components/ProfileModal";
import clsx from "clsx";

interface Props {
  openTalkId: number;
  setOpenTalkId: Dispatch<SetStateAction<number>>;
  getChatListFunc: () => void;
}

function TalkRoom({ openTalkId, setOpenTalkId, getChatListFunc }: Props) {
  const dispatch = useDispatch();
  const client = useRef<Client | null>(null);
  const [openRoom, setOpenRoom] = useState(false);
  const [openRoomAnimation, setOpenRoomAnimation] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileUserId, setProfileUserId] = useState(0);
  const [sendImageLoading, setSendImageLoading] = useState(false);
  const [roomId, setRoomId] = useState(0);
  const [roomData, setRoomData] = useState<ChatRoomDetail>({
    chatRoomId: 0,
    headCount: 0,
    isBlock: false,
    isBlocked: false,
    members: [],
    messages: [],
    myParty: false,
    partyId: 0,
    publicRoomId: 0,
    roomName: "",
    type: "COUPLE",
  });

  const ACCESSTOKEN = useMemo(
    () => ({
      "access-token": `Bearer ${localStorage.getItem("accessToken")}`,
    }),
    [localStorage.getItem("accessToken")]
  );

  const header = useMemo(
    () => ({ ...ACCESSTOKEN, "room-id": roomId.toString() }),
    [ACCESSTOKEN, roomId]
  );

  const closeRoomHandler = useCallback(() => {
    if (client.current) client.current.deactivate();
    setOpenTalkId(0);
    setOpenRoomAnimation(false);
    setTimeout(() => setOpenRoom(false), 550);
  }, [client]);

  const openRoomHandler = useCallback(() => {
    setOpenRoom(true);
    setTimeout(() => setOpenRoomAnimation(true), 50);
  }, []);

  const readMessage = useCallback(() => {
    if (!client.current || !client.current.connected) return;

    client.current.publish({
      destination: "/pub/read",
      headers: header,
    });
  }, [client, header]);

  const sendImageHandler = useCallback(
    async (image: File) => {
      if (!client.current || !client.current.connected) return;
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
    },
    [client, header]
  );

  const sendMessageHandler = useCallback(
    (message: string) => {
      if (!client.current || !client.current.connected) return;

      client.current.publish({
        destination: "/pub/write",
        headers: header,
        body: JSON.stringify({
          type: "TEXT",
          content: message,
        }),
      });
    },
    [client, header]
  );

  const subscribeChatRoomWS = useCallback(() => {
    client.current?.subscribe(
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
  }, [client, roomId, roomData, ACCESSTOKEN, readMessage]);

  const connectChatRoomWS = useCallback(() => {
    if (client.current) client.current.deactivate();

    client.current = Stomp.over(() => {
      const sock = new SockJS(BASE_SERVER_URL + "/ws/chat");
      return sock;
    });

    // @ts-ignore
    client.current.connect(ACCESSTOKEN, subscribeChatRoomWS);
  }, [client, ACCESSTOKEN, subscribeChatRoomWS]);

  const getChatRoomDataFunc = useCallback(async () => {
    try {
      const result = await getChatRoomData(roomId);
      setRoomData(result.payload);
      connectChatRoomWS();
    } catch (e) {
      console.log(e);
    }
  }, [roomId]);

  useEffect(() => {
    if (!roomData?.myParty) {
      dispatch(setPrivateRoomId(null));
      dispatch(setPublicRoomId(null));
      return;
    }
    if (roomData.type !== "PARTY_PRIVATE") return;

    dispatch(setPrivateRoomId(roomData.chatRoomId));
    dispatch(setPublicRoomId(roomData.publicRoomId));
  }, [roomData]);

  useEffect(() => {
    if (roomId === 0) return;

    getChatRoomDataFunc();
  }, [roomId]);

  useEffect(() => {
    getChatRoomDataFunc();
  }, [showProfileModal]);

  useEffect(() => {
    if (openTalkId === 0) return setRoomId(0);

    setRoomId(openTalkId);
    setShowMenu(false);

    if (!openRoom) return openRoomHandler();
    setOpenRoom(false);
    setOpenRoomAnimation(false);
    setTimeout(openRoomHandler, 50);
  }, [openTalkId]);

  if (!openRoom) return null;
  if (!roomData) return null;
  return (
    <div
      className={clsx(
        "fixed top-0 left-0 z-50 md:z-20 md:pt-16 w-full pl-0 md:pl-[450px] h-real-screen transition-transform duration-500 bg-white",
        openRoomAnimation ? "translate-x-0" : "translate-x-full"
      )}
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
          isBlock={roomData.isBlock}
          isBlocked={roomData.isBlocked}
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
        chatRoomId={roomId}
        driverName={false}
      />
    </div>
  );
}

export default memo(TalkRoom);
