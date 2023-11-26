function ArticleItem({
  id,
  profileImage,
  userName,
  introduction,
  title,
  content,
  time,
  comment,
  articleImage,
}) {
  return (
    <div
      className="py-5 border-b border-[#D9D9D9] cursor-pointer"
      onClick={() => console.log(id)}
    >
      <div className="flex gap-2.5 mb-3">
        <img
          src={profileImage}
          alt="profile_image"
          className="w-10 h-10 rounded-full"
        />
        <div className="h-10 flex flex-col justify-center">
          <p className="text-sm text-black font-bold">{userName}</p>
          <p className="text-sm text-[#3E3E3E] font-medium">{introduction}</p>
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-between gap-4">
        <div className="w-full">
          <p className="text-lg text-black font-bold">{title}</p>
          <p className="w-full text-sm text-[#3E3E3E] font-medium whitespace-pre-wrap mt-3 mb-4">
            {content}
          </p>
          <p className="text-xs text-darkgray font-medium">{`${time}분 전`}</p>
          <p className="text-xs text-darkgray font-medium mt-4">
            {`댓글 ${comment}개`}
          </p>
        </div>
        <img
          src={articleImage}
          alt="image"
          className="w-full sm:w-80 h-full sm:h-40 object-cover rounded-xl"
        />
      </div>
    </div>
  );
}

export default ArticleItem;
