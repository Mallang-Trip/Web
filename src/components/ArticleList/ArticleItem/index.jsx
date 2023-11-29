import { useNavigate } from "react-router-dom";
import basicProfileImage from "../../../assets/images/profileImage.png";

function ArticleItem({
  articleId,
  profileImg,
  nickname,
  introduction,
  title,
  content,
  updatedAt,
  commentsCount,
  image,
}) {
  const navigation = useNavigate();

  const computeTime = () => {
    const updated = new Date(updatedAt);
    const now = new Date();
    const diffMinute = (now - updated) / (1000 * 60);

    if (diffMinute < 60) return `${Math.floor(diffMinute)}분 전`;
    if (diffMinute < 60 * 60) return `${Math.floor(diffMinute / 60)}시간 전`;

    return `${updated.getFullYear()}년 ${
      updated.getMonth() + 1
    }월 ${updated.getDate()}일 ${updated.getHours() >= 12 ? "오후" : "오전"} ${
      updated.getHours() % 12 || 12
    }시 ${updated.getMinutes()}분`;
  };

  return (
    <div
      className="py-5 border-b border-[#D9D9D9] cursor-pointer"
      onClick={() => navigation(`/community/${articleId}`)}
    >
      <div className="flex gap-2.5 mb-3">
        <img
          src={profileImg || basicProfileImage}
          alt="profile_image"
          className="w-10 h-10 rounded-full"
        />
        <div className="h-10 flex flex-col justify-center">
          <p className="text-sm text-black font-bold">{nickname}</p>
          <p className="text-sm text-[#3E3E3E] font-medium">{introduction}</p>
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-between gap-4">
        <div className="w-full">
          <p className="text-lg text-black font-bold">{title}</p>
          <p className="w-full text-sm text-[#3E3E3E] font-medium whitespace-pre-wrap mt-3 mb-4">
            {content}
          </p>
          <p className="text-xs text-darkgray font-medium">{computeTime()}</p>
          <p className="text-xs text-darkgray font-medium mt-4">
            {`댓글 ${commentsCount}개`}
          </p>
        </div>
        {image && (
          <img
            src={image}
            alt="image"
            className="w-full sm:w-80 h-full sm:h-40 object-cover rounded-xl"
          />
        )}
      </div>
    </div>
  );
}

export default ArticleItem;
