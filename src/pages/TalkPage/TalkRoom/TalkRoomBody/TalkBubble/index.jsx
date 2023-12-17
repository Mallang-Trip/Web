import basicProfileImage from "../../../../../assets/images/profileImage.png";

function TalkBubble({
  type,
  isMyMessage,
  profileImg,
  message,
  image,
  createdAt,
  isPrevSame,
  isNextSame,
}) {
  if (type === "TYPE_INFO")
    return (
      <div className="w-full my-4 text-xs text-[#3E3E3E] text-center">
        {message}
      </div>
    );
  else {
    return (
      <div
        className={`flex ${isNextSame ? "mb-1" : "mb-5"} ${
          isMyMessage ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {!isMyMessage && !isPrevSame && (
          <img
            className="mr-2 w-10 h-10 rounded-full hover:cursor-pointer"
            src={profileImg || basicProfileImage}
            alt="Profile_Image"
            // onClick={showProfile}
          />
        )}
        <div className="flex flex-col gap-1">
          {!isMyMessage && !isPrevSame && (
            <p className="text-sm text-black font-bold">jelly217</p>
          )}
          {message ? (
            <div
              className={`${isMyMessage ? "bg-skyblue" : "bg-[#F4F4F4]"} ${
                !isMyMessage && isPrevSame && "ml-12"
              } text-[#3E3E3E] text-sm p-4 rounded-lg max-w-[200px] md:max-w-[400px]`}
            >
              {message}
            </div>
          ) : (
            <img
              src={image}
              alt="chatImage"
              className={`${
                !isMyMessage && isPrevSame && "ml-12"
              } rounded-lg max-w-[200px] md:max-w-[400px]`}
            />
          )}
        </div>
        {!isNextSame && (
          <div
            className={`mt-auto mx-2 text-xs text-[#3E3E3E] ${
              isMyMessage ? "ml-auto" : "mr-auto"
            }`}
          >
            {createdAt}
          </div>
        )}
      </div>
    );
  }
}

export default TalkBubble;
