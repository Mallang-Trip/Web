import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Stomp } from "@stomp/stompjs";
import { getChatList } from "../../api/chat";
import { ACCESSTOKEN } from "../../global";
import SockJS from "sockjs-client/dist/sockjs";
import properties from "../../config/properties";
import PageContainer from "../../components/PageContainer";
import TalkList from "./TalkList";
import TalkRoom from "./TalkRoom";
import BlankSpace from "./BlankSpace";
import ProfileModal from "../../components/ProfileModal";

function TalkPage() {
  const client = useRef();
  const user = useSelector((state) => state.user);
  const [openTalkId, setOpenTalkId] = useState(0);
  const [showProfileModal, setShowProfileModal] = useState(false);
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

    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
      if (client.current) client.current.deactivate();
    };
  }, []);

  return (
    <PageContainer>
      <TalkList
        chatList={chatList}
        openTalkId={openTalkId}
        setOpenTalkId={setOpenTalkId}
      />
      <TalkRoom
        openTalkId={openTalkId}
        setOpenTalkId={setOpenTalkId}
        setShowProfileModal={setShowProfileModal}
      />
      <BlankSpace />

      <ProfileModal
        showModal={showProfileModal}
        setShowModal={setShowProfileModal}
        name={"jelly217"}
      />
    </PageContainer>
  );
}

export default TalkPage;
