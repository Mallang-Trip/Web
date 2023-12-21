import { dateToKoreanDay, dateToKoreanTime } from "../../../../../utils";
import InfoBubble from "./InfoBubble";
import basicProfileImage from "../../../../../assets/images/profileImage.png";

function TalkBubble({
  type,
  setShowProfileModal,
  isMyMessage,
  profileImg,
  content,
  createdAt,
  nickname,
  isPrevSameDate,
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
          {!isMyMessage && !isPrevSameUser && (
            <img
              className="mr-2 w-10 h-10 rounded-full hover:cursor-pointer"
              src={profileImg || basicProfileImage}
              alt="Profile_Image"
              onClick={() => setShowProfileModal(true)}
            />
          )}
          <div className="flex flex-col gap-1">
            {!isMyMessage && !isPrevSameUser && (
              <p className="text-sm text-black font-bold">{nickname}</p>
            )}
            {content ? (
              <div
                className={`${isMyMessage ? "bg-skyblue" : "bg-[#F4F4F4]"} ${
                  !isMyMessage && isPrevSameUser && "ml-12"
                } text-[#3E3E3E] text-sm p-4 rounded-lg max-w-[200px] md:max-w-[400px]`}
              >
                {content}
              </div>
            ) : (
              <img
                src={image}
                alt="chatImage"
                className={`${
                  !isMyMessage && isPrevSameUser && "ml-12"
                } rounded-lg max-w-[200px] md:max-w-[400px]`}
              />
            )}
          </div>
          {!isNextSameUser && (
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
