import { useEffect, useState } from "react";
import PageContainer from "../../components/PageContainer";
import basicProfileImage from "../../assets/images/profileImage.png";
import TalkList from "./TalkList";
import TalkRoom from "./TalkRoom";
import BlankSpace from "./BlankSpace";

const talkList = [
  {
    id: 1,
    profileImg: basicProfileImage,
    nickName: "jelly217",
    lastChat: "안녕하세요. 저는 누구누구 입니다 블라블라블라블라블라블라블라",
    time: "3분 전",
    readCount: 5,
  },
  {
    id: 2,
    profileImg: basicProfileImage,
    nickName: "abcd",
    lastChat: "안녕ㅎ세요!",
    time: "어제",
    readCount: 3,
  },
  {
    id: 3,
    profileImg: basicProfileImage,
    nickName: "나비",
    lastChat: "ㅎㅇㅎㅇ~",
    time: "12월 7일",
    readCount: 0,
  },
];

function TalkPage() {
  const [openTalkId, setOpenTalkId] = useState(0);

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, []);

  return (
    <PageContainer>
      <TalkList
        talkList={talkList}
        openTalkId={openTalkId}
        setOpenTalkId={setOpenTalkId}
      />
      <TalkRoom openTalkId={openTalkId} setOpenTalkId={setOpenTalkId} />
      <BlankSpace />
    </PageContainer>
  );
}

export default TalkPage;
