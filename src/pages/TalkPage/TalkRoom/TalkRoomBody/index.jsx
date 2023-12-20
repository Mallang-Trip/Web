import TalkBubble from "./TalkBubble";
import basicProfileImage from "../../../../assets/images/profileImage.png";
import exampleImg from "../../../../assets/images/커뮤니티 사용 이미지.jpg";
import exampleImg2 from "../../../../assets/images/강원도 이미지.jpg";

const talkData = [
  {
    id: 1,
    type: "TYPE_INFO",
    message: "2023년 12월 8일 금요일",
    isMyMessage: false,
  },
  {
    id: 2,
    type: "TYPE_MESSAGE",
    isMyMessage: true,
    profileImg: basicProfileImage,
    message: "안녕하세요.",
    image: null,
    createdAt: "오후 2:48",
  },
  {
    id: 3,
    type: "TYPE_MESSAGE",
    isMyMessage: true,
    profileImg: basicProfileImage,
    message: "같이 여행갈래요??",
    image: null,
    createdAt: "오후 2:54",
  },
  {
    id: 4,
    type: "TYPE_MESSAGE",
    isMyMessage: false,
    profileImg: basicProfileImage,
    message: "네네 하이요",
    image: null,
    createdAt: "오후 2:55",
  },
  {
    id: 5,
    type: "TYPE_MESSAGE",
    isMyMessage: false,
    profileImg: basicProfileImage,
    message:
      "네네 하이요 네네 하이요 네네 하이요 네네 하이요 네네 하이요 네네 하이요",
    image: null,
    createdAt: "오후 2:56",
  },
  {
    id: 6,
    type: "TYPE_MESSAGE",
    isMyMessage: false,
    profileImg: basicProfileImage,
    message: "좋아요 언제 갈까요?",
    image: null,
    createdAt: "오후 2:56",
  },
  {
    id: 7,
    type: "TYPE_MESSAGE",
    isMyMessage: true,
    profileImg: basicProfileImage,
    message: "내일 어떠세요!~?",
    image: null,
    createdAt: "오후 2:57",
  },
  {
    id: 8,
    type: "TYPE_MESSAGE",
    isMyMessage: false,
    profileImg: basicProfileImage,
    message: "네네 그래요 ㅎㅎ 나중에 봐요!!",
    image: null,
    createdAt: "오후 3:01",
  },
  {
    id: 9,
    type: "TYPE_MESSAGE",
    isMyMessage: false,
    profileImg: basicProfileImage,
    message: null,
    image: exampleImg,
    createdAt: "오후 3:01",
  },
  {
    id: 10,
    type: "TYPE_MESSAGE",
    isMyMessage: false,
    profileImg: basicProfileImage,
    message: "이렇게 생겼어요 ㅎㅎ",
    image: null,
    createdAt: "오후 3:01",
  },
  {
    id: 11,
    type: "TYPE_MESSAGE",
    isMyMessage: true,
    profileImg: basicProfileImage,
    message: null,
    image: exampleImg2,
    createdAt: "오후 3:13",
  },
  {
    id: 12,
    type: "TYPE_MESSAGE",
    isMyMessage: true,
    profileImg: basicProfileImage,
    message: "오 좋네요 굿 ㅋㅋ",
    image: null,
    createdAt: "오후 3:12",
  },
  {
    id: 13,
    type: "TYPE_MESSAGE",
    isMyMessage: true,
    profileImg: basicProfileImage,
    message: "기대가 됩니다~",
    image: null,
    createdAt: "오후 3:13",
  },
  {
    id: 14,
    type: "TYPE_INFO",
    message: "드라이버님이 들어왔습니다.",
    isMyMessage: false,
  },
];

function TalkRoomBody({ setShowProfileModal }) {
  return (
    <div className="flex flex-col h-full overflow-y-auto px-2 noScrollBar">
      {talkData.map((talk, index) => (
        <TalkBubble
          key={talk.id}
          setShowProfileModal={setShowProfileModal}
          isPrevSame={
            index > 0 && talk.isMyMessage === talkData[index - 1].isMyMessage
          }
          isNextSame={
            index < talkData.length - 1 &&
            talk.isMyMessage === talkData[index + 1].isMyMessage
          }
          {...talk}
        />
      ))}
    </div>
  );
}

export default TalkRoomBody;
