import { chatListDateToGapKorean } from "../../../../utils";
import basicProfileImage from "../../../../assets/images/profileImage.png";
import groupTalkImage from "../../../../assets/images/groupTalkImage.png";

function TalkItem({
  chatRoomId,
  profileImages,
  roomName,
  content,
  updatedAt,
  unreadCount,
  openTalkId,
  setOpenTalkId,
  headCount,
  type,
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
        className={`w-full flex justify-between gap-1 py-3 px-3 rounded-lg hover:bg-lightgray group focus:outline-none ${
          openTalkId === chatRoomId ? "bg-lightgray" : "bg-white"
        }`}
        onClick={() => setOpenTalkId(chatRoomId)}
      >
        <div className="flex flex-row">
          <img
            className="mr-3 w-16 h-16 rounded-full object-cover"
            src={
              type !== "COUPLE"
                ? groupTalkImage
                : (profileImages && profileImages[0]) || basicProfileImage
            }
            alt="Profile_Image"
          />
          <div className="flex flex-col gap-2 text-left">
            <div className="flex gap-4 items-start">
              <span className="text-lg text-black font-bold">{roomName}</span>
              {type !== "COUPLE" && (
                <span className="text-sm text-darkgray/80 font-bold shrink-0">
                  {headCount + "명"}
                </span>
              )}
            </div>
            <p className="w-full text-sm text-darkgray font-medium overflow-hidden line-clamp-1">
              {lastMessage()}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 items-end text-left w-24 shrink-0">
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
