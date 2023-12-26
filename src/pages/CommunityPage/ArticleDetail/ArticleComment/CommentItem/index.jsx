import { useState } from "react";
import { useSelector } from "react-redux";
import { dateToGapKorean } from "../../../../../utils";
import { deleteMyComment } from "../../../../../api/article";
import ReplyItem from "./ReplyItem";
import ReplyForm from "./ReplyForm";
import CheckModal from "../../../../../components/CheckModal";
import basicProfileImage from "../../../../../assets/images/profileImage.png";

function CommentItem({
  reloadArticle,
  commentId,
  profileImg,
  nickname,
  createdAt,
  content,
  replies,
  userId,
  deleted,
}) {
  const user = useSelector((state) => state.user);
  const [showReply, setShowReply] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const deleteHandler = async () => {
    try {
      await deleteMyComment(commentId);
      setShowDeleteModal(false);
      reloadArticle();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="py-5">
      <div className="flex gap-2.5">
        <img
          src={profileImg || basicProfileImage}
          alt="profile_image"
          className="w-10 h-10 rounded-full"
        />
        <div className="h-10 flex flex-col justify-center">
          <p className="text-sm text-black font-bold">{nickname}</p>
          <p className="text-sm text-[#3E3E3E] font-medium">
            {dateToGapKorean(createdAt)}
          </p>
        </div>
      </div>
      <div className="ml-[50px]">
        <div className="w-full text-base text-[#3E3E3E] font-medium whitespace-pre-wrap mt-2.5 mb-5">
          {content}
        </div>
        <div className="flex gap-8 text-xs">
          <button
            className="text-primary"
            onClick={() => setShowReply(!showReply)}
          >{`답글 ${replies.length}개`}</button>
          <button className="text-darkgray">톡 보내기</button>
          <button className="text-darkgray">신고</button>
          {user.userId === userId && !deleted && (
            <button
              className="text-darkgray"
              onClick={() => setShowDeleteModal(true)}
            >
              삭제
            </button>
          )}
        </div>
        <div
          className={`w-full transition-all duration-500 overflow-hidden border-l-2 border-[#F4F4F4] mt-5 ${
            showReply ? "max-h-[1000px] " : "max-h-0"
          }`}
        >
          <div className="ml-8">
            {replies.map((reply) => (
              <ReplyItem
                key={reply.replyId}
                reloadArticle={reloadArticle}
                {...reply}
              />
            ))}
            <ReplyForm commentId={commentId} reloadArticle={reloadArticle} />
          </div>
        </div>
      </div>
      <CheckModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        message={"댓글을 삭제하시겠습니까?"}
        noText={"취소"}
        yesText={"확인"}
        yesHandler={() => deleteHandler()}
      />
    </div>
  );
}

export default CommentItem;
