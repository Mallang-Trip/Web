import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPartyRoomId } from "../../redux/modules/talkRoomSlice";
import { Stomp } from "@stomp/stompjs";
import { getChatList } from "../../api/chat";
import SockJS from "sockjs-client/dist/sockjs";
import properties from "../../config/properties";
import PageContainer from "../../components/PageContainer";
import TalkList from "./TalkList";
import TalkRoom from "./TalkRoom";
import BlankSpace from "./BlankSpace";

function TalkPage() {
  const dispatch = useDispatch();
  const partyRoomId = useSelector((state) => state.talkRoom.partyRoomId);
  const ACCESSTOKEN = {
    "access-token": `Bearer ${localStorage.getItem("accessToken")}`,
  };
  const client = useRef();
  const user = useSelector((state) => state.user);
  const [openTalkId, setOpenTalkId] = useState(0);
  const [chatList, setChatList] = useState([]);

  const subscribeChatListWS = () => {
    client.current.subscribe(
      `/sub/list/${user.userId}`,
      (newChatList) => {
        setChatList(JSON.parse(newChatList.body));
      },
      ACCESSTOKEN
    );
  };

  const connectChatListWS = () => {
    if (client.current) return;

    client.current = Stomp.over(() => {
      const sock = new SockJS(properties.baseURL + "/ws/chat");
      return sock;
    });

    client.current.connect(ACCESSTOKEN, subscribeChatListWS);
  };

  const getChatListFunc = async () => {
    try {
      const result = await getChatList();
      setChatList(result.payload);
      connectChatListWS();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getChatListFunc();

    if (partyRoomId !== 0) {
      setOpenTalkId(partyRoomId);
      dispatch(setPartyRoomId(0));
    }

    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
      if (client.current) client.current.deactivate();
    };
  }, [partyRoomId]);

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

export default TalkPage;
