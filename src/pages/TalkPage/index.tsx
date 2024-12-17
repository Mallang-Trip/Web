import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setPartyRoomId } from "../../redux/modules/talkRoomSlice";
import { Client, Stomp } from "@stomp/stompjs";
import { getChatList } from "../../api/chat";
import { ChatRoomList } from "../../types";
import { BASE_SERVER_URL } from "../../utils/env";
import SockJS from "sockjs-client/dist/sockjs";
import PageContainer from "../../components/PageContainer";
import TalkList from "./TalkList";
import TalkRoom from "./TalkRoom";
import BlankSpace from "./BlankSpace";

function TalkPage() {
  const dispatch = useDispatch();
  const client = useRef<Client | null>(null);
  const partyRoomId = useSelector(
    (state: RootState) => state.talkRoom.partyRoomId
  );
  const user = useSelector((state: RootState) => state.user);
  const [openTalkId, setOpenTalkId] = useState(0);
  const [chatList, setChatList] = useState<ChatRoomList[]>([]);
  const [searchParams] = useSearchParams();
  const chatRoomId = searchParams.get("chatRoomId");

  const ACCESSTOKEN = useMemo(
    () => ({
      "access-token": `Bearer ${localStorage.getItem("accessToken")}`,
    }),
    [localStorage.getItem("accessToken")]
  );

  const subscribeChatListWS = useCallback(() => {
    client.current?.subscribe(
      `/sub/list/${user.userId}`,
      (newChatList) => {
        setChatList(JSON.parse(newChatList.body));
      },
      ACCESSTOKEN
    );
  }, [client, user, ACCESSTOKEN]);

  const connectChatListWS = useCallback(() => {
    if (client.current) return;

    client.current = Stomp.over(() => {
      const sock = new SockJS(BASE_SERVER_URL + "/ws/chat");
      return sock;
    });

    // @ts-ignore
    client.current.connect(ACCESSTOKEN, subscribeChatListWS);
  }, [client, ACCESSTOKEN]);

  const getChatListFunc = useCallback(async () => {
    try {
      const result = await getChatList();
      setChatList(result.payload);
      connectChatListWS();
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    if (partyRoomId !== 0) {
      setOpenTalkId(partyRoomId || 0);
      dispatch(setPartyRoomId(0));
    }
  }, [partyRoomId]);

  useEffect(() => {
    if (chatRoomId) {
      setOpenTalkId(parseInt(chatRoomId));
    }
  }, [chatRoomId]);

  useEffect(() => {
    getChatListFunc();

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <PageContainer>
      <TalkList
        chatList={chatList}
        openTalkId={openTalkId}
        setOpenTalkId={setOpenTalkId}
        getChatListFunc={getChatListFunc}
      />
      <TalkRoom
        openTalkId={openTalkId}
        setOpenTalkId={setOpenTalkId}
        getChatListFunc={getChatListFunc}
      />
      <BlankSpace />
    </PageContainer>
  );
}

export default memo(TalkPage);
