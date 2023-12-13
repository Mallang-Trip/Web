function TalkItem({
  id,
  profileImg,
  nickName,
  lastChat,
  time,
  readCount,
  openTalkId,
  setOpenTalkId,
}) {
  return (
    <li>
      <button
        className={`w-full flex justify-between py-3 px-3 rounded-lg hover:bg-[#F4F4F4] group focus:outline-none ${
          openTalkId === id ? "bg-[#F4F4F4]" : "bg-white"
        }`}
        onClick={() => setOpenTalkId(id)}
      >
        <div className="flex flex-row">
          <img
            className="mr-3 w-16 h-16 rounded-full"
            src={profileImg}
            alt="Profile_Image"
          />
          <div className="flex flex-col gap-2 text-left">
            <span className="text-lg text-black font-bold">{nickName}</span>
            <p className="w-full text-sm text-darkgray font-medium overflow-hidden line-clamp-1">
              {lastChat}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 items-end text-left w-24">
          <span className="text-xs ml-auto text-darkgray font-medium">
            {time}
          </span>
          {readCount > 0 && (
            <div className="w-6 h-6 bg-primary rounded-full text-xs text-white flex justify-center items-center">
              {readCount}
            </div>
          )}
        </div>
      </button>
    </li>
  );
}

export default TalkItem;
