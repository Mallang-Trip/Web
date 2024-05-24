function FeedbackItem({
  profileImage,
  username,
  intro,
  title,
  content,
  createdAt,
  commentNum,
  image,
}) {
  return (
    <div className="w-full flex justify-between border-b border-mediumgray mb-5">
      <div className="flex flex-col max-w-[calc(100%-14rem)] pr-4">
        <div className="flex flex-row items-center mb-3">
          <img
            className="w-10 h-10 mr-2 rounded-full"
            alt="profileImage"
            src={image}
          />
          <div className="flex flex-col text-sm">
            <p className="font-bold">{username}</p>
            <p className="font-medium">{intro}</p>
          </div>
        </div>
        <div className="text-lg font-bold mb-3">{title}</div>
        <div className="text-sm font-medium mb-4 max-h-16 whitespace-pre-wrap overflow-clip">
          {content}
        </div>
        <div className="text-sm font-medium mb-4">{createdAt}</div>
        <div className="text-sm font-medium mb-5">댓글 {commentNum}개</div>
      </div>
      <div className="flex flex-col items-end justify-start w-56">
        <div className="flex flex-row mb-4 font-bold text-sm">
          <button className="whitespace-nowrap px-5 py-2 rounded-xl bg-skyblue text-primary mr-2">
            완료
          </button>
          <button className="whitespace-nowrap px-5 py-2 rounded-xl bg-lightgray text-darkgray">
            숨김
          </button>
        </div>
        <img className="w-56 h-32 rounded-xl" alt="imageContent" src={image} />
      </div>
    </div>
  );
}

export default FeedbackItem;
