import { Dispatch, memo, SetStateAction, useMemo } from "react";
import { chatListDateToGapKorean } from "@/utils";
import { ChatRoomList } from "@/types";
import basicProfileImage from "@/assets/images/profileImage.png";
import clsx from "clsx";

interface Props extends ChatRoomList {
  openTalkId: number;
  setOpenTalkId: Dispatch<SetStateAction<number>>;
}

function TalkItem({
  chatRoomId,
  roomName,
  content,
  updatedAt,
  unreadCount,
  headCount,
  type,
  image,
  openTalkId,
  setOpenTalkId,
}: Props) {
  const lastMessage = useMemo(() => {
    if (
      content.slice(0, 64) ===
      "https://mallang-trip-db.s3.ap-northeast-2.amazonaws.com/profile/"
    )
      return "사진";
    return content;
  }, [content]);

  return (
    <li>
      <button
        className={clsx(
          "w-full flex justify-between gap-1 py-3 px-3 rounded-lg hover:bg-lightgray group focus:outline-none",
          openTalkId === chatRoomId ? "bg-lightgray" : "bg-white"
        )}
        onClick={() => setOpenTalkId(chatRoomId)}
      >
        <div className="flex flex-row">
          <img
            className="mr-3 w-16 h-16 rounded-full object-cover"
            src={image || basicProfileImage}
            alt={roomName}
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
              {lastMessage}
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

export default memo(TalkItem);
