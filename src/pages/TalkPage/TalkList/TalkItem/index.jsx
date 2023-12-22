import basicProfileImage from "../../../../assets/images/profileImage.png";
import { chatListDateToGapKorean } from "../../../../utils";

function TalkItem({
  chatRoomId,
  // profileImg,
  profileImages,
  roomName,
  content,
  updatedAt,
  unreadCount,
  openTalkId,
  setOpenTalkId,
  headCount,
  isGroup,
}) {
  const lastMessage = () => {
    if (
      content.slice(0, 64) ===
      "https://mallang-trip-db.s3.ap-northeast-2.amazonaws.com/profile/"
    )
      return "사진";

    return content;
  };

  return (
    <li>
      <button
        className={`w-full flex justify-between py-3 px-3 rounded-lg hover:bg-[#F4F4F4] group focus:outline-none ${
          openTalkId === chatRoomId ? "bg-[#F4F4F4]" : "bg-white"
        }`}
        onClick={() => setOpenTalkId(chatRoomId)}
      >
        <div className="flex flex-row">
          <img
            className="mr-3 w-16 h-16 rounded-full"
            src={profileImages[0] || basicProfileImage}
            alt="Profile_Image"
          />
          <div className="flex flex-col gap-2 text-left">
            <div className="flex gap-4 items-center">
              <span className="text-lg text-black font-bold">{roomName}</span>
              {isGroup && (
                <span className="text-sm text-[#D9D9D9] font-bold">
                  {headCount + "명"}
                </span>
              )}
            </div>
            <p className="w-full text-sm text-darkgray font-medium overflow-hidden line-clamp-1">
              {lastMessage()}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 items-end text-left w-24">
          <span className="text-xs ml-auto text-darkgray font-medium">
            {chatListDateToGapKorean(updatedAt)}
          </span>
          {unreadCount > 0 && (
            <div className="w-6 h-6 bg-primary rounded-full text-xs text-white flex justify-center items-center">
              {unreadCount}
            </div>
          )}
        </div>
      </button>
    </li>
  );
}

export default TalkItem;
