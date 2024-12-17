import { Dispatch, memo, SetStateAction } from "react";
import { dateToKoreanDay, dateToKoreanTime } from "../../../../../utils";
import InfoBubble from "./InfoBubble";
import basicProfileImage from "../../../../../assets/images/profileImage.png";
import clsx from "clsx";

interface Props {
  type: string;
  setShowProfileModal: Dispatch<SetStateAction<boolean>>;
  setProfileUserId: Dispatch<SetStateAction<number>>;
  userId: number;
  isMyMessage: boolean;
  profileImg: string | null;
  content: string;
  createdAt: string;
  nickname: string;
  isPrevSameDate: boolean;
  isNextSameDate: boolean;
  isPrevSameUser: boolean;
  isNextSameUser: boolean;
}

function TalkBubble({
  type,
  setShowProfileModal,
  setProfileUserId,
  userId,
  isMyMessage,
  profileImg,
  content,
  createdAt,
  nickname,
  isPrevSameDate,
  isNextSameDate,
  isPrevSameUser,
  isNextSameUser,
}: Props) {
  if (type === "INFO")
    return (
      <>
        {!isPrevSameDate && <InfoBubble content={dateToKoreanDay(createdAt)} />}
        <InfoBubble content={content} />
      </>
    );
  else {
    return (
      <>
        {!isPrevSameDate && <InfoBubble content={dateToKoreanDay(createdAt)} />}
        <div
          className={clsx(
            "flex",
            isNextSameUser ? "mb-1" : "mb-5",
            isMyMessage ? "flex-row-reverse" : "flex-row"
          )}
        >
          {!isMyMessage && (!isPrevSameDate || !isPrevSameUser) && (
            <img
              className="mr-2 w-10 h-10 rounded-full object-cover hover:cursor-pointer"
              src={profileImg || basicProfileImage}
              alt={nickname}
              onClick={() => {
                setProfileUserId(userId);
                setShowProfileModal(true);
              }}
            />
          )}
          <div className="flex flex-col gap-1">
            {!isMyMessage && (!isPrevSameDate || !isPrevSameUser) && (
              <p className="text-sm text-black font-bold">{nickname}</p>
            )}
            {type === "TEXT" ? (
              <div
                className={clsx(
                  "text-boldgray text-sm p-4 rounded-lg max-w-[200px] md:max-w-[400px] whitespace-pre-wrap",
                  isMyMessage ? "bg-skyblue" : "bg-lightgray",
                  !isMyMessage && isPrevSameDate && isPrevSameUser && "ml-12"
                )}
              >
                {content}
              </div>
            ) : (
              <img
                src={content}
                alt={content}
                className={clsx(
                  "rounded-lg h-32 md:h-56",
                  !isMyMessage && isPrevSameDate && isPrevSameUser && "ml-12"
                )}
              />
            )}
          </div>
          {(!isNextSameUser || !isNextSameDate) && (
            <div
              className={clsx(
                "mt-auto mx-2 text-xs text-boldgray",
                isMyMessage ? "ml-auto" : "mr-auto"
              )}
            >
              {dateToKoreanTime(createdAt)}
            </div>
          )}
        </div>
      </>
    );
  }
}

export default memo(TalkBubble);
