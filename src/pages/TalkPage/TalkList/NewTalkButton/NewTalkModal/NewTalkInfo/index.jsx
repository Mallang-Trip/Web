import basicProfileImage from "../../../../../../assets/images/profileImage.png";
import groupTalkImage from "../../../../../../assets/images/groupTalkImage.png";

function NewTalkInfo({ inviteMember, roomName, setRoomName }) {
  if (inviteMember.length === 1)
    return (
      <div className="h-full flex flex-col gap-16 pb-12 justify-center items-center">
        <img
          src={inviteMember[0].profileImg || basicProfileImage}
          alt="image"
          className="w-36 h-36 rounded-full"
        />
        <p className="text-base text-black text-center">
          <span className="text-primary">{inviteMember[0].nickName}</span>{" "}
          님과의 1:1 말랑톡을 만들까요?
        </p>
      </div>
    );
  else
    return (
      <div className="h-full flex flex-col gap-16 pb-12 justify-center items-center">
        <img
          src={groupTalkImage}
          alt="image"
          className="w-36 h-36 rounded-full"
        />
        <div className="w-full relative">
          <input
            type="text"
            placeholder="말랑톡방 이름을 정해주세요."
            className="border border-mediumgray text-black text-sm rounded-lg focus:outline-primary block w-full p-2.5"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value.slice(0, 20))}
          />
          <span
            className={`absolute top-1/2 right-2 trnasform -translate-y-1/2 text-sm ${
              roomName.length === 20 ? "text-primary" : "text-darkgray"
            }`}
          >
            {`${roomName.length}/20`}
          </span>
        </div>
        <div className="text-xs text-darkgray">
          말랑톡 시작 전, 내가 설정한 그룹 채팅방의 이름은 다른 모든 대화
          상대에게도 동일하게 보입니다.
        </div>
      </div>
    );
}

export default NewTalkInfo;
