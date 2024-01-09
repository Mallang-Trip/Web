import { dateToKoreanDay, dateToKoreanTime } from "../../../../../utils";
import InfoBubble from "./InfoBubble";
import basicProfileImage from "../../../../../assets/images/profileImage.png";

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
}) {
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
          className={`flex ${isNextSameUser ? "mb-1" : "mb-5"} ${
            isMyMessage ? "flex-row-reverse" : "flex-row"
          }`}
        >
          {!isMyMessage && (!isPrevSameDate || !isPrevSameUser) && (
            <img
              className="mr-2 w-10 h-10 rounded-full hover:cursor-pointer"
              src={profileImg || basicProfileImage}
              alt="Profile_Image"
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
                className={`${isMyMessage ? "bg-skyblue" : "bg-[#F4F4F4]"} ${
                  !isMyMessage && isPrevSameDate && isPrevSameUser && "ml-12"
                } text-[#3E3E3E] text-sm p-4 rounded-lg max-w-[200px] md:max-w-[400px]`}
              >
                {content}
              </div>
            ) : (
              <img
                src={content}
                alt="chatImage"
                className={`${
                  !isMyMessage && isPrevSameDate && isPrevSameUser && "ml-12"
                } rounded-lg h-32 md:h-56`}
              />
            )}
          </div>
          {(!isNextSameUser || !isNextSameDate) && (
            <div
              className={`mt-auto mx-2 text-xs text-[#3E3E3E] ${
                isMyMessage ? "ml-auto" : "mr-auto"
              }`}
            >
              {dateToKoreanTime(createdAt)}
            </div>
          )}
        </div>
      </>
    );
  }
}

export default TalkBubble;
